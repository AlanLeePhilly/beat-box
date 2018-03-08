import {setCurrentStep} from './sequencerAdjust'

let currStep = 0;
let totalSteps = 8


export const setRootNote = (rootNote) => ({
  type: 'SET_ROOTNOTE',
  rootNote: rootNote
})

export const setOctave = (octave) => ({
  type: 'SET_OCTAVE',
  octave: octave
})

export const setScale = (scale) => ({
  type: 'SET_SCALE',
  scale: scale
})

export const setFreqs = (freqs) => ({
  type: 'SET_FREQS',
  freqs: freqs
})

export const setWaveType = (waveType) => ({
  type: 'SET_WAVETYPE',
  waveType: waveType
})

export const setMasterGain = (masterGain) => ({
  type: 'SET_MASTERGAIN',
  masterGain: masterGain
})

export const nextStep = () => (dispatch) => {
  if (currStep > totalSteps - 2){
         currStep = 0
      } else {
         currStep = currStep + 1
       }
      dispatch(setCurrentStep(currStep))
}

export const play = () => ({
  type: 'PLAY',
  playing: true
})

export const pause = () => (dispatch) => {
  currStep = 0
  dispatch({
    type: 'PAUSE',
    playing: false
  })
}
