import KeyboardState from '../Keyboard/KeyboardState'

export default class Keyboard {
  constructor(window) {
    this.input = new KeyboardState()
    this.input.listenTo(window)
    this.applyStandardMapping()
  }

  addMapping(keyCode, callback) {
    this.input.addMapping(keyCode, callback)
  }

  // https://keycode.info/
  applyStandardMapping() {
    // W, ArrowUp
    ;[87, 38].forEach((keyCode) => {
      this.addMapping(keyCode, (keyState) => {
        console.log(keyCode, keyState)
      })
    })

    // A, ArrowLeft
    ;[65, 37].forEach((keyCode) => {
      this.addMapping(keyCode, (keyState) => {
        console.log(keyCode, keyState)
      })
    })

    // S, ArrowDown
    ;[83, 40].forEach((keyCode) => {
      this.addMapping(keyCode, (keyState) => {
        console.log(keyCode, keyState)
      })
    })

    // D, ArrowRight
    ;[68, 39].forEach((keyCode) => {
      this.addMapping(keyCode, (keyState) => {
        console.log(keyCode, keyState)
      })
    })
  }

  applyCustomMapping(customMap) {}

  printCurrentMap() {}
}
