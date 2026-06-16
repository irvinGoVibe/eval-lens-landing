"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const MODEL_URL = "/assets/models/unicorn-head-lowpoly.glb";

/* Decimated derivative of the raw Meshy export (unicorn-head.glb, 365k tris) —
   the low-poly faceted look needs the simplified mesh; swap URLs to compare. */

/* Rest pose: 15° to the left of head-on; the gaze still centers on camera. */
const BASE_YAW = Math.PI / 12;
/* Yaw at which the head faces the camera — the gaze pivots around this once
   the cursor enters the canvas, so it actually "sees" the cursor. */
const GAZE_YAW = 0;
/* Leftward turns over-twist the neck from the right-facing rest pose, so the
   whole body slowly swings up to this far left (40°) once the cursor crosses
   to the left half — the neck chain then only covers what remains. */
const BODY_TURN_LEFT = 0.7;

/* Anatomical three-joint rig, like a horse's neck and skull:
   - neckBase / neckMid: cervical vertebrae — the neck bends in an arc
   - poll: the atlanto-occipital joint where the skull does the final,
     fastest part of the turn.
   Each joint carries a share of the total turn, with anatomical limits. */
const J_NECK_BASE = new THREE.Vector3(0, -0.95, 0);
const J_NECK_MID = new THREE.Vector3(0, -0.55, 0);
const J_POLL = new THREE.Vector3(0, -0.12, 0);

const NECK_YAW_SHARE = 0.5; // fixed split: the neck turns its half at its own pace
const NECK_PITCH_SHARE = 0.4;
const NECK_YAW_MAX = 0.7;
const HEAD_YAW_MAX = 0.7;
const PITCH_UP_MAX = 0.6;
const PITCH_DOWN_MAX = 0.22;

const _euler = new THREE.Euler();
const _gazeDir = new THREE.Vector3();
const _toCam = new THREE.Vector3();
const _eyePos = new THREE.Vector3();
const _eyeN = new THREE.Vector3();
const _pivot = new THREE.Vector3();
const _rp = new THREE.Vector3();

/** out = rotation(yaw,pitch,roll) about `pivot`, stacked onto `parent` (FK). */
function makeJointMatrix(
  out: THREE.Matrix4,
  pivot: THREE.Vector3,
  parent: THREE.Matrix4 | null,
  yaw: number,
  pitch: number,
  roll: number,
) {
  _pivot.copy(pivot);
  if (parent) _pivot.applyMatrix4(parent);
  out.makeRotationFromEuler(_euler.set(pitch, yaw, roll, "YXZ"));
  _rp.copy(_pivot).applyMatrix4(out);
  out.setPosition(_pivot.x - _rp.x, _pivot.y - _rp.y, _pivot.z - _rp.z);
  if (parent) out.multiply(parent);
}

/** Damped spring integrator — overshoot and settle, instead of a lerp. */
function springStep(
  s: { x: number; v: number },
  target: number,
  stiffness: number,
  damping: number,
  dt: number,
) {
  s.v += (target - s.x) * stiffness * dt;
  s.v *= Math.exp(-damping * dt);
  s.x += s.v * dt;
}

/** Locate the neck column and which z-direction the muzzle points. */
function neckFrame(pos0: Float32Array, count: number) {
  let sum = 0;
  let n = 0;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (let i = 0; i < count; i++) {
    const y = pos0[i * 3 + 1];
    const z = pos0[i * 3 + 2];
    if (y < -0.85) {
      sum += z;
      n++;
    }
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  }
  const neckZ = n > 0 ? sum / n : 0;
  const muzzleSign = maxZ - neckZ > neckZ - minZ ? 1 : -1;
  return { neckZ, muzzleSign };
}

/* Skinning weights, 3 per vertex (neckBase / neckMid / head), partition of
   unity with the fixed base. Head membership uses height AND distance toward
   the muzzle, so the jaw stays rigid with the skull instead of bending like
   neck flesh. */
