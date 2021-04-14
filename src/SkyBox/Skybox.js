import { useThree } from '@react-three/fiber'
import { CubeTextureLoader } from 'three'

export function Skybox() {
  const { scene } = useThree()
  const loader = new CubeTextureLoader()
  // pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
  // Note that, by convention, cube maps are specified in a coordinate system in which positive-x is to the right when looking up the positive-z axis
  // in other words, using a left-handed coordinate system. Since three.js uses a right-handed coordinate system, environment maps used in three.js will have pos-x and neg-x swapped.
  const texture = loader.load([
    './images/Spacebox2/Spacebox_left.png',
    './images/Spacebox2/Spacebox_right.png',
    './images/Spacebox2/Spacebox_top.png',
    './images/Spacebox2/Spacebox_bottom.png',
    './images/Spacebox2/Spacebox_front.png',
    './images/Spacebox2/Spacebox_back.png'
  ])

  scene.background = texture
  return null
}
