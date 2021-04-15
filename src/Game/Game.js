import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import KeyboardState from '../Keyboard/KeyboardState'
import GamePad from '../Keyboard/Gamepad'
import { Loading } from '../Loading/Loading'
import { OrbitCamera } from '../Camera/OrbitCamera'
// import Bee from '../Asset/Bee'
import YBot from '../Asset/Ybot'
import { Skybox } from '../SkyBox/Skybox'
import { SkyboxHDR } from '../SkyBox/SkyboxHDR'

export function Game() {
  const pad = new GamePad(window)
  const input = new KeyboardState()
  input.listenTo(window)
  input.addMapping(32, (keyState) => {
    console.log(keyState)
  })

  return (
    <>
      <Canvas style={{ height: window.innerHeight }}>
        <OrbitCamera autoRotate={false} />
        {/*
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        */}

        <Suspense fallback={<Loading />}>
          <Skybox />
          <SkyboxHDR />
          <YBot />
        </Suspense>
      </Canvas>
    </>
  )
}
