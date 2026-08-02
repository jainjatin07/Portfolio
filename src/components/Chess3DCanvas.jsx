import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const TILE_SIZE = 1.1;
const BOARD_OFFSET = 3.5 * TILE_SIZE;

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

// Convert algebraic notation ('e4') to 3D world position [x, y, z]
export function squareToWorld(square) {
  if (!square || square.length < 2) return [0, 0, 0];
  const fileIdx = FILES.indexOf(square[0]);
  const rankIdx = RANKS.indexOf(parseInt(square[1], 10));
  if (fileIdx === -1 || rankIdx === -1) return [0, 0, 0];

  const x = (fileIdx - 3.5) * TILE_SIZE;
  const z = (rankIdx - 3.5) * TILE_SIZE;
  return [x, 0, z];
}

// 3D Procedural Piece Mesh Builder
function Piece3DMesh({ type, color, isSelected }) {
  const isWhite = color === "w";
  const materialProps = useMemo(
    () => ({
      color: isWhite ? "#ffffff" : "#18181b",
      roughness: isWhite ? 0.35 : 0.25,
      metalness: isWhite ? 0.15 : 0.4,
      emissive: isSelected ? (isWhite ? "#ffff88" : "#444400") : "#000000",
      emissiveIntensity: isSelected ? 0.4 : 0,
    }),
    [isWhite, isSelected]
  );

  return (
    <group scale={[0.85, 0.85, 0.85]}>
      {/* Base Pedestal */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.2, 32]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Piece Body Geometries */}
      {type === "p" && (
        <>
          <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.25, 0.38, 0.35, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.24, 24, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </>
      )}

      {type === "r" && (
        <>
          <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.34, 0.4, 0.6, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.38, 0.34, 0.2, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </>
      )}

      {type === "n" && (
        <>
          <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.3, 0.38, 0.5, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.75, -0.05]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.32, 0.42, 0.42]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </>
      )}

      {type === "b" && (
        <>
          <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.28, 0.38, 0.6, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </>
      )}

      {type === "q" && (
        <>
          <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.26, 0.4, 0.8, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.35, 0.22, 0.2, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 1.22, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </>
      )}

      {type === "k" && (
        <>
          <mesh castShadow receiveShadow position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.28, 0.42, 0.9, 24]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 1.15, 0]}>
            <boxGeometry args={[0.38, 0.15, 0.38]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          {/* Cross on King */}
          <mesh castShadow receiveShadow position={[0, 1.35, 0]}>
            <boxGeometry args={[0.08, 0.24, 0.08]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 1.38, 0]}>
            <boxGeometry args={[0.2, 0.08, 0.08]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </>
      )}
    </group>
  );
}

// 3D Animated Piece with Smooth Arc Movement
function Animated3DPiece({ pieceData, targetPos, isSelected, onClick }) {
  const groupRef = useRef();
  const currentPos = useRef(new THREE.Vector3(...targetPos));
  const startPos = useRef(new THREE.Vector3(...targetPos));
  const animProgress = useRef(1);

  // Trigger smooth arc animation when target position changes
  useEffect(() => {
    if (
      currentPos.current.x !== targetPos[0] ||
      currentPos.current.z !== targetPos[2]
    ) {
      startPos.current.copy(currentPos.current);
      animProgress.current = 0;
    }
  }, [targetPos]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    if (animProgress.current < 1) {
      animProgress.current = Math.min(1, animProgress.current + delta * 2.8); // Smooth 0.35s move
      const t = animProgress.current;

      // Ease out cubic
      const easeT = 1 - Math.pow(1 - t, 3);

      // Lerp X & Z
      currentPos.current.x = THREE.MathUtils.lerp(startPos.current.x, targetPos[0], easeT);
      currentPos.current.z = THREE.MathUtils.lerp(startPos.current.z, targetPos[2], easeT);

      // Arc Jump Y
      const arcHeight = Math.sin(t * Math.PI) * 0.9;
      currentPos.current.y = targetPos[1] + arcHeight;

      groupRef.current.position.copy(currentPos.current);
    } else {
      groupRef.current.position.set(...targetPos);
      currentPos.current.set(...targetPos);
    }
  });

  return (
    <group ref={groupRef} position={targetPos} onClick={onClick}>
      <Piece3DMesh type={pieceData.type} color={pieceData.color} isSelected={isSelected} />
    </group>
  );
}

// 3D Chessboard Tiles & Interactive Board Scene
export default function Chess3DCanvas({
  boardGrid,
  selectedSquare,
  validMoveSquares,
  onSquareClick,
}) {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[440px] relative rounded-xl overflow-hidden shadow-2xl border-2 border-black bg-zinc-950">
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 9.5, 9.5]} fov={40} />
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          minDistance={6}
          maxDistance={18}
        />

        {/* Lighting Setup */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[6, 12, 8]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
        />
        <directionalLight position={[-6, 8, -6]} intensity={0.5} />

        {/* 3D Board Pedestal Base */}
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <boxGeometry args={[9.5, 0.4, 9.5]} />
          <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* 8x8 Board Tiles & Pieces */}
        {RANKS.map((rank, rankIdx) =>
          FILES.map((file, fileIdx) => {
            const squareName = `${file}${rank}`;
            const isDark = (rankIdx + fileIdx) % 2 === 1;
            const piece = boardGrid[rankIdx][fileIdx];
            const isSelected = selectedSquare === squareName;
            const isValidMove = validMoveSquares.includes(squareName);
            const worldPos = squareToWorld(squareName);

            return (
              <group key={squareName}>
                {/* 3D Tile Mesh */}
                <mesh
                  position={[worldPos[0], 0, worldPos[2]]}
                  receiveShadow
                  onClick={(e) => {
                    e.stopPropagation();
                    onSquareClick(squareName);
                  }}
                >
                  <boxGeometry args={[TILE_SIZE * 0.98, 0.1, TILE_SIZE * 0.98]} />
                  <meshStandardMaterial
                    color={
                      isSelected
                        ? "#eab308" // Gold for selected tile
                        : isValidMove
                        ? piece
                          ? "#ef4444" // Red for capture move
                          : "#22c55e" // Emerald green for valid move
                        : isDark
                        ? "#27272a" // Zinc-800
                        : "#f4f4f5" // Zinc-100
                    }
                    roughness={0.4}
                    metalness={0.1}
                  />
                </mesh>

                {/* Valid Move Indicator Ring/Beacon */}
                {isValidMove && !piece && (
                  <mesh position={[worldPos[0], 0.08, worldPos[2]]}>
                    <ringGeometry args={[0.15, 0.28, 32]} />
                    <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
                  </mesh>
                )}

                {/* 3D Piece Mesh (if square contains a piece) */}
                {piece && (
                  <Animated3DPiece
                    key={`${squareName}-${piece.color}-${piece.type}`}
                    pieceData={piece}
                    targetPos={worldPos}
                    isSelected={isSelected}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSquareClick(squareName);
                    }}
                  />
                )}
              </group>
            );
          })
        )}
      </Canvas>

      {/* Floating 3D Controls hint badge */}
      <div className="absolute bottom-3 left-3 bg-black/80 text-white text-[11px] px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        3D View Enabled — Drag mouse to rotate board
      </div>
    </div>
  );
}
