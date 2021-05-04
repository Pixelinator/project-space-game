import { finite_state_machine } from './StateMachine/FiniteStateMachine'
import IdleState from './StateMachine/IdleState'
import WalkState from './StateMachine/WalkState'
import RunState from './StateMachine/RunState'
import DanceState from './StateMachine/DanceState'

export class CharacterFSM extends finite_state_machine.FiniteStateMachine {
  constructor(proxy) {
    super()
    this._proxy = proxy
    this._Init()
  }

  _Init() {
    this._AddState('idle', IdleState)
    this._AddState('walk', WalkState)
    this._AddState('run', RunState)
    this._AddState('dance', DanceState)
  }
}
