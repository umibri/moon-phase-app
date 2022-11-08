import { Stars, Plane } from '@react-three/drei'

export default function StarrySky() {

  return (
    <>
      <Stars depth={50} factor={3}/>
      <axesHelper />
    </>
  )
}

/* Used for seeing wireframe for plane
<Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}>
  <meshBasicMaterial color="red" wireframe />
</Plane>
    radius?: number;
    depth?: number;
    count?: number;
    factor?: number;
    saturation?: number;
    fade?: boolean;
    speed?: number;
*/