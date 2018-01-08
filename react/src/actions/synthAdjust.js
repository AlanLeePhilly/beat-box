export const setRoot = (rootNote) => ({
  type: 'SET_ROOT',
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

export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes: notes
})

export const setWaveType = (waveType) => ({
  type: 'SET_WAVETYPE',
  waveType: wavetype
})

export const setMasterGain = (masterGain) => ({
  type: 'SET_MASTERGAIN',
  masterGain: masterGain
})
