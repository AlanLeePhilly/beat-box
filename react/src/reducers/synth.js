import { getFreqs, getNames } from '../helpers/SynthNotes'

const initialState = {
  rootNote: 'C',
  octave: 4,
  scale: 'minorPent',
  noteFreqs: [261.63, 311.13, 349.23, 392, 466.16, 523.25, 622.25, 698.46],
  noteNames: ['C 4', 'D#4', 'F 4', 'G 4', 'A#4', 'C 5', 'D#5', 'F 5'],
  waveType: 'sine',
  masterGain: .5
}

export default function synth(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROOTNOTE':
      return Object.assign({}, state, {
        rootNote: action.rootNote,
        noteFreqs: getFreqs(action.rootNote, state.octave, state.scale),
        noteNames: getNames(action.rootNote, state.octave, state.scale)
      })
    case 'SET_OCTAVE':
      return Object.assign({}, state, {
        octave: action.octave,
        noteFreqs: getFreqs(state.rootNote, action.octave, state.scale),
        noteNames: getNames(state.rootNote, action.octave, state.scale)
      })
    case 'SET_SCALE':
      return Object.assign({}, state, {
        scale: action.scale,
        noteFreqs: getFreqs(state.rootNote, state.octave, action.scale),
        noteNames: getNames(state.rootNote, state.octave, action.scale)
      })
    case 'SET_WAVETYPE':
      return Object.assign({}, state, {
        waveType: action.waveType
      })
    case 'SET_MASTERGAIN':
      return Object.assign({}, state, {
        masterGain: action.masterGain
      })
    default:
      return state
  }
}
