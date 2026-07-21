"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode, useEffect, useRef, useState } from "react";
import type { GyroGaze } from "./UnicornScene";

const UnicornScene = dynamic(() => import("./UnicornScene"), { ssr: false });

type DeviceOrientationPermission = "granted" | "denied";
type PermissionAwareDeviceOrientationEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<DeviceOrientationPermission>;
};

type GyroState =
  | "idle"
  | "needs-permission"
  | "calibrating"
  | "active"
  | "denied"
  | "insecure"
  | "unsupported";

function shortestAngleDelta(value: number, baseline: number) {
  return ((value - baseline + 540) % 360) - 180;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    // Release the probe context immediately — browsers cap live WebGL
    // contexts (~16) and force-lose the oldest once exceeded. Leaking this
    // one (doubled under Strict Mode, stacked across HMR) is enough to get
    // the real scene a lost context, which crashes EffectComposer's init.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Compact mount of UnicornScene for the bento orb: lazy-mounts near the
 *  viewport, pauses the frameloop when scrolled out, falls back to a static
 *  glow only when WebGL is unavailable or the scene fails to initialize. */
export function BentoHorse() {
  const holder = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [gyroState, setGyroState] = useState<GyroState>("idle");
  const gyro = useRef<GyroGaze>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const el = holder.current;
    if (!el) return;

    // Prefetch the three.js scene chunk while the page is idle (the user is
    // still reading the hero). Evaluating it lazily at the IO mount point cost
    // a 240–1300ms main-thread task in the middle of the scroll on a 4x-CPU
    // mobile profile; after this warm-up the dynamic() mount below resolves
    // from the module registry with no long task. Fetch-only — mounting still
    // waits for the IntersectionObserver, so behavior is unchanged.
    // requestIdleCallback is still missing from some Safari versions
    const ric =
      "requestIdleCallback" in window
        ? window.requestIdleCallback.bind(window)
        : undefined;
    const warm = () => {
      const loaded = import("./UnicornScene");
      // On touch devices go one step further: mount as soon as the chunk has
      // landed and the thread is idle again. The WebGL init (context + shader
      // compile) is the expensive part, and running it while the user is still
      // up at the hero keeps it off the scroll path entirely. The scene is
      // off-screen (renders nothing) and its frameloop stays paused via viewIo
      // until it actually scrolls into view — visual behavior is unchanged.
      if (window.matchMedia("(pointer: coarse)").matches) {
        loaded.then(() => {
          const mountNow = () => {
            if (!canUseWebGL()) {
              setFallback(true);
              return;
            }
            setIsMobile(true);
            setMounted(true);
          };
          if (ric) ric(mountNow, { timeout: 4000 });
          else window.setTimeout(mountNow, 500);
        });
      }
    };
    const idleId = ric ? ric(warm, { timeout: 6000 }) : window.setTimeout(warm, 2500);

    // Mobile mounts far earlier (~3 screens out): the three.js init (chunk
    // eval + WebGL context + shader compile) is a 240–1300ms main-thread task
    // on a throttled phone, and at 400px it landed mid-scroll and dropped
    // frames. At 2400px it runs while the user is still reading the sections
    // above. The scene renders nothing until scrolled into view and the
    // frameloop stays paused (viewIo below), so only the init timing moves.
    // Desktop keeps the original 400px.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const mountIo = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        mountIo.disconnect();
        if (!canUseWebGL()) {
          setFallback(true);
          return;
        }
        setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        setMounted(true);
      },
      { rootMargin: coarse ? "2400px 0px" : "400px 0px" },
    );
    const viewIo = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { rootMargin: "80px 0px" },
    );
    mountIo.observe(el);
    viewIo.observe(el);
    return () => {
      mountIo.disconnect();
      viewIo.disconnect();
      if (ric) cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
  }, []);

  useEffect(() => {
    const target = holder.current;
    if (!target || !mounted || !isMobile) return;

    const OrientationEvent = window.DeviceOrientationEvent as
      | PermissionAwareDeviceOrientationEvent
      | undefined;
    const exposesOrientationEvents = "ondeviceorientation" in window;
    if (!OrientationEvent && !exposesOrientationEvents) {
      const stateFrame = requestAnimationFrame(() => {
        target.dataset.gyroReason = window.isSecureContext
          ? "device-orientation-unavailable"
          : "secure-context-required";
        setGyroState(window.isSecureContext ? "unsupported" : "insecure");
      });
      return () => cancelAnimationFrame(stateFrame);
    }

    let listening = false;
    let requesting = false;
    let baselineBeta: number | null = null;
    let baselineGamma: number | null = null;
    let baselineScreenAngle: number | null = null;

    const screenAngle = () => {
      const angle = window.screen.orientation?.angle;
      if (typeof angle === "number") return angle;
      return typeof window.orientation === "number" ? window.orientation : 0;
    };

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta == null || event.gamma == null) return;
      const angle = screenAngle();
      if (
        baselineBeta == null ||
        baselineGamma == null ||
        baselineScreenAngle !== angle
      ) {
        baselineBeta = event.beta;
        baselineGamma = event.gamma;
        baselineScreenAngle = angle;
        gyro.current = { x: 0, y: 0, active: true };
        target.dataset.gyroX = "0.000";
        target.dataset.gyroY = "0.000";
        delete target.dataset.gyroReason;
        setGyroState("active");
        return;
      }

      const beta = shortestAngleDelta(event.beta, baselineBeta);
      const gamma = shortestAngleDelta(event.gamma, baselineGamma);
      let horizontal = gamma;
      let vertical = beta;
      if (angle === 90) {
        horizontal = -beta;
        vertical = gamma;
      } else if (angle === 270 || angle === -90) {
        horizontal = beta;
        vertical = -gamma;
      } else if (Math.abs(angle) === 180) {
        horizontal = -gamma;
        vertical = -beta;
      }

      gyro.current.x = clamp(horizontal / 28, -1, 1);
      gyro.current.y = clamp(vertical / 24, -1, 1);
      gyro.current.active = true;
      target.dataset.gyroX = gyro.current.x.toFixed(3);
      target.dataset.gyroY = gyro.current.y.toFixed(3);
    };

    const startListening = () => {
      if (listening) return;
      listening = true;
      baselineBeta = null;
      baselineGamma = null;
      setGyroState("calibrating");
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    };

    const requestGyro = async () => {
      if (listening || requesting) return;
      requesting = true;
      try {
        const permission = OrientationEvent?.requestPermission
          ? await OrientationEvent.requestPermission()
          : "granted";
        if (permission !== "granted") {
          target.dataset.gyroReason = "permission-denied";
          setGyroState("denied");
          return;
        }
        startListening();
      } catch {
        target.dataset.gyroReason = "permission-denied";
        setGyroState("denied");
      } finally {
        requesting = false;
      }
    };

    const targetIsVisible = () => {
      const rect = target.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    // iOS requires requestPermission() to run from a user gesture. Listening
    // on the document lets the finger-up that finishes the scroll into this
    // section unlock the sensor without adding a separate visible button.
    const onDocumentTouchEnd = () => {
      if (!targetIsVisible()) return;
      void requestGyro();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      void requestGyro();
    };

    target.addEventListener("click", requestGyro);
    target.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchend", onDocumentTouchEnd, {
      capture: true,
      passive: true,
    });
    const initialStateFrame = requestAnimationFrame(() => {
      if (OrientationEvent?.requestPermission) setGyroState("needs-permission");
      else startListening();
    });

    return () => {
      cancelAnimationFrame(initialStateFrame);
      target.removeEventListener("click", requestGyro);
      target.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchend", onDocumentTouchEnd, true);
      window.removeEventListener("deviceorientation", onOrientation);
      gyro.current.active = false;
    };
  }, [isMobile, mounted]);

  return (
    <div
      ref={holder}
      className={`absolute inset-0 ${isMobile ? "pointer-events-auto touch-pan-y" : ""}`}
      data-gyro-control=""
      data-gyro-state={isMobile ? gyroState : undefined}
      role={isMobile && gyroState !== "insecure" && gyroState !== "unsupported" ? "button" : undefined}
      tabIndex={isMobile && gyroState !== "insecure" && gyroState !== "unsupported" ? 0 : undefined}
      aria-label={
        !isMobile
          ? undefined
          : gyroState === "insecure"
            ? "Tilt control requires HTTPS"
            : gyroState === "unsupported"
              ? "Tilt control is unavailable on this device"
              : "Enable tilt control for the 3D unicorn"
      }
    >
      {mounted && !fallback ? (
        <SceneErrorBoundary onError={() => setFallback(true)}>
          <UnicornScene
            isMobile={isMobile}
            active={inView}
            zoom={1.09}
            noBackdrop
            gyro={gyro}
          />
        </SceneErrorBoundary>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(124,92,246,0.5),rgba(58,168,255,0.18)_55%,rgba(5,6,12,0)_75%)]"
        />
      )}
    </div>
  );
}