function buildRigWeights(
  pos0: Float32Array,
  count: number,
  neckZ: number,
  muzzleSign: number,
): Float32Array {
  const w = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = pos0[i * 3 + 1];
    const z = pos0[i * 3 + 2];
    const snout = (z - neckZ) * muzzleSign;
    const headByZ = THREE.MathUtils.smoothstep(snout, 0.35, 0.75);
    const c3 = Math.max(THREE.MathUtils.smoothstep(y, -0.32, 0.02), headByZ);
    const c2 = Math.max(THREE.MathUtils.smoothstep(y, -0.7, -0.25), c3);
    const c1 = Math.max(THREE.MathUtils.smoothstep(y, -1.0, -0.6), c2);
    w[i * 3] = c1 - c2;
    w[i * 3 + 1] = c2 - c3;
    w[i * 3 + 2] = c3;
  }
  return w;
}

/** Linear-blend skinning over the three joint matrices. */
function applyRig(
  posAttr: THREE.BufferAttribute,
  pos0: Float32Array,
  weights: Float32Array,
  m1: THREE.Matrix4,
  m2: THREE.Matrix4,
  m3: THREE.Matrix4,
  nrmAttr?: THREE.BufferAttribute,
  nrm0?: Float32Array,
) {
  const e1 = m1.elements;
  const e2 = m2.elements;
  const e3 = m3.elements;
  const count = posAttr.count;
  for (let i = 0; i < count; i++) {
    const ix = i * 3;
    const w1 = weights[ix];
    const w2 = weights[ix + 1];
    const w3 = weights[ix + 2];
    const w0 = 1 - w1 - w2 - w3;
    const x = pos0[ix];
    const y = pos0[ix + 1];
    const z = pos0[ix + 2];
    let X = w0 * x;
    let Y = w0 * y;
    let Z = w0 * z;
    if (w1 > 0) {
      X += w1 * (e1[0] * x + e1[4] * y + e1[8] * z + e1[12]);
      Y += w1 * (e1[1] * x + e1[5] * y + e1[9] * z + e1[13]);
      Z += w1 * (e1[2] * x + e1[6] * y + e1[10] * z + e1[14]);
    }
    if (w2 > 0) {
      X += w2 * (e2[0] * x + e2[4] * y + e2[8] * z + e2[12]);
      Y += w2 * (e2[1] * x + e2[5] * y + e2[9] * z + e2[13]);
      Z += w2 * (e2[2] * x + e2[6] * y + e2[10] * z + e2[14]);
    }
    if (w3 > 0) {
      X += w3 * (e3[0] * x + e3[4] * y + e3[8] * z + e3[12]);
      Y += w3 * (e3[1] * x + e3[5] * y + e3[9] * z + e3[13]);
      Z += w3 * (e3[2] * x + e3[6] * y + e3[10] * z + e3[14]);
    }
    posAttr.setXYZ(i, X, Y, Z);
    if (nrmAttr && nrm0) {
      const nx = nrm0[ix];
      const ny = nrm0[ix + 1];
      const nz = nrm0[ix + 2];
      let NX = w0 * nx;
      let NY = w0 * ny;
      let NZ = w0 * nz;
      if (w1 > 0) {
        NX += w1 * (e1[0] * nx + e1[4] * ny + e1[8] * nz);
        NY += w1 * (e1[1] * nx + e1[5] * ny + e1[9] * nz);
        NZ += w1 * (e1[2] * nx + e1[6] * ny + e1[10] * nz);
      }
      if (w2 > 0) {
        NX += w2 * (e2[0] * nx + e2[4] * ny + e2[8] * nz);
        NY += w2 * (e2[1] * nx + e2[5] * ny + e2[9] * nz);
        NZ += w2 * (e2[2] * nx + e2[6] * ny + e2[10] * nz);
      }
      if (w3 > 0) {
        NX += w3 * (e3[0] * nx + e3[4] * ny + e3[8] * nz);
        NY += w3 * (e3[1] * nx + e3[5] * ny + e3[9] * nz);
        NZ += w3 * (e3[2] * nx + e3[6] * ny + e3[10] * nz);
      }
      const len = Math.sqrt(NX * NX + NY * NY + NZ * NZ) || 1;
      nrmAttr.setXYZ(i, NX / len, NY / len, NZ / len);
    }
  }
  posAttr.needsUpdate = true;
  if (nrmAttr) nrmAttr.needsUpdate = true;
}

/* Brand-locked palette: violet/blue only, no emerald/teal anywhere. */
const VIOLET = "#B85CFF";
const DEEP_VIOLET = "#5F4BFF";
const LAVENDER = "#a99bff";
const CYAN = "#31E7FF";

