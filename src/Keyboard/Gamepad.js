export default class GamePad {
  constructor(window) {
    window.addEventListener('gamepadconnected', (event) => {
      window.requestAnimationFrame(this.updateGamepad)
    })
  }

  updateGamepad() {
    const gamepads = navigator.getGamepads()
    const threshold = 0.2
    if (gamepads.length <= 0 || gamepads === undefined) {
      return
    }

    ;[...gamepads].forEach((gamepad) => {
      if (gamepad === null) {
        return
      }

      console.log('ID: ', gamepad.id)
      gamepad.axes.forEach((axis) => {
        console.log('Axis: ', axis >= threshold || axis <= -threshold ? axis : 0)
      })
      gamepad.buttons.forEach((button) => {
        console.log('Button: ', button.pressed ? true : false)
      })
      console.log('Gamepad: ', gamepad)
    })
  }
}
