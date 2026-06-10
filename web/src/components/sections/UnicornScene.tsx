"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const MODEL_URL = "/assets/models/unicorn-head-lowpoly.glb";

/* Decimated derivative of the raw Meshy export (unicorn-head.glb, 365k tris) —
   the low-poly faceted look needs the simplified mesh; swap URLs to compare. */

/* Frontal export, yawed 45° for a three-quarter hero angle. */
const BASE_YAW = Math.PI / 4;
/* Yaw at which the head faces the camera — the gaze pivots around this once
   the cursor enters the canvas, so it actually "sees" the cursor. */
const GAZE_YAW = 0;

const VIOLET = "#7b5cf6";
const LAVENDER = "#a99bff";
const CYAN = "#2ec5e8";

/* Bright emissive panels baked into the env map — the crystal facets reflect
   these as colored glints instead of white "room" highlights. */
const ENV_VIOLET = new THREE.Color(VIOLET).multiplyScalar(6);
const ENV_CYAN = new THREE.Color(CYAN).multiplyScalar(5);
const ENV_LAVENDER = new THREE.Color(LAVENDER).multiplyScalar(9);

type UnicornSceneProps = {
  isMobile: boolean;
  active: boolean;
};

/** Soft radial sprite used for the halo behind the head. */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.4)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function BackgroundGlow() {
  const texture = useMemo(() => makeGlowTexture(), []);

  useEffect(() => {
    return () => texture.dispose();
  }, [texture]);

  return (
    <group position={[0, 0, -2.6]}>
      {/* barely-there gradient on black — the head itself stays the light source */}
      <sprite scale={[8, 8, 1]} position={[-0.6, 0.2, 0]}>
        <spriteMaterial
          map={texture}
          color="#241a52"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.2}
        />
      </sprite>
      <sprite scale={[6, 6, 1]} position={[1.5, -0.5, 0]}>
        <spriteMaterial
          map={texture}
          color="#0a2f3c"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.15}
        />
      </sprite>
      <sprite scale={[4.5, 4.5, 1]} position={[0.2, 1.3, 0]}>
        <spriteMaterial
          map={texture}
          color="#2a2257"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.12}
        />
      </sprite>
    </group>
  );
}

