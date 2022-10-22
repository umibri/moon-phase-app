import { Canvas } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { OrbitControlsWrapper } from '@components/OrbitControlsWrapper'
import { Bounds, Stars, Plane } from '@react-three/drei'



export default function ThreeStars() {
  const ref = useRef<HTMLDivElement>(null);
  let HEIGHT = window.innerHeight;
  let WIDTH = window.innerWidth;
  let aspectRatio = WIDTH / HEIGHT;
  let fieldOfView = 75;
  let nearPlane = 1;
  let farPlane = 1000;
  let windowHalfX = WIDTH / 2;
  let windowHalfY = HEIGHT / 2;
  let positionZ = farPlane / 2;
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  function handleOnPointerMove(event: React.MouseEvent) {
    setMouseX(event.clientX - windowHalfX);
    setMouseY(event.clientY - windowHalfY);
    console.log(mouseX,mouseY);
  }

  return (
    <div className="w-screen h-screen" ref={ref}>
      <Canvas
        shadows={true}
        camera={{ fov: fieldOfView, near: nearPlane, far: farPlane, position: [0, 0, positionZ] }}
        onCreated={state => {
          state.gl.setClearColor(0x00011, 1);
          state.gl.setPixelRatio(window.devicePixelRatio);
          state.gl.setSize(WIDTH, HEIGHT);
          state.events.connect!(ref.current)
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
        <Bounds fit observe damping={6} margin={2.5}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink"/>
          </mesh>
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