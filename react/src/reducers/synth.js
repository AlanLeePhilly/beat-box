const initialState = {
  rootNote: 'C',
  octave: 4,
  scale: 'minorPent',
  freqs: [],
  waveType: 'sine',
  masterGain: 1
}

export default function synth(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROOTNOTE':
      return Object.assign({}, state, {
        rootNote: action.rootNote
      })
    case 'SET_OCTAVE':
      return Object.assign({}, state, {
        octave: action.octave
      })
    case 'SET_SCALE':
      return Object.assign({}, state, {
        scale: action.scale
      })
    case 'SET_FREQS':
      return Object.assign({}, state, {
        freqs: action.freqs
      })
    case 'SET_WAVETYPE':
      return Object.assign({}, state, {
        type: action.waveType
      })
    case 'SET_MASTERGAIN':
      return Object.assign({}, state, {
        masterGain: action.masterGain
      })
    default:
      return state
  }
}
