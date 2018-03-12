import { combineReducers } from 'redux'
import sequencer from './sequencer'
import synth from './synth'
import sampler from './sampler'

export default combineReducers({
  synth,
  sequencer,
  sampler
})
