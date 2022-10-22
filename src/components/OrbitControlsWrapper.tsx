import React, { useRef, useState } from 'react';
import { createPortal, useFrame } from '@react-three/fiber';
import { Scene } from 'three';
import { Box, OrbitControls, PerspectiveCamera, Plane, useFBO } from '@react-three/drei';
import type { Camera } from 'three';
import type { OrbitControlsProps } from '@react-three/drei';



export const OrbitControlsWrapper = (props: OrbitControlsProps) => {
  const args = {
    enableDamping: true,
    enablePan: true,
    enableRotate: true,
    enableZoom: true,
    reverseOrbit: false,
  };

  return (
  <>
    <OrbitControls {...args} />
    <Box>
      <meshBasicMaterial wireframe />
    </Box>
  </>
  )
}
 
/*
import React from "react";
import { extend, Object3DNode, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orbitControls': Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

function Controls() {
  const { camera, gl } = useThree();
  return (
    <orbitControls attach={"orbitControls"} args={[camera, gl.domElement]} />
  );
}

export default Controls;
*/