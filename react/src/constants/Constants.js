export const SCALENAMES = ['chromatic', 'major', 'minor', 'majorPent', 'minorPent']
export const WAVETYPES = ['Sine', 'Square', 'Triange', 'Sawtooth']
export const ROOTNOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

export const SCALESTEPS = {
  'chromatic': [0,1,2,3,4,5,6,7],
  'major': [0,2,4,5,7,9,11,12],
  'minor': [0,2,3,5,7,8,10,12],
  'majorPent': [0,2,4,7,9,12,14,16],
  'minorPent': [0,3,5,7,10,12,15,17]
};

export const NOTEFREQS = {
  "C 0": 16.35,"C#0": 17.32,"D 0": 18.35,"D#0": 19.45,"E 0": 20.6,"F 0": 21.83,
  "F#0": 23.12,"G 0": 24.5,"G#0": 25.96,"A 0": 27.5,"A#0": 29.14,"B 0": 30.87,
  "C 1": 32.7,"C#1": 34.65,"D 1": 36.71,"D#1": 38.89,"E 1": 41.2,"F 1": 43.65,
  "F#1": 46.25,"G 1": 49,"G#1": 51.91,"A 1": 55,"A#1": 58.27,"B 1": 61.74,
  "C 2": 65.41,"C#2": 69.3,"D 2": 73.42,"D#2": 77.78,"E 2": 82.41,"F 2": 87.31,
  "F#2": 92.5,"G 2": 98,"G#2": 103.83,"A 2": 110,"A#2": 116.54,"B 2": 123.47,
  "C 3": 130.81,"C#3": 138.59,"D 3": 146.83,"D#3": 155.56,"E 3": 164.81,"F 3": 174.61,
  "F#3": 185,"G 3": 196,"G#3": 207.65,"A 3": 220,"A#3": 233.08,"B 3": 246.94,
  "C 4": 261.63,"C#4": 277.18,"D 4": 293.66,"D#4": 311.13,"E 4": 329.63,"F 4": 349.23,
  "F#4": 369.99,"G 4": 392,"G#4": 415.3,"A 4": 440,"A#4": 466.16,"B 4": 493.88,
  "C 5": 523.25,"C#5": 554.37,"D 5": 587.33,"D#5": 622.25,"E 5": 659.26,"F 5": 698.46,
  "F#5": 739.99,"G 5": 783.99,"G#5": 830.61,"A 5": 880,"A#5": 932.33,"B 5": 987.77,
  "C 6": 1046.5,"C#6": 1108.73,"D 6": 1174.66,"D#6": 1244.51,"E 6": 1318.51,"F 6": 1396.91,
  "F#6": 1479.98,"G 6": 1567.98,"G#6": 1661.22,"A 6": 1760,"A#6": 1864.66,"B 6": 1975.53,
  "C 7": 2093,"C#7": 2217.46,"D 7": 2349.32,"D#7": 2489.02,"E 7": 2637.02,"F 7": 2793.83,
  "F#7": 2959.96,"G 7": 3135.96,"G#7": 3322.44,"A 7": 3520,"A#7": 3729.31,"B 7": 3951.07,
  "C 8": 4186.01,"C#8": 4434.92,"D 8": 4698.64,"D#8": 4978.03
  };

export const KITNAMES = ["Select Kit", "4OP-FM", "acoustic-kit"]

export const DRUMNAMES = ['kick', 'snare', 'hihat', 'tom1', 'tom2', 'tom3']

export const OCTAVE = [...Array(8).keys()]
export const GAIN = [...Array(11).keys()]

export const DEVICE_LIST = ['synth', 'sampler']