/* Bright emissive panels baked into the env map — the crystal facets reflect
   these as colored glints instead of white "room" highlights. */
const ENV_VIOLET = new THREE.Color(VIOLET).multiplyScalar(6);
const ENV_CYAN = new THREE.Color(CYAN).multiplyScalar(5);
const ENV_LAVENDER = new THREE.Color(LAVENDER).multiplyScalar(9);

/* Eye socket centroids measured from the lowpoly mesh vertices (in the
   bbox-centered space the component renders in; z gets ×muzzleSign at use
   sites). The sculpt is slightly asymmetric — the right eye sits 0.018
   lower than the left — so each eye carries its own anchor. */
const EYE_L = { x: -0.31, y: 0.154, z: 0.296 };
const EYE_R = { x: 0.298, y: 0.136, z: 0.303 };
/* y sits 0.015 below the measured centroids — the glow reads better tucked
   into the lower half of the socket. */

/* Hot white pupil dots, pushed past 1.0 to feed the bloom pass… */
const EYE_CORE = new THREE.Color("#ffffff").multiplyScalar(4.2);
/* …wrapped in a faint, heavily feathered pink glow around each pupil. */
const EYE_RING = new THREE.Color("#ff7ad1").multiplyScalar(1.5);


type UnicornSceneProps = {
  isMobile: boolean;
  active: boolean;
  /** Linear head-size multiplier — implemented as camera dolly-in, so the
   *  figure scales without touching the shared model rig. Default 1. */
  zoom?: number;
  /** Transparent canvas: drop the opaque black clear and the decorative
   *  background-glow sprites so the page (and the title behind it) shows
   *  through every empty pixel. Lighting and bloom stay. */
  noBackdrop?: boolean;
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


/** Heavily feathered falloff for the pink eye glow: low peak, long fade —
 *  it should melt into the facets, never read as a drawn circle. */
function makeRingGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,0.3)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.14)");
  grad.addColorStop(0.7, "rgba(255,255,255,0.05)");
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
          fog={false}
          depthWrite={false}
          transparent
          opacity={0.05}
        />
      </sprite>
      <sprite scale={[6, 6, 1]} position={[1.5, -0.5, 0]}>
        <spriteMaterial
          map={texture}
          color="#0d1f45"
          blending={THREE.AdditiveBlending}
          fog={false}
          depthWrite={false}
          transparent
          opacity={0.038}
        />
      </sprite>
      <sprite scale={[4.5, 4.5, 1]} position={[0.2, 1.3, 0]}>
        <spriteMaterial
          map={texture}
          color="#2a2257"
          blending={THREE.AdditiveBlending}
          fog={false}
          depthWrite={false}
          transparent
          opacity={0.028}
        />
      </sprite>
    </group>
  );
}

