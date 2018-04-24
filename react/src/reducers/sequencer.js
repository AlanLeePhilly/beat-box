const defaultPattern = {
  name: 'default',
  grid: [
    [1,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,1,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0]
  ]
}

const initialState =
  {
    pattern: defaultPattern,
    patterns: [],
    loading: false,
    playing: false,
    steps: 8,
    currentStep: 0,
    noteNames: ['X', 'X', 'X', 'F', 'G', 'A', 'B', 'C'],
    bpm: 200,
    release: 100,
    device: 'synth',
    error: null
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
    case 'SET_PATTERN':{
      return Object.assign({}, state, {   
        pattern: action.pattern 
      })
    }
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
    case 'FETCH_PATTERNS_BEGIN':
      return Object.assign({}, state, {   
        loading: true, 
        error: null   
      })                  
    case 'FETCH_PATTERNS_SUCCESS':
      return Object.assign({}, state, {   
        loading: false,
        patterns: action.payload
      }) 
    case 'FETCH_PATTERNS_ERROR':
      return Object.assign({}, state, {
        loading: false,
        error: action.payload,
        patterns: []
      })
    default:
      return state
  }
}
