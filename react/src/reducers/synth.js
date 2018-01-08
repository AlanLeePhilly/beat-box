const initialState = {
  rootNote: 'C',
  octave: 4,
  scale: 'chromatic',
  notes: [],
  type: 'sine',
  masterGain: 1
}

export default function synth(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROOT':
      return Object.assign({}, state, {
        rootNote: 'action.rootNote'
      })
    case 'SET_OCTAVE':
      return Object.assign({}, state, {
        octave: 'action.octave'
      })
    case 'SET_SCALE':
      return Object.assign({}, state, {
        scale: 'action.scale'
      })
    case 'SET_NOTES':
      return Object.assign({}, state, {
        notes: 'action.notes'
      })
    case 'SET_WAVETYPE':
      return Object.assign({}, state, {
        type: 'action.waveType'
      })
    case 'SET_MASTERGAIN':
      return Object.assign({}, state, {
        masterGain: 'action.masterGain'
      })
    default:
      return state
  }
}
