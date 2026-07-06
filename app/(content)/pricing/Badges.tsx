"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import type { ThreeElement } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import type { Accent, Plan } from "./plans";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

/* ----------------------------- card dimensions ---------------------------- */
const CARD_W = 1.9;
const CARD_H = 2.5;
const STEP = 1.13; // half-pitch; x = (i-(n-1)/2)*STEP*2
const FOV = 24;
const JOINT_Y = 1.45; // lanyard attach point above card centre
const LINK_COUNT = 26;

/* -------------------------------- colours --------------------------------- */
function accentHex(accent: Accent) {
  switch (accent) {
    case "amber":
      return "#e8920f";
    case "violet":
      return "#8b5cf6";
    case "teal":
      return "#14b8a6";
    case "pink":
      return "#ec4899";
  }
}
function hexToRgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/* ------------------------------- swing sound ------------------------------ */
let audioCtx: AudioContext | null = null;
function ensureAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioCtx = new Ctx();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function playClink(strength = 1) {
  const ctx = ensureAudio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const out = ctx.createGain();
  out.gain.setValueAtTime(0.0001, t);
  out.gain.exponentialRampToValueAtTime(0.05 * strength, t + 0.004);
  out.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 3000;
  bp.Q.value = 0.8;
  bp.connect(out);
  out.connect(ctx.destination);
  [2350, 3150, 4300].forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = f * (0.97 + 0.06 * Math.random());
    const g = ctx.createGain();
    g.gain.value = 0.6 / (i + 1);
    o.connect(g);
    g.connect(bp);
    o.start(t);
    o.stop(t + 0.16);
  });
}
/** a quick settle rattle for when a pass is released and swings */
function playSwingRattle() {
  playClink(1);
  setTimeout(() => playClink(0.6), 130);
  setTimeout(() => playClink(0.35), 300);
}

/* ----------------------------- watermark icons ---------------------------- */
function strokeIcon(
  ctx: CanvasRenderingContext2D,
  draw: () => void,
  color: string,
  width: number,
  alpha: number,
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  draw();
  ctx.restore();
}

function drawDumbbell(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string, alpha: number) {
  strokeIcon(
    ctx,
    () => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.2);
      const bw = s * 0.95;
      ctx.beginPath();
      ctx.moveTo(-bw / 2, 0);
      ctx.lineTo(bw / 2, 0);
      ctx.stroke();
      const plate = (x: number, h: number) => {
        ctx.beginPath();
        roundRect(ctx, x - s * 0.09, -h / 2, s * 0.18, h, s * 0.06);
        ctx.stroke();
      };
      plate(-bw / 2, s * 0.62);
      plate(-bw / 2 - s * 0.24, s * 0.42);
      plate(bw / 2, s * 0.62);
      plate(bw / 2 + s * 0.24, s * 0.42);
      ctx.restore();
    },
    color,
    s * 0.06,
    alpha,
  );
}

function drawBowl(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string, alpha: number) {
  strokeIcon(
    ctx,
    () => {
      ctx.save();
      ctx.translate(cx, cy);
      // bowl
      ctx.beginPath();
      ctx.arc(0, s * 0.05, s * 0.5, 0.05 * Math.PI, 0.95 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, s * 0.05, s * 0.5, s * 0.14, 0, 0, Math.PI * 2);
      ctx.stroke();
      // face
      ctx.beginPath();
      ctx.arc(-s * 0.16, s * 0.2, s * 0.04, 0, Math.PI * 2);
      ctx.arc(s * 0.16, s * 0.2, s * 0.04, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, s * 0.26, s * 0.16, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
      // steam
      [-s * 0.18, s * 0.16].forEach((dx) => {
        ctx.beginPath();
        ctx.moveTo(dx, -s * 0.3);
        ctx.quadraticCurveTo(dx + s * 0.12, -s * 0.45, dx, -s * 0.62);
        ctx.stroke();
      });
      ctx.restore();
    },
    color,
    s * 0.06,
    alpha,
  );
}

function drawFlame(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string, alpha: number) {
  strokeIcon(
    ctx,
    () => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.62);
      ctx.bezierCurveTo(s * 0.52, -s * 0.18, s * 0.42, s * 0.55, 0, s * 0.6);
      ctx.bezierCurveTo(-s * 0.42, s * 0.55, -s * 0.52, -s * 0.18, 0, -s * 0.62);
      ctx.stroke();
      // inner flame
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.1);
      ctx.bezierCurveTo(s * 0.26, s * 0.12, s * 0.2, s * 0.42, 0, s * 0.46);
      ctx.bezierCurveTo(-s * 0.2, s * 0.42, -s * 0.26, s * 0.12, 0, -s * 0.1);
      ctx.stroke();
      ctx.restore();
    },
    color,
    s * 0.06,
    alpha,
  );
}

