import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loading } from '../Loading/Loading'
import { OrbitCamera } from '../Camera/OrbitCamera'
import Banana from '../Asset/Banana'
import Bee from '../Asset/Bee'

export function Playground() {
  return (
    <Canvas style={{ height: window.innerHeight, background: '#999999' }}>
      <OrbitCamera />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <Banana />
      </Suspense>
    </Canvas>
  )
}
