import React, { useRef } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export function ThirdPersonCamera(props) {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement }
  } = useThree()
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef()
  useFrame((state) => controls.current.update())
  return <orbitControls ref={controls} args={[camera, domElement]} {...props} />
}
