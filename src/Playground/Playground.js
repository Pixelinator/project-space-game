import React, { Component } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import SkyBox from '../SkyBox/Skybox'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
// import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
// import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js'
// import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js'

export class Playground extends Component {
  componentDidMount() {
    const scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(5))

    const light = new THREE.SpotLight()
    light.position.set(20, 500, 20)
    scene.add(light)

    const light2 = new THREE.AmbientLight(0xffffff, 1.25)
    scene.add(light2)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer()
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(renderer.domElement)

    const _composer = new EffectComposer(renderer)
    console.log(this._composer)
    _composer.addPass(new RenderPass(scene, camera))
    // _composer.addPass(new UnrealBloomPass({ x: 1024, y: 1024 }, 2.0, 0.0, 0.75))
    // _composer.addPass(new GlitchPass())
    // _composer.addPass(new LuminosityShader())

    new SkyBox(scene, renderer)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const material = new THREE.MeshPhongMaterial({
      color: 0x555555,
      flatShading: true
    })

    const terrain = this.loadTerrain(material, scene)

    this.windowResize(camera, renderer, render)

    const stats = Stats()
    this.mount.appendChild(stats.dom)

    this.initDatGui(terrain)

    function animate() {
      requestAnimationFrame(animate)

      controls.update()

      render()

      stats.update()
    }

    function render() {
      _composer.render()
      // renderer.render(scene, camera)
    }

    animate()
  }

  initDatGui(terrain) {
    // controller
    let controller = new (function () {
      this.scaleX = 1
      this.scaleY = 1
      this.scaleZ = 1
      this.positionX = 0
      this.positionY = 0
      this.positionZ = 0
      this.rotationX = 0
      this.rotationY = 90
      this.rotationZ = 0
      // this.boxColor = color;
      // this.castShadow = true
      // this.boxOpacity = 1
    })()

    // Creating a GUI and a subfolder.
    const gui = new GUI()

    // set this to be filled by the entity manager
    let entities = {}
    entities.selected = 'terrain'
    let dropdown = gui.add(entities, 'selected', ['terrain', 'player', 'something'])
    dropdown.setValue('terrain') // cuz I like french better

    const f1 = gui.addFolder('Scale')
    f1.add(controller, 'scaleX', 0.1, 5).onChange(function () {
      terrain.geometry.scale.x = controller.scaleX
    })
    f1.add(controller, 'scaleY', 0.1, 5).onChange(function () {
      terrain.geometry.scale.y = controller.scaleY
    })
    f1.add(controller, 'scaleZ', 0.1, 5).onChange(function () {
      terrain.geometry.scale.z = controller.scaleZ
    })
    // f1.open()

    var f2 = gui.addFolder('Position')
    f2.add(controller, 'positionX', -5, 5).onChange(function () {
      terrain.position.x = controller.positionX
    })
    f2.add(controller, 'positionY', -5, 5).onChange(function () {
      terrain.position.y = controller.positionY
    })
    f2.add(controller, 'positionZ', -5, 5).onChange(function () {
      terrain.position.z = controller.positionZ
    })

    var f3 = gui.addFolder('Rotation')
    f3.add(controller, 'rotationX', -180, 180).onChange(function () {
      terrain.rotation.x = this.de2ra(controller.rotationX)
    })
    f3.add(controller, 'rotationY', -180, 180).onChange(function () {
      terrain.rotation.y = this.de2ra(controller.rotationY)
    })
    f3.add(controller, 'rotationZ', -180, 180).onChange(function () {
      terrain.rotation.z = this.de2ra(controller.rotationZ)
    })
    // gui.addColor( controller, 'boxColor', color ).onChange( function() {
    //   mesh.material.color.setHex( dec2hex(controller.boxColor) );
    // });
    // gui.add( controller, 'castShadow', false ).onChange( function() {
    //   mesh.castShadow = controller.castShadow;
    // });
    //   gui.add( controller, 'boxOpacity', 0.1, 1 ).onChange( function() {
    //     material.opacity = (controller.boxOpacity);
    // } );}
  }

  windowResize(camera, renderer, render) {
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      render()
    }
  }

  loadTerrain(material, scene) {
    const loader = new STLLoader()
    loader.load(
      './models/stl/terrain.stl',
      function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.geometry.scale(30.0, 30.0, 30.0)
        mesh.geometry.computeBoundingBox()
        mesh.rotation.x = -Math.PI / 2
        mesh.position.set(-mesh.geometry.boundingBox.max.x / 2, -35, mesh.geometry.boundingBox.max.y / 2)
        scene.add(mesh)
        console.log(mesh.geometry)
        return mesh
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log(error)
      }
    )
  }

  de2ra(degree) {
    return degree * (Math.PI / 180)
  }

  render() {
    return (
      <>
        <div className="container" id="container">
          <div ref={(ref) => (this.mount = ref)} />
        </div>
      </>
    )
  }
}