function UnicornModel({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF(MODEL_URL);
  const gl = useThree((state) => state.gl);
  const group = useRef<THREE.Group>(null);
  const seams = useRef<THREE.LineSegments>(null);
  const swayY = useRef(BASE_YAW);
  const swayX = useRef(0);
  const gaze = useRef({ x: 0, y: 0, active: false });

  // Track the cursor across the whole window (not just the canvas), relative
  // to the canvas center, so the head keeps "watching" it anywhere on screen.
  useEffect(() => {
    if (isMobile) return;
    let clientX = 0;
    let clientY = 0;
    let seen = false;

    const update = () => {
      if (!seen) return;
      const rect = gl.domElement.getBoundingClientRect();
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      // the head "notices" the cursor anywhere over the whole section
      // (paddings and CTA included); the turn angle is still measured from
      // the canvas center where the head sits
      const zone =
        gl.domElement.closest("section")?.getBoundingClientRect() ?? rect;
      // gaze is sticky: outside the zone we simply stop updating, so the
      // head keeps looking at the spot where it last saw the cursor
      if (clientY < zone.top || clientY > zone.bottom) return;
      gaze.current.active = true;
      gaze.current.x = THREE.MathUtils.clamp(
        (clientX - (rect.left + halfW)) / halfW,
        -1.4,
        1.4,
      );
      gaze.current.y = THREE.MathUtils.clamp(
        (clientY - (rect.top + halfH)) / halfH,
        -1.4,
        1.4,
      );
    };

    const onMove = (ev: PointerEvent) => {
      clientX = ev.clientX;
      clientY = ev.clientY;
      seen = true;
      update();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [gl, isMobile]);

  const geometry = useMemo(() => {
    let found: THREE.BufferGeometry | null = null;
    scene.traverse((child) => {
      if (!found && child instanceof THREE.Mesh) {
        found = child.geometry as THREE.BufferGeometry;
      }
    });
    const geo = found ?? new THREE.IcosahedronGeometry(1, 1);
    geo.center();
    return geo;
  }, [scene]);

  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#171440"),
        transparent: true,
        opacity: 0.58,
        // Glassy facets: low roughness so the colored env panels land as
        // crisp glints sliding across the crystal while it sways.
        roughness: 0.14,
        metalness: 0,
        transmission: 0.5,
        ior: 1.5,
        thickness: 0.8,
        envMapIntensity: 1.6,
        flatShading: true,
        // Solid depth so the far side of the head is occluded by the volume —
        // without this the model reads as an x-ray instead of solid crystal.
        depthWrite: true,
        emissive: new THREE.Color("#1c1452"),
        emissiveIntensity: 0.7,
      }),
    [],
  );

  // Interior shell: back faces lit by the white core light show through the
  // glass, so facets flare from inside as the head turns. Additive blending
  // over a near-black base means only the lit facets appear.
  const innerGlow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a18"),
        side: THREE.BackSide,
        transparent: true,
        roughness: 0.4,
        metalness: 0,
        envMapIntensity: 0.3,
        flatShading: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  // White seams along the facet edges, animated per edge: a light wave
  // travels across the head and each edge flares white only while the wave
  // passes over it. Brightness lives in a dynamic vertex-color attribute.
  const { edges, twinklePhase } = useMemo(() => {
    const e = new THREE.EdgesGeometry(geometry, 1);
    const pos = e.getAttribute("position");
    const colors = new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3);
    colors.setUsage(THREE.DynamicDrawUsage);
    e.setAttribute("color", colors);

    geometry.computeBoundingBox();
    const box = geometry.boundingBox as THREE.Box3;
    const size = new THREE.Vector3();
    box.getSize(size);

    // per-edge phase = random offset + position term, so the flare drifts
    // across the head instead of blinking everywhere at once
    const phase = new Float32Array(pos.count / 2);
    for (let i = 0; i < phase.length; i++) {
      const a = i * 2;
      const mx = (pos.getX(a) + pos.getX(a + 1)) / 2;
      const my = (pos.getY(a) + pos.getY(a + 1)) / 2;
      const mz = (pos.getZ(a) + pos.getZ(a + 1)) / 2;
      const h = Math.sin(mx * 127.1 + my * 311.7 + mz * 74.7) * 43758.5453;
      const rand = h - Math.floor(h);
      phase[i] =
        rand * Math.PI * 2 +
        ((mx - box.min.x) / size.x) * 2.5 +
        ((my - box.min.y) / size.y) * 1.5;
    }
    return { edges: e, twinklePhase: phase };
  }, [geometry]);

  const seam = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      glass.dispose();
      innerGlow.dispose();
      edges.dispose();
      seam.dispose();
    };
  }, [glass, innerGlow, edges, seam]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // rest pose: three-quarter 45°; once the cursor is inside the canvas the
    // head swings to face the camera and tracks the cursor from there
    const engaged = !isMobile && gaze.current.active;
    const targetYaw = engaged ? GAZE_YAW + gaze.current.x * 0.6 : BASE_YAW;
    // asymmetric pitch: the head throws itself up at a cursor above it much
    // harder than it dips toward one below
    const pitchGain = gaze.current.y < 0 ? 0.55 : 0.3;
    const targetPitch = engaged ? gaze.current.y * pitchGain : 0;
    swayY.current = THREE.MathUtils.damp(swayY.current, targetYaw, 10, delta);
    swayX.current = THREE.MathUtils.damp(swayX.current, targetPitch, 10, delta);
    g.rotation.y = swayY.current + Math.sin(t * 0.22) * 0.08;
    g.rotation.x = swayX.current + Math.sin(t * 0.31) * 0.03;

    // shimmer: narrow sine pulse per edge — bright only near its peak, so a
    // handful of edges flash white at a time as the wave sweeps the head
    const colorAttr = seams.current?.geometry.getAttribute("color") as
      | THREE.BufferAttribute
      | undefined;
    if (colorAttr) {
      for (let i = 0; i < twinklePhase.length; i++) {
        const s = Math.sin(t * 0.9 + twinklePhase[i]);
        const pulse = s > 0 ? s ** 8 : 0;
        const b = 0.1 + pulse * 2.4;
        const a = i * 2;
        colorAttr.setXYZ(a, b, b, b * 1.08);
        colorAttr.setXYZ(a + 1, b, b, b * 1.08);
      }
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={[0, -0.05, 0]} scale={1 / 1.5}>
      <mesh geometry={geometry} material={innerGlow} />
      <mesh geometry={geometry} material={glass} renderOrder={1} />
      <lineSegments ref={seams} geometry={edges} material={seam} renderOrder={2} />
      {/* pink eye light rides the head so the muzzle area glows as it sways */}
      <pointLight position={[0, 0.32, -0.42]} intensity={5} distance={0.9} decay={2} color="#ff5ad1" />
    </group>
  );
}

