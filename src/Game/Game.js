import React, { Component } from 'react'
import * as THREE from 'three'
import SkyBox from '../SkyBox/Skybox'
import { ThirdPersonCamera } from '../Camera/ThirdPersonCamera'
import { BasicCharacterController } from '../Controller/BasicCharacterController'

export class Game extends Component {
  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.physicallyCorrectLights = true
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 4
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap

    camera.position.set(0, 30, 100)

    renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(renderer.domElement)

    new SkyBox(scene, renderer)

    let light1 = new THREE.DirectionalLight(0xffffff, 1.0)
    light1.position.set(-100, 100, 100)
    light1.target.position.set(0, 0, 0)
    light1.castShadow = true
    light1.shadow.bias = -0.001
    light1.shadow.mapSize.width = 4096
    light1.shadow.mapSize.height = 4096
    light1.shadow.camera.near = 0.5
    light1.shadow.camera.far = 500.0
    light1.shadow.camera.left = 50
    light1.shadow.camera.right = -50
    light1.shadow.camera.top = 50
    light1.shadow.camera.bottom = -50
    scene.add(light1)

    let light2 = new THREE.AmbientLight(0xffffff, 0.25)
    scene.add(light2)

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0x808080
      })
    )
    plane.castShadow = false
    plane.receiveShadow = true
    plane.rotation.x = -Math.PI / 2
    scene.add(plane)

    // let orbit = new OrbitControls(camera, renderer.domElement)
    // orbit.minDistance = 50
    // orbit.maxDistance = 250

    let mixers = []

    const params = {
      camera: camera,
      scene: scene
    }

    let controls = new BasicCharacterController(params)
    let thirdPersonCamera = new ThirdPersonCamera({
      camera: camera,
      target: controls
    })

    // ------------------------
    //     Window Resize
    //-------------------------
    const onWindowResize = function () {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onWindowResize)

    // ------------------------
    //     Game Loop
    //-------------------------
    const step = function (timeElapsed) {
      const timeElapsedS = timeElapsed * 0.001
      if (mixers) {
        mixers.map((m) => m.update(timeElapsedS))
      }

      if (controls) {
        controls.Update(timeElapsedS)
      }

      thirdPersonCamera.Update(timeElapsedS)
    }

    let previousRAF = null
    const animate = function () {
      requestAnimationFrame((t) => {
        if (previousRAF === null) {
          previousRAF = t
        }

        animate()

        renderer.render(scene, camera)
        step(t - previousRAF)
        previousRAF = t
      })
    }

    animate()
  }

  render() {
    return (
      <>
        <div ref={(ref) => (this.mount = ref)} />
      </>
    )
  }
}
