// import GamepadState from '../Keyboard/GamepadState'

export default class GamePad {
  constructor(window) {
    window.addEventListener('gamepadconnected', (event) => {
      window.requestAnimationFrame(this.updateGamepad)
    })
  }

  updateGamepad(event) {
    // window.requestAnimationFrame(this.updateGamepad)
    for (const pad of navigator.getGamepads()) {
      // todo; simple demo of displaying pad.axes and pad.buttons
      console.log(pad)
    }
  }
}
