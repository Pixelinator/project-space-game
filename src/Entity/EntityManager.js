export const entity_manager = (() => {
  /**
   *
   */
  class EntityManager {
    /**
     *
     */
    constructor() {
      this._ids = 0
      this._entitiesMap = {}
      this._entities = []
    }

    /**
     *
     * @returns <string>
     */
    _GenerateName() {
      this._ids += 1

      return '__name__' + this._ids
    }

    /**
     *
     * @param {*} n
     * @returns <array>
     */
    Get(n) {
      return this._entitiesMap[n]
    }

    /**
     *
     * @param {*} cb
     * @returns <object>
     */
    Filter(cb) {
      return this._entities.filter(cb)
    }

    /**
     *
     * @param {*} e
     * @param {*} n
     */
    Add(e, n) {
      if (!n) {
        n = this._GenerateName()
      }

      this._entitiesMap[n] = e
      this._entities.push(e)

      e.SetParent(this)
      e.SetName(n)
      e.InitEntity()
    }

    /**
     *
     * @param {*} e
     * @param {*} b
     * @returns <void>
     */
    SetActive(e, b) {
      const i = this._entities.indexOf(e)
      if (!b) {
        if (i < 0) {
          return
        }

        this._entities.splice(i, 1)
      } else {
        if (i >= 0) {
          return
        }

        this._entities.push(e)
      }
    }

    /**
     *
     * @param {*} timeElapsed
     */
    Update(timeElapsed) {
      const dead = []
      const alive = []
      for (let i = 0; i < this._entities.length; ++i) {
        const e = this._entities[i]

        e.Update(timeElapsed)

        if (e.dead_) {
          dead.push(e)
        } else {
          alive.push(e)
        }
      }

      for (let i = 0; i < dead.length; ++i) {
        const e = dead[i]

        delete this._entitiesMap[e.Name]

        e.Destroy()
      }

      this._entities = alive
    }
  }

  return {
    EntityManager: EntityManager
  }
})()
