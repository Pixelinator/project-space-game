import React, { Component } from 'react'
import * as THREE from 'three'
import SkyBox from '../SkyBox/Skybox'
import { third_person_camera } from '../Entity/Camera/ThirdPersonCamera'
import { entity_manager } from '../Entity/EntityManager'
import { entity } from '../Entity/Entity'
import { player_entity } from '../Entity/Player/PlayerEntity'
import { player_input } from '../Entity/Player/PlayerInput'

import { spatial_grid_controller } from '../Controller/SpatialGrid/SpatialGridController'
import { spatial_hash_grid } from '../Controller/SpatialGrid/SpatialHashGrid'

export class Game extends Component {
  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(renderer.domElement)

    new SkyBox(scene, renderer)

    let light1 = new THREE.DirectionalLight(0xffffff, 1.0)
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

    // ------------------------
    //     Setup Entities
    //-------------------------
    const entityManager = new entity_manager.EntityManager()

    const grid = new spatial_hash_grid.SpatialHashGrid(
      [
        [-1000, -1000],
        [1000, 1000]
      ],
      [100, 100]
    )

    const player = new entity.Entity()
    player.AddComponent(
      new player_input.BasicCharacterControllerInput({
        camera: camera,
        scene: scene
      })
    )
    player.AddComponent(
      new player_entity.BasicCharacterController({
        camera: camera,
        scene: scene
      })
    )
    player.AddComponent(new spatial_grid_controller.SpatialGridController({ grid: grid }))
    entityManager.Add(player, 'player')

    let thirdPersonCamera = new entity.Entity()
    thirdPersonCamera.AddComponent(
      new third_person_camera.ThirdPersonCamera({
        camera: camera,
        target: entityManager.Get('player')
      })
    )

    entityManager.Add(thirdPersonCamera, 'player-camera')

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
      entityManager.Update(timeElapsedS)
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
    const overlayStyle = {
      color: 'white',
      position: 'absolute',
      bottom: '10px',
      width: '100%',
      textAlign: 'center',
      zIndex: '100',
      display: 'block'
    }

    return (
      <>
        <div ref={(ref) => (this.mount = ref)} />
        <div id="overlay" style={overlayStyle}>
          Overlay
        </div>
      </>
    )
  }
}
