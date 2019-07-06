import {setCurrentStep} from './sequencerAdjust'

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

export const setAttack = (attack) => ({
  type: 'SET_ATTACK',
  attack: attack
})

export const setDecay = (decay) => ({
  type: 'SET_DECAY',
  decay: decay
})

export const setSustain = (sustain) => ({
  type: 'SET_SUSTAIN',
  sustain: sustain
})

export const setRelease = (release) => ({
  type: 'SET_RELEASE',
  release: release
})

export const play = () => ({
  type: 'PLAY',
  playing: true
})

export const pause = () => (dispatch) => {
  console.log("blah")
  dispatch({
    type: 'PAUSE',
    playing: false
  })
}
