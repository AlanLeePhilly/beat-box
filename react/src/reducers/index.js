import { combineReducers } from 'redux'
import sequencer from './sequencer'
import synth from './synth'
import sampler from './sampler'
import visualizer from './visualizer'

export default combineReducers({
  synth,
  sequencer,
  sampler,
  visualizer
})
