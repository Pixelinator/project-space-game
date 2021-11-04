//stolen, needs adjusting

import { entity } from '../Entity'

export const player_ps_input = (() => {
  class PlayerPSInput extends entity.Component {
    constructor(params) {
      super()
      this._params = params
      this._Init()
    }

    _Init() {
      this._keys = {
        axis1Forward: 0.0,
        axis1Side: 0.0,
        axis2Forward: 0.0,
        axis2Side: 0.0,
        space: false,
        shift: false,
        esc: false
      }
    }

    ButtonPressed(gp, index) {
      const curButton = gp.buttons[index]
      if (typeof curButton == 'object') {
        return curButton.pressed
      }
      return 1.0
    }

    Update(_) {
      const gamepads = navigator.getGamepads()
      // console.log('GamePad: ' + gamepads[0])
      if (!gamepads) {
        return
      }

      const cur = gamepads[0]
      if (!cur) {
        return
      }

      this._keys.space = this.ButtonPressed(cur, 0)
      this._keys.shift = this.ButtonPressed(cur, 1)
      this._keys.esc = this.ButtonPressed(cur, 4)

      this._keys.axis1Forward = cur.axes[1]
      this._keys.axis1Side = cur.axes[0]
      this._keys.axis2Forward = cur.axes[3]
      this._keys.axis2Side = cur.axes[2]
    }
  }

  return {
    PlayerPSInput: PlayerPSInput
  }
})()
