import { CuboidCollider } from "@react-three/rapier";
import { BOUNDARY_CONFIG } from "./Constants";

export default function Boundaries() {
  const { width, height, depth, thickness } = BOUNDARY_CONFIG;

  const halfW = width / 2;
  const halfH = height / 2;
  const halfD = depth / 2;
  const t = thickness / 2;

  return (
    <>
      {/* Left Wall */}
      <CuboidCollider args={[t, halfH + t, halfD + t]} position={[-halfW - t, 0, 0]} />
      {/* Right Wall */}
      <CuboidCollider args={[t, halfH + t, halfD + t]} position={[halfW + t, 0, 0]} />
      {/* Bottom Wall */}
      <CuboidCollider args={[halfW + t, t, halfD + t]} position={[0, -halfH - t, 0]} />
      {/* Top Wall */}
      <CuboidCollider args={[halfW + t, t, halfD + t]} position={[0, halfH + t, 0]} />
      {/* Front Wall */}
      <CuboidCollider args={[halfW + t, halfH + t, t]} position={[0, 0, halfD + t]} />
      {/* Back Wall */}
      <CuboidCollider args={[halfW + t, halfH + t, t]} position={[0, 0, -halfD - t]} />
    </>
  );
}
