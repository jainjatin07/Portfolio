import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, BallCollider } from "@react-three/rapier";
import { PHYSICS_CONFIG } from "./Constants";

// High subdivision UV sphere geometry for smooth glossy ceramic finish
const sharedCeramicGeometry = new THREE.SphereGeometry(1, 64, 64);
const impulseVector = new THREE.Vector3();

export default function Sphere({
  id = 0,
  scale = 1,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive = true,
  initialPosition,
}) {
  const api = useRef(null);

  useFrame((state, delta) => {
    if (!isActive || !api.current) return;
    const clampedDelta = Math.min(0.05, delta);

    const { x, y, z } = PHYSICS_CONFIG.attractionForce;
    const currentTranslation = api.current.translation();

    // Inward force toward center keeping cluster naturally packed
    impulseVector
      .set(currentTranslation.x, currentTranslation.y, currentTranslation.z)
      .normalize()
      .multiply(
        new THREE.Vector3(
          x * clampedDelta * scale,
          y * clampedDelta * scale,
          z * clampedDelta * scale
        )
      );

    // Organic multi-frequency floating drift — creates natural buoyancy
    const time = state.clock.getElapsedTime();
    const phase = id * 0.618; // golden ratio spacing per ball
    impulseVector.y +=
      Math.sin(time * 0.9 + phase) * 0.06 * scale +
      Math.sin(time * 1.7 + phase * 2.1) * 0.025 * scale;
    impulseVector.x +=
      Math.cos(time * 0.7 + phase * 1.3) * 0.02 * scale;

    api.current.applyImpulse(impulseVector, true);

    // Natural slow rotation — gentle tumble matching reference
    if (Math.random() < 0.035) {
      api.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 0.003,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.003,
        },
        true
      );
    }
  });

  const startPos = initialPosition || [r(5), r(5) - 1, r(3)];

  return (
    <RigidBody
      linearDamping={PHYSICS_CONFIG.linearDamping}
      angularDamping={PHYSICS_CONFIG.angularDamping}
      friction={PHYSICS_CONFIG.friction}
      restitution={PHYSICS_CONFIG.restitution}
      position={startPos}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sharedCeramicGeometry}
        material={material}
      />
    </RigidBody>
  );
}
