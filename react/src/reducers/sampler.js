const initialState = {
  kitName: 'acoustic-kit'
}

export default function sampler(state = initialState, action) {
  switch (action.type) {
    case 'SET_KITNAME':
    return Object.assign({}, state, {
      kitName: action.kitName
    })
    case 'SET_BUFFERLIST':
    return Object.assign({}, state, {
      bufferList: action.bufferList
    })
    default:
      return state
  }
}