function UnicornModel({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF(MODEL_URL);
  const gl = useThree((state) => state.gl);
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const seams = useRef<THREE.LineSegments>(null);
  const eyes = useRef<THREE.Group>(null);
  const pupilL = useRef<THREE.Sprite>(null);
  const pupilR = useRef<THREE.Sprite>(null);
  const ringL = useRef<THREE.Sprite>(null);
  const ringR = useRef<THREE.Sprite>(null);
  // accumulated twinkle phase — integrated each frame so the sweep can
  // speed up with the gaze without the discontinuity of t * speed
  const sweepPhase = useRef(0);
  const rig = useRef({
    bodyYaw: { x: BASE_YAW, v: 0 },
    neckYaw: { x: 0, v: 0 },
    neckPitch: { x: 0, v: 0 },
    headYaw: { x: 0, v: 0 },
    headPitch: { x: 0, v: 0 },
    m1: new THREE.Matrix4(),
    m2: new THREE.Matrix4(),
    m3: new THREE.Matrix4(),
  });
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
    // GLTF may deliver interleaved attributes, which can't be flagged dynamic
    // or rewritten per frame — copy them out into plain buffer attributes
    for (const name of ["position", "normal"] as const) {
      const attr = geo.getAttribute(name);
      if (attr && !(attr instanceof THREE.BufferAttribute)) {
        const arr = new Float32Array(attr.count * attr.itemSize);
        for (let i = 0; i < attr.count; i++) {
          for (let j = 0; j < attr.itemSize; j++) {
            arr[i * attr.itemSize + j] = attr.getComponent(i, j);
          }
        }
        geo.setAttribute(name, new THREE.BufferAttribute(arr, attr.itemSize));
      }
    }
    return geo;
  }, [scene]);

  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(DEEP_VIOLET),
        transparent: true,
        // Semi-frosted crystal — halfway between the original mirror gloss
        // and the fully matte pass: enough roughness to keep the soft env
        // washes on the facets, enough clearcoat to bring back a light
        // sparkle on edges catching the panels.
        opacity: 0.3,
        roughness: 0.28,
        metalness: 0,
        transmission: 0.72,
        ior: 1.5,
        thickness: 0.8,
        reflectivity: 0.6,
        clearcoat: 0.7,
        clearcoatRoughness: 0.15,
        envMapIntensity: 0.5,
        flatShading: true,
        // Front faces write depth so edges on the far side of the head are
        // occluded by the volume; polygonOffset keeps surface lines stable.
        depthWrite: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        emissive: new THREE.Color("#1c1452"),
        emissiveIntensity: 0.12,
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
        roughness: 0.55,
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

  // Edge layer that stays invisible until the travelling wave makes an edge
  // glint white for a moment — flashes only, no constant wireframe.
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

  // Rest pose snapshot + per-vertex neck weights for the fake rig: the body
  // and the edge lines deform from these originals every frame.
  const deform = useMemo(() => {
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const nrmAttr = geometry.getAttribute("normal") as THREE.BufferAttribute;
    posAttr.setUsage(THREE.DynamicDrawUsage);
    nrmAttr.setUsage(THREE.DynamicDrawUsage);
    const pos0 = Float32Array.from(posAttr.array as Float32Array);
    const nrm0 = Float32Array.from(nrmAttr.array as Float32Array);
    const { neckZ, muzzleSign } = neckFrame(pos0, posAttr.count);
    const weights = buildRigWeights(pos0, posAttr.count, neckZ, muzzleSign);
    const edgeAttr = edges.getAttribute("position") as THREE.BufferAttribute;
    edgeAttr.setUsage(THREE.DynamicDrawUsage);
    const epos0 = Float32Array.from(edgeAttr.array as Float32Array);
    const eweights = buildRigWeights(epos0, edgeAttr.count, neckZ, muzzleSign);
    // edges near the eye sockets get a constant white highlight
    const eyeL = [EYE_L.x, EYE_L.y, muzzleSign * EYE_L.z];
    const eyeR = [EYE_R.x, EYE_R.y, muzzleSign * EYE_R.z];
    const eyeEdge = new Float32Array(edgeAttr.count / 2);
    for (let e = 0; e < eyeEdge.length; e++) {
      const a = e * 6;
      const mx = (epos0[a] + epos0[a + 3]) / 2;
      const my = (epos0[a + 1] + epos0[a + 4]) / 2;
      const mz = (epos0[a + 2] + epos0[a + 5]) / 2;
      const dL = Math.hypot(mx - eyeL[0], my - eyeL[1], mz - eyeL[2]);
      const dR = Math.hypot(mx - eyeR[0], my - eyeR[1], mz - eyeR[2]);
      eyeEdge[e] = 1 - THREE.MathUtils.smoothstep(Math.min(dL, dR), 0.08, 0.22);
    }
    return { pos0, nrm0, weights, epos0, eweights, muzzleSign, eyeEdge };
  }, [geometry, edges]);

  // Tight hot-center texture for the pupil dots (same falloff as the halo).
  const coreGlow = useMemo(() => makeGlowTexture(), []);
  // Soft long-fade texture for the pink glow around the pupils.
  const ringGlow = useMemo(() => makeRingGlowTexture(), []);

  useEffect(() => {
    return () => {
      glass.dispose();
      innerGlow.dispose();
      edges.dispose();
      seam.dispose();
      coreGlow.dispose();
      ringGlow.dispose();
    };
  }, [glass, innerGlow, edges, seam, coreGlow, ringGlow]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // the neck (group) stays planted in the 45° rest pose with a faint
    // breathing sway; only the head turns toward the cursor, on a spring
    const engaged = !isMobile && gaze.current.active;
    const r = rig.current;

    // body yaw: rest pose for a centered/right cursor; once the cursor moves
    // into the left half, the whole model swings left (up to BODY_TURN_LEFT)
    // on a slow, heavy spring so the neck never has to over-twist
    const bodyTarget =
      BASE_YAW +
      (engaged
        ? THREE.MathUtils.clamp(gaze.current.x, -1, 0) * BODY_TURN_LEFT
        : 0);
    springStep(r.bodyYaw, bodyTarget, 10, 4.5, delta);

    // the chain aims at the world-space gaze minus whatever the body has
    // already turned, so as the body swings the neck unwinds by itself
    const worldYaw = engaged ? GAZE_YAW + gaze.current.x * 0.6 : BASE_YAW;
    const totalYaw = worldYaw - r.bodyYaw.x;
    // asymmetric pitch: the head throws itself up at a cursor above it much
    // harder than it dips toward one below
    const pitchGain = gaze.current.y < 0 ? 0.55 : 0.2;
    const totalPitch = engaged ? gaze.current.y * pitchGain : 0;

    // split the turn across the chain with anatomical limits: the neck takes
    // its share, the skull does the rest at the poll joint
    const neckYawT = THREE.MathUtils.clamp(
      totalYaw * NECK_YAW_SHARE,
      -NECK_YAW_MAX,
      NECK_YAW_MAX,
    );
    const neckPitchT = THREE.MathUtils.clamp(
      totalPitch * NECK_PITCH_SHARE,
      -PITCH_UP_MAX * 0.5,
      PITCH_DOWN_MAX * 0.5,
    );

    const headYawT = THREE.MathUtils.clamp(
      totalYaw * (1 - NECK_YAW_SHARE),
      -HEAD_YAW_MAX,
      HEAD_YAW_MAX,
    );
    const headPitchT = THREE.MathUtils.clamp(
      totalPitch * (1 - NECK_PITCH_SHARE),
      -PITCH_UP_MAX,
      PITCH_DOWN_MAX,
    );

    // both joints turn at the same time toward their own share of the angle:
    // the skull fast, the neck base slow and heavy
    springStep(r.headYaw, headYawT, 120, 11, delta);
    springStep(r.headPitch, headPitchT, 120, 11, delta);
    springStep(r.neckYaw, neckYawT, 18, 5.5, delta);
    springStep(r.neckPitch, neckPitchT, 18, 5.5, delta);

    g.rotation.y = r.bodyYaw.x + Math.sin(t * 0.22) * 0.08;
    g.rotation.x = Math.sin(t * 0.31) * 0.03;

    // FK chain: lower vertebrae take 40% of the neck angle, upper 60%, and a
    // slight roll tilts the head into the turn the way horses do
    makeJointMatrix(r.m1, J_NECK_BASE, null, r.neckYaw.x * 0.4, r.neckPitch.x * 0.4, 0);
    makeJointMatrix(
      r.m2,
      J_NECK_MID,
      r.m1,
      r.neckYaw.x * 0.6,
      r.neckPitch.x * 0.6,
      -r.neckYaw.x * 0.06,
    );
    makeJointMatrix(r.m3, J_POLL, r.m2, r.headYaw.x, r.headPitch.x, -r.headYaw.x * 0.12);

    // the eyes are fully head-bone vertices: drive their group straight from
    // the skull matrix so they ride every turn of the rig
    let gazeAlign = 0;
    const eyeGroup = eyes.current;
    if (eyeGroup) {
      eyeGroup.matrix.copy(r.m3);
      // how squarely the muzzle faces the camera (0 aside → 1 head-on):
      // the haze breathes in only for a camera-facing gaze, and the same
      // signal pumps the edge glints below
      eyeGroup.getWorldPosition(_eyePos);
      _gazeDir.set(0, 0, deform.muzzleSign).transformDirection(eyeGroup.matrixWorld);
      _toCam.copy(state.camera.position).sub(_eyePos).normalize();
      // hard head-on gate: dark until the muzzle is within ~25° of the
      // camera, full blaze only in true eye contact — a 3/4 view stays calm
      gazeAlign = THREE.MathUtils.smoothstep(_gazeDir.dot(_toCam), 0.82, 0.97);

      // per-eye facing factor: how squarely this eye's outward normal looks
      // at the camera — an averted eye goes fully dark, so nothing blooms
      // past the silhouette as a detached ball. The normal leans sideways
      // (horse eyes look outward) and the window dips below zero, so the
      // NEAR eye stays lit even in a full profile while the far one (dot
      // strongly negative) still cuts off.
      const faceOf = (sideSign: number) => {
        _eyeN
          .set(sideSign * 0.55, 0.05, deform.muzzleSign * 0.75)
          .normalize()
          .transformDirection(eyeGroup.matrixWorld);
        return THREE.MathUtils.smoothstep(_eyeN.dot(_toCam), -0.15, 0.3);
      };
      const faceL = faceOf(-1);
      const faceR = faceOf(1);

      // eyes glow steadily for whichever eye faces the camera, and pick up
      // an extra flash on true eye contact
      const setOpacity = (s: THREE.Sprite | null, o: number) => {
        if (s) (s.material as THREE.SpriteMaterial).opacity = o;
      };
      setOpacity(pupilL.current, (0.85 + 0.15 * gazeAlign) * faceL);
      setOpacity(pupilR.current, (0.85 + 0.15 * gazeAlign) * faceR);
      setOpacity(ringL.current, (0.35 + 0.3 * gazeAlign) * faceL);
      setOpacity(ringR.current, (0.35 + 0.3 * gazeAlign) * faceR);
    }

    const bodyGeo = body.current?.geometry;
    if (bodyGeo) {
      applyRig(
        bodyGeo.getAttribute("position") as THREE.BufferAttribute,
        deform.pos0,
        deform.weights,
        r.m1,
        r.m2,
        r.m3,
        bodyGeo.getAttribute("normal") as THREE.BufferAttribute,
        deform.nrm0,
      );
    }
    const seamGeo = seams.current?.geometry;
    if (seamGeo) {
      applyRig(
        seamGeo.getAttribute("position") as THREE.BufferAttribute,
        deform.epos0,
        deform.eweights,
        r.m1,
        r.m2,
        r.m3,
      );
    }

    // shimmer: narrow sine pulse per edge — bright only near its peak, so a
    // handful of edges flash white at a time as the wave sweeps the head;
    // a camera-facing gaze pumps the glints up and quickens the sweep, so
    // the eye light reads as sparks running over the facets, not a halo
    const colorAttr = seams.current?.geometry.getAttribute("color") as
      | THREE.BufferAttribute
      | undefined;
    if (colorAttr) {
      sweepPhase.current += delta * (0.9 + gazeAlign * 0.8);
      const sweep = sweepPhase.current;
      // dimmer and rarer than before: lower amplitude, and a much narrower
      // pulse (^18 vs ^8) so only a couple of edges flash at any moment
      const amp = 1.5 + gazeAlign * 1.6;
      const socket = 1.0 + gazeAlign * 1.5;
      for (let i = 0; i < twinklePhase.length; i++) {
        const s = Math.sin(sweep + twinklePhase[i]);
        const pulse = s > 0 ? s ** 18 : 0;
        const b = 0.1 + pulse * amp + deform.eyeEdge[i] * socket;
        const a = i * 2;
        colorAttr.setXYZ(a, b, b, b * 1.08);
        colorAttr.setXYZ(a + 1, b, b, b * 1.08);
      }
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={[0, -0.05, 0]} scale={1 / 1.5}>
      <mesh geometry={geometry} material={innerGlow} frustumCulled={false} />
      <mesh ref={body} geometry={geometry} material={glass} renderOrder={1} frustumCulled={false} />
      <lineSegments
        ref={seams}
        geometry={edges}
        material={seam}
        renderOrder={2}
        frustumCulled={false}
      />
      {/* eyes: a blazing white pupil wrapped in a tight pink glow, riding the
          skull joint; per-frame opacity fades each eye out as it turns away,
          so the far eye never floats past the silhouette, and both pick up
          an extra flash on true eye contact */}
      <group ref={eyes} matrixAutoUpdate={false}>
        {/* anchored on the measured EYE_L / EYE_R socket centroids, lifted a
            touch off the surface so the sprite plane clears the facets;
            sprites are depth-tested so the far eye hides behind the head */}
        <sprite ref={ringL} position={[EYE_L.x, EYE_L.y, deform.muzzleSign * (EYE_L.z + 0.004)]} scale={[0.24, 0.24, 1]} renderOrder={5}>
          <spriteMaterial
            map={ringGlow}
            color={EYE_RING}
            blending={THREE.AdditiveBlending}
            fog={false}
            depthTest
            depthWrite={false}
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </sprite>
        <sprite ref={ringR} position={[EYE_R.x, EYE_R.y, deform.muzzleSign * (EYE_R.z + 0.004)]} scale={[0.24, 0.24, 1]} renderOrder={5}>
          <spriteMaterial
            map={ringGlow}
            color={EYE_RING}
            blending={THREE.AdditiveBlending}
            fog={false}
            depthTest
            depthWrite={false}
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </sprite>
        <sprite ref={pupilL} position={[EYE_L.x, EYE_L.y, deform.muzzleSign * (EYE_L.z + 0.012)]} scale={[0.09, 0.09, 1]} renderOrder={6}>
          <spriteMaterial
            map={coreGlow}
            color={EYE_CORE}
            blending={THREE.AdditiveBlending}
            fog={false}
            depthTest
            depthWrite={false}
            transparent
            opacity={1}
            toneMapped={false}
          />
        </sprite>
        <sprite ref={pupilR} position={[EYE_R.x, EYE_R.y, deform.muzzleSign * (EYE_R.z + 0.012)]} scale={[0.09, 0.09, 1]} renderOrder={6}>
          <spriteMaterial
            map={coreGlow}
            color={EYE_CORE}
            blending={THREE.AdditiveBlending}
            fog={false}
            depthTest
            depthWrite={false}
            transparent
            opacity={1}
            toneMapped={false}
          />
        </sprite>
      </group>
    </group>
  );
}

