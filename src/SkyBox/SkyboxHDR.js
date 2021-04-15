import { useEffect } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'

export function SkyboxHDR({ background = true }) {
  // pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
  // Note that, by convention, cube maps are specified in a coordinate system in which positive-x is to the right when looking up the positive-z axis
  // in other words, using a left-handed coordinate system. Since three.js uses a right-handed coordinate system, environment maps used in three.js will have pos-x and neg-x swapped.
  const { gl, scene } = useThree()
  const [cubeMap] = useLoader(
    HDRCubeTextureLoader,
    [['Spacebox_left.hdr', 'Spacebox_right.hdr', 'Spacebox_top.hdr', 'Spacebox_bottom.hdr', 'Spacebox_front.hdr', 'Spacebox_back.hdr']],
    (loader) => {
      loader.setDataType(THREE.UnsignedByteType)
      loader.setPath('./images/Spacebox2/')
    }
  )
  useEffect(() => {
    const gen = new THREE.PMREMGenerator(gl)
    gen.compileEquirectangularShader()
    const hdrCubeRenderTarget = gen.fromCubemap(cubeMap)
    cubeMap.dispose()
    gen.dispose()
    if (background) scene.background = hdrCubeRenderTarget.texture
    scene.environment = hdrCubeRenderTarget.texture
    return () => (scene.environment = scene.background = null)
  }, [cubeMap])
  return null
}
