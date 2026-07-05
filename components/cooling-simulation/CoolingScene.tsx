"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CoolingSceneProps {
  loadMw: number;
}

// Station layout in 3D world units, left-to-right pipeline:
// Ocean intake -> Titanium heat exchanger <-> Immersion server racks
//              -> MED-TVC cells -> Freshwater tank / Mineral crystallizer
export const STATION_LABELS = [
  { id: "ocean", title: "Seawater Intake", left: "5%", top: "62%", color: "#85B7EB" },
  { id: "hx", title: "Titanium Plate Heat Exchanger", left: "24%", top: "40%", color: "#9aa5ad" },
  { id: "servers", title: "Immersion-Cooled Server Racks", left: "40%", top: "16%", color: "#5DCAA5" },
  { id: "med", title: "MED-TVC Flash Cells", left: "60%", top: "48%", color: "#bfe3f2" },
  { id: "freshwater", title: "Freshwater Output", left: "84%", top: "18%", color: "#85B7EB" },
  { id: "minerals", title: "Mineral Crystallization / ZLD", left: "84%", top: "78%", color: "#d9c9a8" },
];

function lerpVec3(a: THREE.Vector3, b: THREE.Vector3, t: number): THREE.Vector3 {
  return new THREE.Vector3(
    a.x + (b.x - a.x) * t,
    a.y + (b.y - a.y) * t,
    a.z + (b.z - a.z) * t
  );
}

function pointOnPath(path: THREE.Vector3[], t: number): THREE.Vector3 {
  const segments = path.length - 1;
  const segLen = 1 / segments;
  const segIndex = Math.min(segments - 1, Math.floor(t / segLen));
  const localT = (t - segIndex * segLen) / segLen;
  return lerpVec3(path[segIndex], path[segIndex + 1], localT);
}

interface FlowSystem {
  points: THREE.Points;
  path: THREE.Vector3[];
  progress: Float32Array;
  speeds: Float32Array;
  colorStops?: { t: number; color: THREE.Color }[];
}

function colorAtStop(stops: { t: number; color: THREE.Color }[], t: number): THREE.Color {
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i].t && t <= stops[i + 1].t) {
      const localT = (t - stops[i].t) / (stops[i + 1].t - stops[i].t);
      return stops[i].color.clone().lerp(stops[i + 1].color, localT);
    }
  }
  return stops[stops.length - 1].color.clone();
}

function makeFlowSystem(
  path: THREE.Vector3[],
  count: number,
  size: number,
  color: THREE.Color,
  colorStops?: { t: number; color: THREE.Color }[]
): FlowSystem {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const progress = new Float32Array(count);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    progress[i] = i / count;
    speeds[i] = 0.85 + Math.random() * 0.3;
    const p = pointOnPath(path, progress[i]);
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
    const c = colorStops ? colorAtStop(colorStops, progress[i]) : color;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });

  return { points: new THREE.Points(geometry, material), path, progress, speeds, colorStops };
}