export default function UnicornScene({ isMobile, active }: UnicornSceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.05, 3.2], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#000000"]} />
      <BackgroundGlow />
      <ambientLight intensity={0.9} color="#3b3180" />
      <pointLight position={[-2.6, 1.6, 2.2]} intensity={34} color={VIOLET} />
      <pointLight position={[2.6, -0.4, 2.4]} intensity={28} color={CYAN} />
      <pointLight position={[0, 2.6, -1.6]} intensity={16} color={LAVENDER} />
      {/* glint lights: white keys for crisp sparkles plus colored accents
          at opposing angles, so facets flash as the head sways */}
      <directionalLight position={[1.5, 3, 2.5]} intensity={3.2} color="#ffffff" />
      <pointLight position={[0, 0.6, 3.2]} intensity={9} color="#ffffff" />
      <pointLight position={[-1.8, -1.2, 2.8]} intensity={18} color="#8a5cff" />
      <pointLight position={[1.2, 2.2, 1.6]} intensity={15} color="#36e0c2" />
      <pointLight position={[0, -2.4, 1.6]} intensity={14} color={VIOLET} />
      {/* cyan rim from behind so the silhouette stays lit against the halo */}
      <directionalLight position={[-1.2, 1, -2.6]} intensity={2.4} color={CYAN} />
      {/* white core fixed in world space at the head center: the head sways
          around it, so interior facets shimmer as their angle changes */}
      <pointLight position={[0, -0.05, 0]} intensity={10} distance={1.7} decay={2} color="#ffffff" />
      <Environment frames={1} resolution={128}>
        {/* violet key panel, camera-left */}
        <mesh position={[-5, 1.5, 3]} rotation={[0, Math.PI / 3, 0]}>
          <planeGeometry args={[7, 5]} />
          <meshBasicMaterial color={ENV_VIOLET} side={THREE.DoubleSide} />
        </mesh>
        {/* cyan rim panel, camera-right */}
        <mesh position={[5, -0.5, 2]} rotation={[0, -Math.PI / 3, 0]}>
          <planeGeometry args={[6, 5]} />
          <meshBasicMaterial color={ENV_CYAN} side={THREE.DoubleSide} />
        </mesh>
        {/* narrow lavender strip overhead for sharp sparkle glints */}
        <mesh position={[0, 5, 1]} rotation={[Math.PI / 2.4, 0, 0]}>
          <planeGeometry args={[8, 1.2]} />
          <meshBasicMaterial color={ENV_LAVENDER} side={THREE.DoubleSide} />
        </mesh>
      </Environment>
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.06, 0.06]}>
          <UnicornModel isMobile={isMobile} />
        </Float>
      </Suspense>
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={isMobile ? 0.5 : 0.9}
          luminanceThreshold={0.22}
          luminanceSmoothing={0.18}
          radius={0.75}
        />
      </EffectComposer>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
