const initialState = {
  seeOscilloscope: true,
  seeSpectrum: false
}

export default function visualizer(state = initialState, action) {
  switch (action.type) {
    case 'SET_OSCILLOSCOPE':
      return Object.assign({}, state, {
        seeOscilloscope: action.setOscilloscope
      })
    case 'SET_SPECTRUM':
      return Object.assign({}, state, {
        seeSpectrum: action.setSpectrum
      })
    default:
      return state
  }
}