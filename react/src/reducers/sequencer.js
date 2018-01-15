const defaultPattern = [
  [1,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0],
  [0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0],
  [0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,1]
];

const initialState =
  {
    pattern: defaultPattern,
    playing: false,
    steps: 8,
    currentStep: 0,
    noteNames: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
    bpm: 98,
    release: 100,
    device: 'synth'
  }

export default function sequencer(state = initialState, action) {
  switch (action.type) {
    case 'PLAY':
    return Object.assign({}, state, {
      playing: action.playing
    })
    case 'PAUSE':
    return Object.assign({}, state, {
      playing: action.playing,
      currentStep: 0
    })
    case 'SET_PATTERN':
      return Object.assign({}, state, {
        pattern: action.pattern
      })
    case 'SET_BPM':
      return Object.assign({}, state, {
        bpm: action.bpm
      })
    case 'SET_STEPS':
      return Object.assign({}, state, {
        steps: action.steps
      })
    case 'SET_CURRENTSTEP':
      return Object.assign({}, state, {
        currentStep: action.currentStep
      })
    case 'SET_NOTENAMES':
      return Object.assign({}, state, {
        noteNames: action.noteNames
      })
    case 'SET_RELEASE':
      return Object.assign({}, state, {
        release: action.release
      })
    case 'SET_DEVICE':
      return Object.assign({}, state, {
        device: action.device
      })
    default:
      return state
  }
}
