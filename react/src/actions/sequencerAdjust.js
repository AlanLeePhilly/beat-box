export const FETCH_PATTERNS_BEGIN   = 'FETCH_PATTERNS_BEGIN';
export const FETCH_PATTERNS_SUCCESS = 'FETCH_PATTERNS_SUCCESS';
export const FETCH_PATTERNS_FAILURE = 'FETCH_PATTERNS_FAILURE';

export const setPattern = (pattern) => ({
  type: 'SET_PATTERN',
  pattern: pattern
});

export const setBpm = (bpm) => ({
  type: 'SET_BPM',
  bpm: bpm
})


export const play = () => ({
  type: 'PLAY',
  playing: true
})

export const pause = () => (dispatch) => {
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

export const fetchPatternsBegin = () => ({
  type: FETCH_PATTERNS_BEGIN
});

export const fetchPatternsSuccess = patterns => ({
  type: FETCH_PATTERNS_SUCCESS,
  payload: { patterns }
})

export const fetchPatternsError = error => ({
  type: FETCH_PATTERNS_FAILURE,
  payload: { error }
})

export const fetchPatterns = () => (dispatch) => {
    dispatch(fetchPatternsBegin());
    fetch('/api/v1/patterns')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPatternsSuccess(json.patterns));
        json.patterns;
      })
      .catch(error => dispatch(fetchPatternsFailure(error)));
  }


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}