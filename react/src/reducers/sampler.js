const initialState = {
  kitName: "Select Kit",
  drumNames: ['X', 'X', 'X', 'F', 'G', 'A', 'B', 'C'],
  loaded: false
}

export default function sampler(state = initialState, action) {
  switch (action.type) {
    case 'SET_KITNAME':
      return Object.assign({}, state, {
        kitName: action.kitName
      })
    case 'SET_DRUMNAMES':
      return Object.assign({}, state, {
        drumNames: action.drumNames
      })
    case 'SET_BUFFERLIST':
      return Object.assign({}, state, {
        bufferList: action.bufferList
      })
    case 'SET_LOADED':
      return Object.assign({}, state, {
        loaded: action.loaded
      })
    default:
      return state
  }
}
