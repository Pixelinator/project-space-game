/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'

export default function YBot(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('./models/gltf/ybot.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.mixamorigHips} />
      <skinnedMesh material={materials.Alpha_Body_MAT} geometry={nodes.Alpha_Surface.geometry} skeleton={nodes.Alpha_Surface.skeleton} />
      <skinnedMesh material={materials.Alpha_Joints_MAT} geometry={nodes.Alpha_Joints.geometry} skeleton={nodes.Alpha_Joints.skeleton} />
    </group>
  )
}

useGLTF.preload('./models/gltf/ybot.glb')