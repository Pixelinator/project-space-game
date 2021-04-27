import React from 'react'
import Keyboard from '../Keyboard/Keyboard'
// import GamePad from '../Keyboard/Gamepad'

export function Game() {
  // new GamePad(window)
  new Keyboard(window)

  return (
    <>
      <p>Hello</p>
    </>
  )
}
