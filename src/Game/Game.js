import React, { Component } from 'react'
import * as THREE from 'three'
import SkyBox from '../SkyBox/Skybox'
import { third_person_camera } from '../Entity/Camera/ThirdPersonCamera'
import { entity_manager } from '../Entity/EntityManager'
import { entity } from '../Entity/Entity'
import { attack_controller } from '../Controller/AttackController'
import { inventory_controller } from '../Controller/Inventory/InventoryController'
import { health_component } from '../Component/HealthComponent'
import { equip_weapon_component } from '../Component/EquipWeaponComponent'
import { ui_controller } from '../Controller/UI/UIController'
import { level_up_component } from '../Component/LevelUpComponent'
import { player_entity } from '../Entity/Player/PlayerEntity'
import { player_input } from '../Entity/Player/PlayerInput'
import { gltf_component } from '../Component/GLTFComponent'

import { spatial_grid_controller } from '../Controller/SpatialGrid/SpatialGridController'
import { spatial_hash_grid } from '../Controller/SpatialGrid/SpatialHashGrid'

import '../index.css'

export class Game extends Component {
  componentDidMount() {
    // ------------------------
    //     Setup Basics
    //-------------------------

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // camera.up.set(0, 0, 1) // funny, but also motion sickness, use camera.up instead of hardcoding
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(renderer.domElement)

    new SkyBox(scene, renderer)

    let light1 = new THREE.DirectionalLight(0xddddff, 1.0)
    light1.position.set(5, 5, 5)
    scene.add(light1)

    let light2 = new THREE.AmbientLight(0xffffff, 0.25)
    scene.add(light2)

    let rectLight = new THREE.RectAreaLight(0xffffff, 5, 5, 2)
    rectLight.position.set(9, 1, 5)
    rectLight.rotateX(80)
    scene.add(rectLight)
    // append to wall segment with some bloom effect

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

    const grid1 = new THREE.GridHelper(100, 10, new THREE.Color('red'), new THREE.Color('darkslategray'))
    // grid1.rotation.x = Math.PI / 2
    scene.add(grid1)

    // ------------------------
    //     Setup Entities
    //-------------------------

    const entityManager = new entity_manager.EntityManager()
    window.entityManager = entityManager

    const wall = new entity.Entity()
    wall.AddComponent(
      new gltf_component.StaticModelComponent({
        scene: scene,
        resourcePath: './models/fbx/environment/Walls/',
        resourceName: 'Window_Wall_SideA.fbx',
        scale: 0.04,
        emissive: new THREE.Color(0x000000),
        color: new THREE.Color(0x202020)
      })
    )

    const column = new entity.Entity()
    column.AddComponent(
      new gltf_component.StaticModelComponent({
        scene: scene,
        resourcePath: './models/fbx/environment/',
        resourceName: 'Column_1.fbx',
        scale: 0.04,
        emissive: new THREE.Color(0x000000),
        color: new THREE.Color(0x202020)
      })
    )

    const column1 = new entity.Entity()
    column1.AddComponent(
      new gltf_component.StaticModelComponent({
        scene: scene,
        resourcePath: './models/fbx/environment/',
        resourceName: 'Column_1.fbx',
        scale: 0.04,
        emissive: new THREE.Color(0x000000),
        color: new THREE.Color(0x202020)
      })
    )

    const detail = new entity.Entity()
    detail.AddComponent(
      new gltf_component.StaticModelComponent({
        scene: scene,
        resourcePath: './models/fbx/environment/',
        resourceName: 'Props_Statue.fbx',
        scale: 0.04,
        emissive: new THREE.Color(0x000000),
        color: new THREE.Color(0x202020)
      })
    )

    const robot = new entity.Entity()
    robot.AddComponent(
      new gltf_component.StaticModelComponent({
        scene: scene,
        resourcePath: './models/fbx/robots/',
        resourceName: 'George.fbx',
        resourceTexture: './models/fbx/robots/Textures/George_Texture.png',
        scale: 0.02,
        emissive: new THREE.Color(0x000000),
        color: new THREE.Color(0x202020)
      })
    )

    const robot1 = new entity.Entity()
    robot1.AddComponent(
      new gltf_component.StaticModelComponent({
        scene: scene,
        resourcePath: './models/fbx/robots/',
        resourceName: 'Leela.fbx',
        resourceTexture: './models/fbx/robots/Textures/Leela_Texture.png',
        scale: 0.02,
        emissive: new THREE.Color(0x000000),
        color: new THREE.Color(0x202020)
      })
    )

    const robot2 = new entity.Entity()
    robot2.AddComponent(
      new gltf_component.StaticModelComponent({
        scene: scene,
        resourcePath: './models/fbx/robots/',
        resourceName: 'Mike.fbx',
        resourceTexture: './models/fbx/robots/Textures/Mike_Texture.png',
        scale: 0.02,
        emissive: new THREE.Color(0x000000),
        color: new THREE.Color(0x202020)
      })
    )

    const robot3 = new entity.Entity()
    robot3.AddComponent(
      new gltf_component.AnimatedModelComponent({
        scene: scene,
        resourcePath: './models/fbx/robots/',
        resourceName: 'Stan.fbx',
        resourceTexture: './models/fbx/robots/Textures/Stan_Texture.png',
        scale: 0.02
      })
    )

    const glassMat = new THREE.MeshPhysicalMaterial({
      metalness: 0.9,
      roughness: 0.05,
      envMapIntensity: 0.9,
      clearcoat: 1,
      transparent: true,
      transmission: 0.95,
      opacity: 0.5,
      reflectivity: 0.2,
      refractionRatio: 0.985,
      ior: 0.9,
      side: THREE.DoubleSide
    })

    function waitForElement() {
      if (typeof wall._components.StaticModelComponent._target !== 'undefined') {
        wall._components.StaticModelComponent._target.children[0].material[2] = glassMat
        // add unreal bloom to material4(Light)
        // console.log(wall._components.StaticModelComponent._target.children[0].material[4])

        wall.Broadcast({
          topic: 'update.position',
          value: new THREE.Vector3(9, 0, 0)
        })

        column.Broadcast({
          topic: 'update.position',
          value: new THREE.Vector3(0, 0, 0)
        })
        column1.Broadcast({
          topic: 'update.position',
          value: new THREE.Vector3(18, 0, 0)
        })

        detail.Broadcast({
          topic: 'update.position',
          value: new THREE.Vector3(9, 0, -10)
        })
      } else {
        setTimeout(waitForElement, 250)
      }
    }

    waitForElement()

    function waitForElement1() {
      if (typeof robot._components.StaticModelComponent._target !== 'undefined') {
        robot.Broadcast({
          topic: 'update.position',
          value: new THREE.Vector3(0, 0, 10)
        })
      } else {
        setTimeout(waitForElement1, 250)
      }
    }

    waitForElement1()

    function waitForElement2() {
      if (typeof robot1._components.StaticModelComponent._target !== 'undefined') {
        robot1.Broadcast({
          topic: 'update.position',
          value: new THREE.Vector3(0, 0, 20)
        })
      } else {
        setTimeout(waitForElement2, 250)
      }
    }

    waitForElement2()

    function waitForElement3() {
      if (typeof robot2._components.StaticModelComponent._target !== 'undefined') {
        robot2.Broadcast({
          topic: 'update.position',
          value: new THREE.Vector3(0, 0, 30)
        })
      } else {
        setTimeout(waitForElement3, 250)
      }
    }

    waitForElement3()

    function waitForElement4() {
      if (typeof robot3._components.AnimatedModelComponent._target !== 'undefined') {
        robot3.Broadcast({
          topic: 'update.position',
          value: new THREE.Vector3(0, 0, 40)
        })
      } else {
        setTimeout(waitForElement4, 250)
      }
    }

    waitForElement4()

    entityManager.Add(wall, 'wall')
    entityManager.Add(column, 'column')
    entityManager.Add(column1, 'column1')
    entityManager.Add(detail, 'detail')
    entityManager.Add(robot, 'robot')
    entityManager.Add(robot1, 'robot1')
    entityManager.Add(robot2, 'robot2')
    entityManager.Add(robot3, 'robot3')

    const grid = new spatial_hash_grid.SpatialHashGrid(
      [
        [-1000, -1000],
        [1000, 1000]
      ],
      [100, 100]
    )

    const ui = new entity.Entity()
    ui.AddComponent(new ui_controller.UIController())
    entityManager.Add(ui, 'ui')

    const levelUpSpawner = new entity.Entity()
    levelUpSpawner.AddComponent(
      new level_up_component.LevelUpComponentSpawner({
        camera: camera,
        scene: scene
      })
    )
    entityManager.Add(levelUpSpawner, 'level-up-spawner')

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

    player.AddComponent(new equip_weapon_component.EquipWeapon({ anchor: 'RightHandIndex1' }))
    player.AddComponent(
      new inventory_controller.InventoryController({
        camera: camera,
        scene: scene
      })
    )
    player.AddComponent(
      new health_component.HealthComponent({
        updateUI: true,
        health: 100,
        maxHealth: 100,
        strength: 50,
        wisdomness: 5,
        benchpress: 20,
        curl: 100,
        experience: 0,
        level: 1
      })
    )

    player.AddComponent(new spatial_grid_controller.SpatialGridController({ grid: grid }))
    player.AddComponent(new attack_controller.AttackController({ timing: 0.7 }))
    entityManager.Add(player, 'player')

    // TODO: Move this to some sort of Database
    const axe = new entity.Entity()
    axe.AddComponent(
      new inventory_controller.InventoryItem({
        type: 'weapon',
        damage: 3,
        renderParams: {
          name: 'Axe',
          scale: 0.25,
          icon: 'war-axe-64.png'
        }
      })
    )
    entityManager.Add(axe)

    // TODO: Move this to some sort of Database
    const sword = new entity.Entity()
    sword.AddComponent(
      new inventory_controller.InventoryItem({
        type: 'weapon',
        damage: 3,
        renderParams: {
          name: 'Sword',
          scale: 0.25,
          icon: 'pointy-sword-64.png'
        }
      })
    )
    entityManager.Add(sword)

    player.Broadcast({
      topic: 'inventory.add',
      value: axe.Name,
      added: false
    })

    player.Broadcast({
      topic: 'inventory.add',
      value: sword.Name,
      added: false
    })

    player.Broadcast({
      topic: 'inventory.equip',
      value: sword.Name,
      added: false
    })

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
    return (
      <>
        <div className="container" id="container">
          <div ref={(ref) => (this.mount = ref)} />
          <div className="ui">
            <div className="quest-journal-layout">
              <div className="quest-journal" id="quest-journal"></div>
            </div>
          </div>
          {/* not hiding and i dont know why yet
            <div className="ui">
            <div className="quest-ui-layout">
              <div className="quest-ui" id="quest-ui">
                <div className="quest-text-title" id="quest-text-title"></div>
                <div className="quest-text" id="quest-text"></div>
              </div>
            </div>
          </div>
        */}
          <div className="ui">
            <div className="icon-ui">
              <div className="icon-bar" id="icon-bar">
                <div className="icon-bar-item" id="icon-bar-stats" style={{ backgroundImage: `url('./models/icons/ui/skills.png')` }}></div>
                <div className="icon-bar-item" id="icon-bar-inventory" style={{ backgroundImage: `url('./models/icons/ui/backpack.png')` }}></div>
                <div className="icon-bar-item" id="icon-bar-quests" style={{ backgroundImage: `url('./models/icons/ui/tied-scroll.png')` }}></div>
              </div>
            </div>
          </div>
          <div className="ui">
            <div className="stats" id="stats">
              <div className="stats-inner">
                <div className="stats-title">Statistics</div>
                <div className="stats-row">
                  <div className="stats-tooltip">
                    Strength
                    <div className="stats-tooltiptext">
                      How strong you are, affects how much damage you do. So blah blah if you're doing stuff then its stronger or whatever, the damage is up.
                      This is text to show the tooltip.
                    </div>
                  </div>
                  <div id="stats-strength">0</div>
                </div>
                <div className="stats-row">
                  <div className="stats-tooltip">
                    Wisdomness
                    <div className="stats-tooltiptext">
                      Wisdom is the guage of something to do with wisdom in the game because wisdom is important and wisdom is wise to wisdoming.
                    </div>
                  </div>
                  <div id="stats-wisdomness">0</div>
                </div>
                <div className="stats-row">
                  <div className="stats-tooltip">
                    Benchpress
                    <div className="stats-tooltiptext">Gotta have a good bench to be a warrior or something.</div>
                  </div>
                  <div id="stats-benchpress">0</div>
                </div>
                <div className="stats-row">
                  <div className="stats-tooltip">
                    Curl
                    <div className="stats-tooltiptext">The ultimate expression of strength, this affects literally everything in your life.</div>
                  </div>
                  <div id="stats-curl">0</div>
                </div>
                <div className="stats-row">
                  <div className="stats-tooltip">
                    XP
                    <div className="stats-tooltiptext">
                      How much xp you've accumulated by killing things for xp. Get enough and you'll gain a level or something.
                    </div>
                  </div>
                  <div id="stats-experience">0</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui">
            <div className="health-ui" style={{ backgroundImage: `url('./models/icons/ui/health-bar.png')` }}>
              <div className="health-bar" id="health-bar"></div>
            </div>
          </div>
          <div className="ui">
            <div className="inventory" id="inventory">
              <div className="inventory-inner">
                <div className="inventory-title">Inventory</div>
                <div className="inventory-row">
                  <div className="inventory-column">
                    <div className="inventory-item" id="inventory-equip-1" draggable="true"></div>
                    <div className="inventory-item" id="inventory-equip-2" draggable="true"></div>
                    <div className="inventory-item" id="inventory-equip-3" draggable="true"></div>
                    <div className="inventory-item" id="inventory-equip-4" draggable="true"></div>
                  </div>
                  <div className="inventory-character"></div>
                  <div className="inventory-column">
                    <div className="inventory-item" id="inventory-equip-5" draggable="true"></div>
                    <div className="inventory-item" id="inventory-equip-6" draggable="true"></div>
                    <div className="inventory-item" id="inventory-equip-7" draggable="true"></div>
                    <div className="inventory-item" id="inventory-equip-8" draggable="true"></div>
                  </div>
                </div>
                <div className="inventory-row">
                  <div className="inventory-item" id="inventory-1" draggable="true"></div>
                  <div className="inventory-item" id="inventory-2" draggable="true"></div>
                  <div className="inventory-item" id="inventory-3" draggable="true"></div>
                  <div className="inventory-item" id="inventory-4" draggable="true"></div>
                  <div className="inventory-item" id="inventory-5" draggable="true"></div>
                  <div className="inventory-item" id="inventory-6" draggable="true"></div>
                  <div className="inventory-item" id="inventory-7" draggable="true"></div>
                  <div className="inventory-item" id="inventory-8" draggable="true"></div>
                </div>
                <div className="inventory-row">
                  <div className="inventory-item" id="inventory-9" draggable="true"></div>
                  <div className="inventory-item" id="inventory-10" draggable="true"></div>
                  <div className="inventory-item" id="inventory-11" draggable="true"></div>
                  <div className="inventory-item" id="inventory-12" draggable="true"></div>
                  <div className="inventory-item" id="inventory-13" draggable="true"></div>
                  <div className="inventory-item" id="inventory-14" draggable="true"></div>
                  <div className="inventory-item" id="inventory-15" draggable="true"></div>
                  <div className="inventory-item" id="inventory-16" draggable="true"></div>
                </div>
                <div className="inventory-row">
                  <div className="inventory-item" id="inventory-17" draggable="true"></div>
                  <div className="inventory-item" id="inventory-18" draggable="true"></div>
                  <div className="inventory-item" id="inventory-19" draggable="true"></div>
                  <div className="inventory-item" id="inventory-20" draggable="true"></div>
                  <div className="inventory-item" id="inventory-21" draggable="true"></div>
                  <div className="inventory-item" id="inventory-22" draggable="true"></div>
                  <div className="inventory-item" id="inventory-23" draggable="true"></div>
                  <div className="inventory-item" id="inventory-24" draggable="true"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