export default function UnicornScene({ isMobile, active, zoom = 1, noBackdrop }: UnicornSceneProps) {
  const camZ = 3.2 / zoom;
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.05, camZ], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: noBackdrop }}
    >
      {/* noBackdrop drops only the OPAQUE black clear: the canvas goes
          transparent (alpha gl, no scene background) so every empty pixel
          shows the page's own wash straight through — a smaller head can no
          longer expose a hard scene-background box. The soft halo (Background
          glow) still renders: its sprites feather to full transparency at the
          edges, so on the transparent canvas the glow melts seamlessly into
          the bento wash instead of reading as a rectangle. mix-blend-screen +
          the black fog keep fading the model's dark facets into the page. */}
      {!noBackdrop && <color attach="background" args={["#000000"]} />}
      {/* depth dimmer: black fog keyed to camera distance — the muzzle
          (nearest) stays full-contrast while the neck and far facets sink
          into darkness; background/eye sprites opt out via fog={false} */}
      <fog attach="fog" args={["#000000", camZ - 0.2, camZ + 1.75]} />
      <BackgroundGlow />
      {/* neon-ring contrast scheme: almost no fill — unlit facets fall to
          black — while saturated rims burn bright, like the reference */}
      <ambientLight intensity={0.03} />
      {/* colored back-side rim lights: violet left, cyan right — they draw
          the silhouette (horn, ears, neck edge) out of the black background */}
      <pointLight position={[-3.5, 1.5, -2.5]} intensity={68} color={VIOLET} />
      <pointLight position={[3.5, 1.5, -2.5]} intensity={68} color={CYAN} />
      {/* side kickers, just behind the head plane: pink camera-left, bright
          blue camera-right — they rake the facets from the sides */}
      <pointLight position={[-4, 0.4, -0.6]} intensity={52} color="#ff5ad1" />
      <pointLight position={[4, 0.4, -0.6]} intensity={52} color="#35c8ff" />
      {/* barely-there white key: fill stays minimal so blacks stay black */}
      <directionalLight position={[0, 2, 4]} intensity={0.28} color="#ffffff" />
      {/* white core fixed in world space at the head center: the head sways
          around it, so interior facets shimmer as their angle changes */}
      <pointLight position={[0, -0.05, 0]} intensity={8} distance={1.7} decay={2} color="#ffffff" />
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
          intensity={isMobile ? 0.3 : 0.5}
          luminanceThreshold={0.42}
          luminanceSmoothing={0.25}
          radius={0.75}
        />
      </EffectComposer>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
