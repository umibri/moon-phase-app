import { useEffect, useRef, useState } from 'react'
import { useLoader, Vector3, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Bounds, SpotLight } from '@react-three/drei'


interface MoonPosition {
  [key: string]: [number, number, number];
}

const positions: MoonPosition = {
  newMoon: [-1, 0, 0],
  waxCrescent: [-1, 0, -1],
  firstQuarter: [0, 0, -2],
  waxGibbous: [1, 0, -1],
  fullMoon: [2, 0, 0],
  waningGibbous: [1, 0, 1],
  lastQuarter: [0, 0, 2],
  waningCrescent: [-1, 0, 1],
  newNewMoon: [-1, 0, 0],
};




export default function MoonObject() {
  const colorMap = useLoader(TextureLoader, 'moon_8k.jpg');
  const [someX, setSomeX] = useState(0);
  const [someZ, setSomeZ] = useState(0);
  const ref = useRef(null);
  const r = 30;
  let theta = 0;
  const dTheta = 2 * Math.PI / 1000;
  
  // new moon       -1, 0, 0     delta [0, 0, 0]
  // wax crescent   -1, 0, -1    delta [0, 0, -1]
  // first quarter   0, 0, -2    delta [1, 0, -1]
  // wax gibbous     1, 0, -1    delta [1, 0, 1]
  // full moon       2, 0, 0     delta [1, 0, 1]
  // wan gibbous     1, 0, 1     delta [-1, 0, 1]
  // last quarter    0, 0, 2     delta [-1, 0, 1]
  // wan crescent   -1, 0, 1     delta [-1, 0, -1]
  // new moon       -1, 0, 0     delta [0, 0, -1]

  function animatePhase() {
    // theta += dTheta;
    setSomeX(r * Math.cos(Date.now() / 1000));
    setSomeZ(r * Math.sin(Date.now() / 1000));  
    // console.log(someX, someZ);
  }

  useFrame(()=>animatePhase());



  return (
    <>
      <Bounds fit observe damping={6} margin={1.5}>
        <ambientLight intensity={0.04} />
        <pointLight position={[someX, 0, someZ]} intensity={1} ref={ref} />

        <mesh receiveShadow>
          <sphereGeometry args={[5, 50, 50]} />
          <meshStandardMaterial map={colorMap} />
        </mesh>
      </Bounds>
    </>
  )
}