function makeStationMesh(
  geometry: THREE.BufferGeometry,
  color: number,
  opacity: number,
  position: [number, number, number]
): THREE.Mesh {
  const material = new THREE.MeshStandardMaterial({ color, transparent: opacity < 1, opacity, roughness: 0.6 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  return mesh;
}

export function CoolingScene({ loadMw }: CoolingSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMwRef = useRef(loadMw);

  useEffect(() => {
    loadMwRef.current = loadMw;
  }, [loadMw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark = () => document.documentElement.getAttribute("data-theme") !== "light";

    const scene = new THREE.Scene();
    const bgColor = () => new THREE.Color(isDark() ? 0x0a0a0a : 0xfbfaf7);
    scene.background = bgColor();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1, 14);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(4, 6, 8);
    scene.add(dirLight);

    // ── Station geometry ──
    const oceanGeo = new THREE.BoxGeometry(3, 1.5, 3);
    scene.add(makeStationMesh(oceanGeo, 0x85b7eb, 0.45, [-8.5, -1, 0]));

    const hxGeo = new THREE.BoxGeometry(0.4, 3, 2);
    scene.add(makeStationMesh(hxGeo, 0x9aa5ad, 1, [-4.5, 1, 0]));

    const rackGeo = new THREE.BoxGeometry(0.6, 1.6, 0.8);
    [-2.2, -1.5, -0.8].forEach((x) => {
      scene.add(makeStationMesh(rackGeo, 0x5dcaa5, 1, [x, 2.5, 0]));
    });

    const medGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.8, 24);
    [0.5, 2, 3.5].forEach((x) => {
      scene.add(makeStationMesh(medGeo, 0xbfe3f2, 0.5, [x, 0.5, 0]));
    });

    const freshwaterGeo = new THREE.BoxGeometry(1.8, 1.6, 1.6);
    scene.add(makeStationMesh(freshwaterGeo, 0x85b7eb, 0.85, [6.5, 2, 0]));

    const mineralGeo = new THREE.BoxGeometry(1.8, 1.4, 1.6);
    scene.add(makeStationMesh(mineralGeo, 0xd9c9a8, 0.85, [6.5, -1.5, 0]));

    // ── Flow particle systems ──
    const seawaterCold = new THREE.Color(0x85b7eb);
    const seawaterWarm = new THREE.Color(0xf0a868);
    const coolantHot = new THREE.Color(0xff6b4a);
    const coolantCool = new THREE.Color(0x5dcaa5);
    const distillateColor = new THREE.Color(0xcfe8f7);
    const brineColor = new THREE.Color(0xd9c9a8);

    const flowSystems: FlowSystem[] = [];

    // 1. Seawater intake -> heat exchanger -> warmed feed -> MED cells
    flowSystems.push(
      makeFlowSystem(
        [
          new THREE.Vector3(-8.5, -1, 0.8),
          new THREE.Vector3(-4.5, 0.4, 0.8),
          new THREE.Vector3(-4.5, 1.6, 0.8),
          new THREE.Vector3(0.5, 1, 0.8),
          new THREE.Vector3(2, 1, 0.8),
          new THREE.Vector3(3.5, 1, 0.8),
        ],
        28,
        0.18,
        seawaterCold,
        [
          { t: 0, color: seawaterCold },
          { t: 0.4, color: seawaterCold },
          { t: 0.5, color: seawaterWarm },
          { t: 1, color: seawaterWarm },
        ]
      )
    );

    // 2. Coolant loop: server hot outlet -> HX -> server cold inlet -> back up
    flowSystems.push(
      makeFlowSystem(
        [
          new THREE.Vector3(-1.5, 1.8, -0.8),
          new THREE.Vector3(-4.5, 1.8, -0.8),
          new THREE.Vector3(-4.5, 0.2, -0.8),
          new THREE.Vector3(-1.5, 0.2, -0.8),
          new THREE.Vector3(-1.5, 1.8, -0.8),
        ],
        24,
        0.16,
        coolantHot,
        [
          { t: 0, color: coolantHot },
          { t: 0.25, color: coolantHot },
          { t: 0.5, color: coolantCool },
          { t: 0.75, color: coolantCool },
          { t: 1, color: coolantHot },
        ]
      )
    );

    // 3. Distillate -> freshwater tank
    flowSystems.push(
      makeFlowSystem(
        [
          new THREE.Vector3(2, 1.4, 0.8),
          new THREE.Vector3(4, 1.4, 0.8),
          new THREE.Vector3(6.5, 2, 0.8),
        ],
        18,
        0.16,
        distillateColor
      )
    );

    // 4. Brine -> mineral crystallizer
    flowSystems.push(
      makeFlowSystem(
        [
          new THREE.Vector3(2, -0.4, 0.8),
          new THREE.Vector3(4, -0.4, 0.8),
          new THREE.Vector3(6.5, -1.5, 0.8),
        ],
        18,
        0.16,
        brineColor
      )
    );

    flowSystems.forEach((fs) => scene.add(fs.points));

    // ── Resize handling ──
    const updateSize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // ── Theme handling ──
    const themeObserver = new MutationObserver(() => {
      scene.background = bgColor();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // ── Animation loop ──
    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const speedFactor = 0.4 + loadMwRef.current * 0.6;

      for (const fs of flowSystems) {
        const positions = fs.points.geometry.attributes.position.array as Float32Array;
        const colors = fs.points.geometry.attributes.color.array as Float32Array;
        for (let i = 0; i < fs.progress.length; i++) {
          fs.progress[i] += 0.0025 * speedFactor * fs.speeds[i];
          if (fs.progress[i] > 1) fs.progress[i] -= 1;
          const p = pointOnPath(fs.path, fs.progress[i]);
          positions[i * 3] = p.x;
          positions[i * 3 + 1] = p.y;
          positions[i * 3 + 2] = p.z;
          if (fs.colorStops) {
            const c = colorAtStop(fs.colorStops, fs.progress[i]);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
          }
        }
        fs.points.geometry.attributes.position.needsUpdate = true;
        if (fs.colorStops) fs.points.geometry.attributes.color.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
