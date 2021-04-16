import React from 'react'
import { Html, useProgress } from '@react-three/drei'

export function Loading() {
  const { progress } = useProgress()

  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial attach="material" color="white" transparent opacity={0.6} roughness={1} metalness={0} />
      <Html center>{Math.floor(progress)} % loaded</Html>
    </mesh>
  )
}
