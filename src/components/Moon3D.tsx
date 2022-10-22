import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function Moon3D() {
  const colorMap = useLoader(TextureLoader, 'moon.jpg');
  const [sunPosition, setSunPosition] = useState();

  const positions = {
    newMoon: [0, 0, 0],
    waxCrescent: [-0.5, 0, -1],
    firstQuarter: [0, 0, -1],
    waxGibbous: [0.5, 0, -1],
    fullMoon: [1, 0, 0],
    waningGibbous: [0.5, 0, 1],
    lastQuarter: [0, 0, 1],
    waningCrescent: [-0.5, 0, 1],
  };

  return (
    <>
      <ambientLight intensity={0.04} />
      <directionalLight
        intensity={0.75}
        position={[0, 0, 0]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  )
}