function drawIcon(plan: Plan, ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string, alpha: number) {
  if (plan.id === "food") drawBowl(ctx, cx, cy, s, color, alpha);
  else if (plan.id === "hardcore") drawFlame(ctx, cx, cy, s, color, alpha);
  else drawDumbbell(ctx, cx, cy, s, color, alpha);
}

/* ------------------------------ card artwork ------------------------------ */
function makeBadgeTexture(plan: Plan, dark: boolean): THREE.CanvasTexture {
  const w = 620;
  const h = Math.round((CARD_H / CARD_W) * w); // keep texture aspect = card aspect
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const accent = accentHex(plan.accent);

  // theme palette
  const ink = dark ? "#ffffff" : "#17171f";
  const inkMuted = dark ? "rgba(255,255,255,0.45)" : "rgba(23,23,31,0.45)";
  const inkFaint = dark ? "rgba(255,255,255,0.5)" : "rgba(23,23,31,0.5)";
  const chipNeutralBg = dark ? "rgba(255,255,255,0.14)" : "rgba(23,23,31,0.08)";
  const chipNeutralText = dark ? "#ffffff" : "#3a3a44";

  // base gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, dark ? "#1c1d28" : "#ffffff");
  grad.addColorStop(1, dark ? "#0c0c12" : "#f1f0f6");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // soft accent wash from the bottom
  const glow = ctx.createRadialGradient(
    w * 0.32,
    h * 1.02,
    h * 0.05,
    w * 0.32,
    h * 1.02,
    h * 0.82,
  );
  glow.addColorStop(0, hexToRgba(accent, dark ? 0.18 : 0.22));
  glow.addColorStop(1, hexToRgba(accent, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // watermark icon (more visible than before)
  drawIcon(plan, ctx, w * 0.62, h * 0.46, w * 0.42, accent, dark ? 0.26 : 0.34);

  // accent top edge
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, w, 10);

  const pad = 48;
  ctx.textBaseline = "alphabetic";

  // header
  ctx.fillStyle = ink;
  ctx.font = "800 38px Jost, system-ui, sans-serif";
  ctx.letterSpacing = "1px";
  ctx.fillText("POCKET FIT", pad, 104);
  ctx.fillStyle = inkMuted;
  ctx.font = "600 20px Jost, system-ui, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText(plan.comingSoon ? "COMING SOON" : "MEMBER PASS", pad, 138);
  ctx.letterSpacing = "0px";

  // chip
  const chipLabel = (plan.badge ?? (plan.comingSoon ? "Soon" : "")).toUpperCase();
  if (chipLabel) {
    const neutral = chipLabel === "FLEXIBLE";
    ctx.font = "800 20px Jost, system-ui, sans-serif";
    ctx.letterSpacing = "1px";
    const tw = ctx.measureText(chipLabel).width;
    const cw = tw + 40;
    const cx = w - pad - cw;
    ctx.fillStyle = neutral ? chipNeutralBg : accent;
    ctx.beginPath();
    roundRect(ctx, cx, 78, cw, 40, 20);
    ctx.fill();
    ctx.fillStyle = neutral ? chipNeutralText : "#101015";
    ctx.fillText(chipLabel, cx + 20, 105);
    ctx.letterSpacing = "0px";
  }

  // name
  ctx.fillStyle = ink;
  ctx.font = "800 104px Jost, system-ui, sans-serif";
  ctx.fillText(plan.name, pad - 2, h - 150);

  if (plan.comingSoon) {
    ctx.fillStyle = accent;
    ctx.font = "800 62px Jost, system-ui, sans-serif";
    ctx.fillText("Coming soon", pad, h - 70);
  } else {
    ctx.fillStyle = accent;
    ctx.font = "800 78px Jost, system-ui, sans-serif";
    ctx.fillText(plan.price ?? "", pad, h - 70);
    ctx.fillStyle = inkFaint;
    ctx.font = "500 30px Jost, system-ui, sans-serif";
    ctx.fillText(plan.period ?? "", pad, h - 28);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const SEG = {
  type: "dynamic" as const,
  canSleep: true,
  colliders: false as const,
  angularDamping: 2,
  linearDamping: 2,
};

/* --------------------- fit the row & pan to selection --------------------- */
function CameraRig({
  count,
  selectedIndex,
}: {
  count: number;
  selectedIndex: number;
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const look = useRef(new THREE.Vector3(0, -0.35, 0));

  const aspect = size.width / size.height;
  const tan = Math.tan((FOV * Math.PI) / 180 / 2);
  const halfW = (count - 1) * STEP + CARD_W / 2 + 1.0;
  // 1.43× pulls the camera back so cards render ~30% smaller (browse + zoomed)
  const baseZ = 1.43 * Math.max(halfW / (tan * aspect), 1.9 / tan);

  useEffect(() => {
    camera.position.set(0, -0.35, baseZ);
    look.current.set(0, -0.35, 0);
    camera.lookAt(look.current);
    camera.updateProjectionMatrix();
  }, [camera, baseZ]);

  useFrame((_, delta) => {
    const sel = selectedIndex >= 0;
    const cardX = sel ? (selectedIndex - (count - 1) / 2) * STEP * 2 : 0;
    // pan partway toward the selected pass so the enlarged card frames on its
    // own side with the panel opposite; pull back a touch for the taller card
    const tx = sel ? cardX * 0.5 : 0;
    const tz = sel ? baseZ * 1.34 : baseZ;
    const ty = sel ? -1.45 : -0.35;
    const k = Math.min(1, delta * 4);
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.position.z += (tz - camera.position.z) * k;
    look.current.x += (tx - look.current.x) * k;
    look.current.y += (ty - look.current.y) * k;
    camera.lookAt(look.current);
  });
  return null;
}

function Band({
  plan,
  index,
  anchorX,
  dark,
  dimmed,
  selected,
  onSelect,
}: {
  plan: Plan;
  index: number;
  anchorX: number;
  dark: boolean;
  dimmed: boolean;
  selected: boolean;
  onSelect: (id: string | null) => void;
}) {
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const band = useRef<THREE.Mesh>(null);
  const chain = useRef<THREE.InstancedMesh>(null);
  const faceMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const baseMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const clipMat = useRef<THREE.MeshStandardMaterial>(null);
  const cardGroup = useRef<THREE.Group>(null);
  const revealShader = useRef<THREE.WebGLProgramParametersWithUniforms | null>(
    null,
  );
  const dummy = useRef(new THREE.Object3D()).current;
  const up = useRef(new THREE.Vector3()).current;
  const nrm = useRef(new THREE.Vector3()).current;
  const bnrm = useRef(new THREE.Vector3()).current;
  const tang = useRef(new THREE.Vector3()).current;
  const basis = useRef(new THREE.Matrix4()).current;
  const lastClink = useRef(0);
  const prevPos = useRef<{ x: number; y: number } | null>(null);

  const vec = useRef(new THREE.Vector3()).current;
  const dir = useRef(new THREE.Vector3()).current;
  const ang = useRef(new THREE.Vector3()).current;
  const rot = useRef(new THREE.Vector3()).current;

  const { width, height } = useThree((s) => s.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const tex = useMemo(() => makeBadgeTexture(plan, dark), [plan, dark]);
  useEffect(() => () => tex.dispose(), [tex]);
  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);
  const down = useRef<{ x: number; y: number; t: number } | null>(null);
  const opacity = useRef(1);
  const scale = useRef(1);
  const reveal = useRef(0);
  const start = useRef(0);

  const accent = accentHex(plan.accent);

  const rb = (r: RefObject<RapierRigidBody | null>) =>
    r as RefObject<RapierRigidBody>;

  useRopeJoint(rb(fixed), rb(j1), [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(rb(j1), rb(j2), [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(rb(j2), rb(j3), [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(rb(j3), rb(card), [[0, 0, 0], [0, JOINT_Y, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (!start.current) start.current = state.clock.elapsedTime;

    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
      // rattle the chain while the pass is being moved
      const tp = card.current.translation();
      if (prevPos.current) {
        const sp =
          Math.hypot(tp.x - prevPos.current.x, tp.y - prevPos.current.y) /
          Math.max(delta, 0.001);
        if (sp > 1.2 && state.clock.elapsedTime - lastClink.current > 0.1) {
          playClink(Math.min(0.4, 0.12 + sp * 0.035));
          lastClink.current = state.clock.elapsedTime;
        }
      }
      prevPos.current = { x: tp.x, y: tp.y };
    } else if (prevPos.current) {
      prevPos.current = null;
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      [j1, j2].forEach((ref) => {
        const r = ref.current as RapierRigidBody & { lerped?: THREE.Vector3 };
        if (!r.lerped) r.lerped = new THREE.Vector3().copy(r.translation());
        const dist = Math.max(
          0.1,
          Math.min(1, r.lerped.distanceTo(r.translation())),
        );
        r.lerped.lerp(r.translation(), delta * (10 + dist * 40));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(
        (j2.current as RapierRigidBody & { lerped: THREE.Vector3 }).lerped,
      );
      curve.points[2].copy(
        (j1.current as RapierRigidBody & { lerped: THREE.Vector3 }).lerped,
      );
      curve.points[3].copy(fixed.current.translation());

      if (band.current) {
        (band.current.geometry as unknown as MeshLineGeometry).setPoints(
          curve.getPoints(32),
        );
      }
      // build interlocking chain links along the curve (each link rotated 90°
      // from its neighbour so they read as a real chain, not a string of beads)
      if (chain.current) {
        const pts = curve.getPoints(LINK_COUNT);
        for (let i = 0; i < LINK_COUNT; i++) {
          const p = pts[i];
          tang
            .copy(pts[Math.min(i + 1, pts.length - 1)])
            .sub(pts[Math.max(i - 1, 0)]);
          if (tang.lengthSq() < 1e-6) tang.set(0, 1, 0);
          tang.normalize();
          up.set(0, 0, 1);
          if (Math.abs(tang.z) > 0.9) up.set(1, 0, 0);
          nrm.copy(up).cross(tang).normalize();
          bnrm.copy(tang).cross(nrm).normalize();
          basis.makeBasis(
            tang,
            i % 2 === 0 ? nrm : bnrm,
            i % 2 === 0 ? bnrm : nrm,
          );
          dummy.position.copy(p);
          dummy.quaternion.setFromRotationMatrix(basis);
          dummy.scale.set(1.45, 1, 1); // elongate the link along the chain
          dummy.updateMatrix();
          chain.current.setMatrixAt(i, dummy.matrix);
        }
        chain.current.instanceMatrix.needsUpdate = true;
      }

      // settle rotation toward camera
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation() as unknown as THREE.Vector3);
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        false,
      );
    }

    // top-to-bottom reveal on appear (staggered per card)
    const tEl = state.clock.elapsedTime - start.current - index * 0.12;
    reveal.current = Math.max(0, Math.min(1, tEl / 1.0));
    if (revealShader.current)
      revealShader.current.uniforms.uReveal.value = reveal.current;

    // dim / highlight transitions
    const targetOpacity = dimmed ? 0 : 1;
    const targetScale = selected ? 1.9 : 1;
    opacity.current += (targetOpacity - opacity.current) * Math.min(1, delta * 6);
    scale.current += (targetScale - scale.current) * Math.min(1, delta * 6);
    if (faceMat.current) faceMat.current.opacity = opacity.current;
    if (baseMat.current) baseMat.current.opacity = opacity.current;
    if (clipMat.current) {
      clipMat.current.opacity = opacity.current;
      clipMat.current.transparent = true;
    }
    const vis = opacity.current > 0.02;
    if (band.current) {
      const m = band.current.material as MeshLineMaterial;
      m.opacity = opacity.current * 0.9;
      m.visible = vis;
    }
    if (chain.current) {
      (chain.current.material as THREE.MeshStandardMaterial).opacity =
        opacity.current;
      chain.current.visible = vis;
    }
    if (cardGroup.current) {
      cardGroup.current.scale.setScalar(scale.current);
      cardGroup.current.position.y = JOINT_Y * (1 - scale.current);
      cardGroup.current.visible = vis;
    }
  });

  return (
    <>
      <group position={[anchorX, 4, 0]}>
        <RigidBody ref={fixed} {...SEG} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...SEG}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...SEG}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...SEG}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...SEG}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.02]} />
          <group
            ref={cardGroup}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(e) => {
              e.stopPropagation();
              down.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
              try {
                (e.target as Element).setPointerCapture?.(e.pointerId);
              } catch {}
              playClink(0.8);
              if (card.current)
                setDragged(
                  new THREE.Vector3()
                    .copy(e.point)
                    .sub(vec.copy(card.current.translation())),
                );
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              try {
                (e.target as Element).releasePointerCapture?.(e.pointerId);
              } catch {}
              const wasDragging = dragged;
              setDragged(false);
              const d = down.current;
              down.current = null;
              if (
                d &&
                Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6 &&
                e.timeStamp - d.t < 400
              ) {
                // while a pass is zoomed in, any click that isn't a drag
                // returns to the row instead of jumping straight to another pass
                onSelect(selected || dimmed ? null : plan.id);
              } else if (wasDragging) {
                playSwingRattle();
              }
            }}
          >
            {/* base card */}
            <RoundedBox args={[CARD_W, CARD_H, 0.05]} radius={0.12} smoothness={5}>
              <meshPhysicalMaterial
                ref={baseMat}
                color={dark ? "#0c0c12" : "#ffffff"}
                clearcoat={dark ? 1 : 0.6}
                clearcoatRoughness={dark ? 0.25 : 0.35}
                roughness={dark ? 0.4 : 0.55}
                metalness={dark ? 0.3 : 0.05}
                transparent
              />
            </RoundedBox>
            {/* artwork face with top→bottom reveal */}
            <mesh position={[0, 0, 0.028]}>
              <planeGeometry args={[CARD_W - 0.02, CARD_H - 0.02]} />
              <meshPhysicalMaterial
                ref={faceMat}
                map={tex}
                roughness={0.5}
                clearcoat={0.5}
                transparent
                onBeforeCompile={(shader) => {
                  shader.uniforms.uReveal = { value: reveal.current };
                  shader.vertexShader =
                    "varying vec2 vRevealUv;\n" +
                    shader.vertexShader.replace(
                      "#include <begin_vertex>",
                      "#include <begin_vertex>\n  vRevealUv = uv;",
                    );
                  shader.fragmentShader =
                    "varying vec2 vRevealUv;\nuniform float uReveal;\n" +
                    shader.fragmentShader.replace(
                      "#include <dithering_fragment>",
                      "#include <dithering_fragment>\n  float _p = 1.0 - vRevealUv.y;\n  gl_FragColor.a *= 1.0 - smoothstep(uReveal, uReveal + 0.07, _p);",
                    );
                  revealShader.current = shader;
                }}
              />
            </mesh>
            {/* metal clip */}
            <mesh position={[0, CARD_H / 2 - 0.02, 0.02]}>
              <boxGeometry args={[0.42, 0.16, 0.1]} />
              <meshStandardMaterial
                ref={clipMat}
                color="#4a4a42"
                metalness={0.85}
                roughness={0.35}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* connecting wire */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[{ resolution: new THREE.Vector2(width, height) }]}
          color="#7d818a"
          depthTest={false}
          resolution={[width, height]}
          lineWidth={0.045}
          transparent
        />
      </mesh>
      {/* interlocking chain links */}
      <instancedMesh
        ref={chain}
        args={[undefined, undefined, LINK_COUNT]}
        frustumCulled={false}
      >
        <torusGeometry args={[0.07, 0.028, 8, 20]} />
        <meshStandardMaterial
          color="#cfd3d8"
          metalness={0.95}
          roughness={0.22}
          transparent
        />
      </instancedMesh>
    </>
  );
}

export default function Badges({
  plans,
  selected,
  dark,
  onSelect,
}: {
  plans: Plan[];
  selected: string | null;
  dark: boolean;
  onSelect: (id: string | null) => void;
}) {
  // WebGL contexts get dropped (GPU pressure, tab backgrounding, driver hiccups).
  // preventDefault lets three.js restore in place; if the browser refuses to
  // bring it back, bump the key to remount the Canvas with a fresh context so
  // the cards never stay gone.
  const [glKey, setGlKey] = useState(0);

  return (
    <Canvas
      key={glKey}
      camera={{ position: [0, 1.15, 22], fov: FOV }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "default" }}
      onPointerMissed={() => onSelect(null)}
      onCreated={({ gl }) => {
        const el = gl.domElement;
        // let vertical swipes scroll the page (to the footer) while taps and
        // horizontal drags still reach the cards — default 'auto' let the
        // browser swallow touch pointer events, so nothing was interactive
        el.style.touchAction = "pan-y";
        let restored = true;
        el.addEventListener(
          "webglcontextlost",
          (e) => {
            e.preventDefault();
            restored = false;
            window.setTimeout(() => {
              if (!restored) setGlKey((k) => k + 1);
            }, 400);
          },
          false,
        );
        el.addEventListener(
          "webglcontextrestored",
          () => {
            restored = true;
          },
          false,
        );
      }}
    >
      <CameraRig
        count={plans.length}
        selectedIndex={plans.findIndex((p) => p.id === selected)}
      />
      <ambientLight intensity={dark ? 0.8 : 0.95} />
      <directionalLight position={[5, 8, 6]} intensity={1.5} />
      <directionalLight position={[-6, 2, -4]} intensity={0.6} color="#b8a6ff" />
      <Physics gravity={[0, -40, 0]} interpolate timeStep={1 / 60}>
        {plans.map((plan, i) => {
          const x = (i - (plans.length - 1) / 2) * STEP * 2;
          return (
            <Band
              key={plan.id}
              plan={plan}
              index={i}
              anchorX={x}
              dark={dark}
              selected={selected === plan.id}
              dimmed={selected !== null && selected !== plan.id}
              onSelect={onSelect}
            />
          );
        })}
      </Physics>
      <Environment resolution={128}>
        <Lightformer
          intensity={2}
          position={[0, 4, 6]}
          scale={[12, 5, 1]}
          color="#fff6e8"
        />
        <Lightformer
          intensity={1.1}
          position={[-5, -2, 4]}
          scale={[7, 7, 1]}
          color="#b8a6ff"
        />
      </Environment>
    </Canvas>
  );
}
