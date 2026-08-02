import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";

import { SPHERE_COUNT, SCALES, CAMERA_CONFIG } from "./Constants";
import { createCeramicMaterials } from "./Materials";
import { useIntersectionObserver } from "./Hooks";
import Sphere from "./Sphere";
import Pointer from "./Pointer";
import Boundaries from "./Boundaries";

const spheresData = Array.from({ length: SPHERE_COUNT }, (_, index) => ({
  id: index,
  scale: SCALES[index % SCALES.length],
  initialPosition: [
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 6 - 0.5,
    (Math.random() - 0.5) * 4,
  ],
}));

export default function TechStack() {
  const containerRef = useRef(null);
  const isActive = useIntersectionObserver(containerRef);

  const materials = useMemo(() => createCeramicMaterials(), []);

  return (
    <section
      ref={containerRef}
      className="techstack relative w-full h-[75vh] sm:h-[85vh] lg:h-screen min-h-[520px] bg-[#030508] overflow-hidden my-0 py-10"
      id="techstack"
      aria-label="Interactive 3D Tech Stack"
    >
      {/* HTML Title Overlay */}
      <div className="absolute top-6 sm:top-12 left-0 w-full text-center z-10 pointer-events-none px-4">
        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#94A3B8] font-medium mb-2">
          Interactive Portfolio
        </p>
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-light uppercase tracking-wider text-white font-sora drop-shadow-md">
          My <span className="font-semibold text-white">Techstack</span>
        </h2>
      </div>

      {/* 3D Scene Canvas */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          alpha: false,
          stencil: false,
          depth: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={CAMERA_CONFIG}
        onCreated={(state) => {
          state.gl.setClearColor("#030508");
          state.gl.toneMappingExposure = 1.4;
        }}
        className="w-full h-full"
      >
        {/* Fill Ambient Light */}
        <ambientLight intensity={0.8} color="#D0D8F0" />

        {/* Top Key Spotlight — creates the bright specular highlights on top of balls */}
        <spotLight
          position={[0, 24, 16]}
          intensity={4.0}
          angle={0.45}
          penumbra={0.8}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Secondary soft fill from front */}
        <spotLight
          position={[0, 8, 22]}
          intensity={1.8}
          angle={0.6}
          penumbra={1}
          color="#F0F4FF"
          castShadow={false}
        />

        {/* Left Vibrant Magenta/Pink Rim Light — matching reference image */}
        <directionalLight
          position={[-20, 16, 6]}
          intensity={6.0}
          color="#FF00AA"
        />

        {/* Right Electric Cyan/Blue Rim Light — matching reference image */}
        <directionalLight
          position={[20, -14, -6]}
          intensity={6.0}
          color="#00CFFF"
        />

        {/* Subtle warm back light for depth */}
        <directionalLight
          position={[0, -8, -14]}
          intensity={1.5}
          color="#8844FF"
        />

        {/* Rapier Physics World */}
        <Physics gravity={[0, 0, 0]} timeStep={1 / 60}>
          <Pointer isActive={isActive} />
          <Boundaries />
          {spheresData.map((item, i) => (
            <Sphere
              key={item.id}
              id={item.id}
              scale={item.scale}
              initialPosition={item.initialPosition}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>

        {/* Reflective Ground Plane Matching Reference Image */}
        <mesh
          position={[0, -5.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial
            color="#04060C"
            roughness={0.18}
            metalness={0.9}
          />
        </mesh>

        {/* HDR Environment for global illumination & reflections */}
        <Environment preset="studio" environmentIntensity={2.8} />

        {/* Post Processing */}
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#020406" aoRadius={1.8} intensity={1.3} />
          <Bloom luminanceThreshold={0.75} intensity={0.35} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </section>
  );
}
