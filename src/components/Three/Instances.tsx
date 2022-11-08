import { useEffect, useRef } from "react"
import THREE, { Object3D, SphereGeometry, Vector3 } from "three";

export default function Instances() {
  const ref = useRef<THREE.InstancedMesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(null)
  const starRandomizer = () => Math.random() * 2000 - 1000;
  const count = 45000;
  const temp = new Object3D();
  const geometry = new SphereGeometry(1000, 100, 50);
  const materialOptions = {
    size: 1.0,
    transparency: true, 
    opacity: 0.7,
  }

  const vertices = [];

  useEffect(() => {
    if (typeof ref === 'undefined') { return; }
    console.log(count, temp);
    
    for (let i = 0; i < count; i++) {
      temp.position.set(starRandomizer(), starRandomizer(), starRandomizer())
      temp.updateMatrix()
      ref.current!.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    ref.current!.instanceMatrix.needsUpdate = true
  }, [])
  
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshPhongMaterial />
    </instancedMesh>
  )
}