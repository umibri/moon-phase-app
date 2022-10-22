import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { OrbitControlsWrapper } from '@components/OrbitControlsWrapper'
import { Bounds, Stars, Plane } from '@react-three/drei'
import Moon3D from '@components/Moon3D'



export default function ThreeStars() {
  const HEIGHT = window.innerHeight;
  const WIDTH = window.innerWidth;
  const fieldOfView = 75;
  const nearPlane = 1;
  const farPlane = 1000;
  const positionZ = farPlane / 2;
  

  return (
    <div className="w-screen h-screen">
      <Canvas
        shadows={true}
        camera={{ fov: fieldOfView, near: nearPlane, far: farPlane, position: [180, 0, 0] }}
        onCreated={state => {
          state.gl.setClearColor(0x00011, 1);
          state.gl.setPixelRatio(window.devicePixelRatio);
          state.gl.setSize(WIDTH, HEIGHT);
        }}
        dpr={window.devicePixelRatio}
      >
        {/* Stars */}
        <Stars />
        <Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}>
          <meshBasicMaterial color="red" wireframe />
        </Plane>
        <axesHelper />


        {/* Controls */}
        <OrbitControlsWrapper />
        

        {/* Main Element */}
        <Bounds fit observe damping={6} margin={1.5}>
          <Moon3D />
        </Bounds>
      </Canvas>
    </div>
  )
}

/* Stars via Instances
import Instances from '@components/Instances';

... return (
  <ambientLight intensity={0.1} />
  <directionalLight color="white" position={[0, 0, 5]} />
  <Instances />
)
*/