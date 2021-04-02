import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loading } from '../Loading/Loading'
import { CameraControls } from '../CameraControls/CameraControls'
import Bee from '../Asset/Bee'

export function Game() {
  return (
    <>
      <Canvas style={{ height: window.innerHeight, background: '#171717' }}>
        <CameraControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={<Loading />}>
          <Bee />
        </Suspense>
      </Canvas>
    </>
  )
}
