import * as THREE from 'three'
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'

/**
 *
 */
export default class SkyBox {
  constructor(scene, renderer) {
    const loader = new THREE.CubeTextureLoader()
    loader.setPath('./images/Spacebox2/')
    const texture = loader.load([
      'Spacebox_left.png',
      'Spacebox_right.png',
      'Spacebox_top.png',
      'Spacebox_bottom.png',
      'Spacebox_front.png',
      'Spacebox_back.png'
    ])
    texture.encoding = THREE.sRGBEncoding

    const hdrloader = new HDRCubeTextureLoader()
    hdrloader.setPath('./images/Spacebox2/')
    hdrloader.setDataType(THREE.UnsignedByteType)
    const hdrtexture = hdrloader.load([
      'Spacebox_left.hdr',
      'Spacebox_right.hdr',
      'Spacebox_top.hdr',
      'Spacebox_bottom.hdr',
      'Spacebox_front.hdr',
      'Spacebox_back.hdr'
    ])

    hdrtexture.needsUpdate = true
    const gen = new THREE.PMREMGenerator(renderer)
    gen.compileEquirectangularShader()
    const hdrCubeRenderTarget = gen.fromCubemap(hdrtexture)
    scene.background = texture
    scene.environment = hdrCubeRenderTarget.texture

    texture.dispose()
    hdrtexture.dispose()
  }
}
