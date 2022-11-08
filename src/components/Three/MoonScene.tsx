import { Canvas, useFrame } from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react';
import { OrbitControlsWrapper } from '@components/Three/OrbitControlsWrapper'
import MoonObject from '@components/Three/MoonObject'
import StarrySky from '@components/Three/StarrySky';


export default function MoonMain() {
  const HEIGHT = window.innerHeight;
  const WIDTH = window.innerWidth;
  const PIXELRATIO = window.devicePixelRatio;

  return (
    <div className="min-w-screen min-h-screen">
      <Canvas camera={{ fov: 75, near: 1, far: 1000, position: [500, 0, -1]}}
        onCreated={state => {
          state.gl.setClearColor(0x00011, 1);
          state.gl.setPixelRatio(PIXELRATIO);
          state.gl.setSize(WIDTH, HEIGHT);
        }}
        dpr={PIXELRATIO}
        shadows
      >
        <Suspense>
          {/* Stars */}
          <StarrySky />

          {/* Main Element */}
          <MoonObject />

          {/* Controls */}
          <OrbitControlsWrapper />
        </Suspense>
      </Canvas>
    </div>
  )
}

/* Stars via Instances
import Instances from '@components/Instances';

... return (
  <ambientLight intensity={0.1} />
  <fogExp2 attach="fog" color={0x000000} density={0.005} />
  <directionalLight color="white" position={[0, 0, 5]} />
  <Instances />
)
*/