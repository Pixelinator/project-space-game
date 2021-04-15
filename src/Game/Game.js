import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loading } from '../Loading/Loading'
import { CameraControls } from '../CameraControls/CameraControls'
// import Bee from '../Asset/Bee'
import YBot from '../Asset/Ybot'
// import { Skybox } from '../SkyBox/Skybox'
import { SkyboxHDR } from '../SkyBox/SkyboxHDR'

export function Game() {
  return (
    <>
      <Canvas style={{ height: window.innerHeight }}>
        <CameraControls autoRotate={true} />
        {/*
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        */}
        <ambientLight intensity={0.3} />
        <Suspense fallback={<Loading />}>
          <SkyboxHDR />
          <YBot />
        </Suspense>
      </Canvas>
    </>
  )
}
