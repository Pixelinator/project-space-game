import * as THREE from 'three'

export const entity = (() => {
  /**
   *
   */
  class Entity {
    /**
     *
     */
    constructor() {
      this._name = null
      this._components = {}

      this._position = new THREE.Vector3()
      this._rotation = new THREE.Quaternion()
      this._handlers = {}
      this._parent = null
    }

    /**
     *
     * @param {*} n
     * @param {*} h
     */
    _RegisterHandler(n, h) {
      if (!(n in this._handlers)) {
        this._handlers[n] = []
      }
      this._handlers[n].push(h)
    }

    /**
     *
     * @param {*} p
     */
    SetParent(p) {
      this._parent = p
    }

    /**
     *
     * @param {*} n
     */
    SetName(n) {
      this._name = n
    }

    /**
     *
     */
    get Name() {
      return this._name
    }

    /**
     *
     * @param {*} b
     */
    SetActive(b) {
      this._parent.SetActive(this, b)
    }

    /**
     *
     * @param {*} c
     */
    AddComponent(c) {
      c.SetParent(this)
      this._components[c.constructor.name] = c

      c.InitComponent()
    }

    /**
     *
     * @param {*} n
     * @returns <object>
     */
    GetComponent(n) {
      return this._components[n]
    }

    /**
     *
     * @param {*} n
     * @returns <object>
     */
    FindEntity(n) {
      return this._parent.Get(n)
    }

    /**
     *
     * @param {*} msg
     * @returns <void>
     */
    Broadcast(msg) {
      if (!(msg.topic in this._handlers)) {
        return
      }

      for (let curHandler of this._handlers[msg.topic]) {
        curHandler(msg)
      }
    }

    /**
     *
     * @param {*} p
     */
    SetPosition(p) {
      this._position.copy(p)
      this.Broadcast({
        topic: 'update.position',
        value: this._position
      })
    }

    /**
     *
     * @param {*} r
     */
    SetQuaternion(r) {
      this._rotation.copy(r)
      this.Broadcast({
        topic: 'update.rotation',
        value: this._rotation
      })
    }

    /**
     *
     * @param {*} timeElapsed
     */
    Update(timeElapsed) {
      for (let k in this._components) {
        this._components[k].Update(timeElapsed)
      }
    }
  }

  /**
   *
   */
  class Component {
    /**
     *
     */
    constructor() {
      this._parent = null
    }

    /**
     *
     * @param {*} p
     */
    SetParent(p) {
      this._parent = p
    }

    /**
     *
     */
    InitComponent() {}

    /**
     *
     * @param {*} n
     * @returns <object>
     */
    GetComponent(n) {
      return this._parent.GetComponent(n)
    }

    /**
     *
     * @param {*} n
     * @returns <object>
     */
    FindEntity(n) {
      return this._parent.FindEntity(n)
    }

    /**
     *
     * @param {*} m
     */
    Broadcast(m) {
      this._parent.Broadcast(m)
    }

    /**
     *
     * @param {*} _
     */
    Update(_) {}

    /**
     *
     * @param {*} n
     * @param {*} h
     */
    _RegisterHandler(n, h) {
      this._parent._RegisterHandler(n, h)
    }
  }

  return {
    Entity: Entity,
    Component: Component
  }
})()
