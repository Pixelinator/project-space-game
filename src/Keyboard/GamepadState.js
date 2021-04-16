// TODO !!!!!!!!!!
export default class GamepadState {
  constructor() {
    // Holds the current state of a given button
    this.buttonStates = new Map()
    // Holds the callback functions for a key code
    this.buttonMap = new Map()
  }

  addMapping(button, callback) {
    this.buttonMap.set(button, callback)
  }

  handleEvent(event) {
    const { button } = event
    if (!this.buttonMap.has(button)) {
      // Did not have key mapped.
      return
    }
    event.preventDefault()
    const buttonState = button.value
    if (this.buttonStates.get(button) === buttonState) {
      return
    }
    this.buttonStates.set(button, buttonState)
    this.buttonMap.get(button)(buttonState)
  }

  handleAxis(event) {
    console.log(event)
    event.preventDefault()
  }

  // these events might only work in Firefox?
  listenTo(window) {
    ;['gamepadbuttondown', 'gamepadbuttonup'].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        console.log(event)
        this.handleEvent(event)
      })
    })

    window.addEventListener('gamepadaxismove', (event) => {
      this.handleAxis(event)
    })
  }
}
