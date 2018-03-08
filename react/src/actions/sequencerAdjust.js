let timer = null;
let currStep = 0;

export const setPattern = (pattern) => ({
  type: 'SET_PATTERN',
  pattern: pattern
});

export const setBpm = (bpm) => ({
  type: 'SET_BPM',
  bpm: bpm
})

// export const play = (bpm, totalSteps) => (dispatch) => {
//  clearInterval(timer);
//   timer = setInterval(() => {
//     if (currStep > totalSteps - 2){
//        currStep = 0
//     } else {
//        currStep = currStep + 1
//      }
//     dispatch(setCurrentStep(currStep))
//   }, 60000 / (bpm * 2));
//
//   dispatch({
//     type: 'PLAY',
//     playing: true
//   });
// }

export const play = () => ({
  type: 'PLAY',
  playing: true
})

export const pause = () => (dispatch) => {
  // clearInterval(timer);
  // currStep = 0;
  dispatch(setCurrentStep(0))
  dispatch({
    type: 'PAUSE',
    playing: false
  })
}

export const setCurrentStep = (currentStep) => ({
  type: 'SET_CURRENTSTEP',
  currentStep: currentStep
});

export const setSteps = (steps) => ({
  type: 'SET_STEPS',
  steps: steps
})


export const setNoteNames = (noteNames) => ({
  type: 'SET_NOTENAMES',
  noteNames: noteNames
})


export const setRelease = (release) => ({
  type: 'SET_RELEASE',
  release: release
})

export const setDevice = (device) => ({
  type: 'SET_DEVICE',
  device: device
})
