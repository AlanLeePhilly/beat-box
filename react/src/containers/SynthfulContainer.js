import React from 'react';
import Synth from '../components/Synth';
import Oscilloscope from '../components/Oscilloscope'

const NOTES = {
  "C0": 16.35,"C#0": 17.32,"D0": 18.35,"D#0": 19.45,"E0": 20.6,"F0": 21.83,
  "F#0": 23.12,"G0": 24.5,"G#0": 25.96,"A0": 27.5,"A#0": 29.14,"B0": 30.87,
  "C1": 32.7,"C#1": 34.65,"D1": 36.71,"D#1": 38.89,"E1": 41.2,"F1": 43.65,
  "F#1": 46.25,"G1": 49,"G#1": 51.91,"A1": 55,"A#1": 58.27,"B1": 61.74,
  "C2": 65.41,"C#2": 69.3,"D2": 73.42,"D#2": 77.78,"E2": 82.41,"F2": 87.31,
  "F#2": 92.5,"G2": 98,"G#2": 103.83,"A2": 110,"A#2": 116.54,"B2": 123.47,
  "C3": 130.81,"C#3": 138.59,"D3": 146.83,"D#3": 155.56,"E3": 164.81,"F3": 174.61,
  "F#3": 185,"G3": 196,"G#3": 207.65,"A3": 220,"A#3": 233.08,"B3": 246.94,
  "C4": 261.63,"C#4": 277.18,"D4": 293.66,"D#4": 311.13,"E4": 329.63,"F4": 349.23,
  "F#4": 369.99,"G4": 392,"G#4": 415.3,"A4": 440,"A#4": 466.16,"B4": 493.88,
  "C5": 523.25,"C#5": 554.37,"D5": 587.33,"D#5": 622.25,"E5": 659.26,"F5": 698.46,
  "F#5": 739.99,"G5": 783.99,"G#5": 830.61,"A5": 880,"A#5": 932.33,"B5": 987.77,
  "C6": 1046.5,"C#6": 1108.73,"D6": 1174.66,"D#6": 1244.51,"E6": 1318.51,"F6": 1396.91,
  "F#6": 1479.98,"G6": 1567.98,"G#6": 1661.22,"A6": 1760,"A#6": 1864.66,"B6": 1975.53,
  "C7": 2093,"C#7": 2217.46,"D7": 2349.32,"D#7": 2489.02,"E7": 2637.02,"F7": 2793.83,
  "F#7": 2959.96,"G7": 3135.96,"G#7": 3322.44,"A7": 3520,"A#7": 3729.31,"B7": 3951.07,
  "C8": 4186.01,"C#8": 4434.92,"D8": 4698.64,"D#8": 4978.03
  };

const SCALES = {
  'chromatic': [0,1,2,3,4,5,6,7],
  'major': [0,2,4,5,7,9,11,12],
  'minor': [0,2,3,5,7,8,10,12],
  'majorPent': [0,2,4,7,9,12,14,16],
  'minorPent': [0,3,5,7,10,12,15,17]
};

const ROOTS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

var getNotes = function(rootNote, octave, scale) {
  rootNote = ROOTS.indexOf(rootNote)
  var rootIndex = rootNote + (octave * 12);
  var indArr = SCALES[scale].map((x, i) => { return x + rootIndex })
  let noteArr = []
  noteArr[0] = indArr.map(val => { return Object.values(NOTES)[val] })
  noteArr[1] =  indArr.map(val => { return Object.keys(NOTES)[val] })
  return noteArr
  }

class SynthfulContainer extends React.Component {
  constructor(props) {
    super(props);
    window.audioContext = window.audioContext || new AudioContext();
    var analyser
    this.state = {
      rootNote: 'C',
      octave: 4,
      scale: 'chromatic',
      notes: [],
      type: 'sine',
      masterGain: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.setNotes = this.setNotes.bind(this)
  }


  componentDidMount(){
    this.setNotes()
  }

  componentDidUpdate(prevProps, prevState){
    if (
      prevState.rootNote != this.state.rootNote ||
      prevState.octave != this.state.octave ||
      prevState.scale != this.state.scale
    ) {
      this.setNotes()
    }
  }

  pause(){
    this.props.pause();
    clearInterval(this.interval);
  }

  setNotes(){
    let noteArr = getNotes(this.state.rootNote, this.state.octave, this.state.scale)
    this.setState({ notes: noteArr[0] })
    this.props.setNoteNames(noteArr[1])
  }

  handleChange (name, value) { this.setState({[name]: value}) }

  onPlay(){
    if (this.props.data.playing) {
      this.pause();
    } else {
      this.props.play()
      this.interval = setInterval(() => {
        let synthState = this.state
        var next = this.props.data.pattern[this.props.data.currentStep]
        var seqData = this.props.data
        this.playNotes(next, { seqData });
        this.props.nextStep()
      }, ((60 * 1000) / this.props.data.bpm) / 2);
    }
  }

  playNotes(notes = [], state = {}) {
    var freqs = notes.map((cell, i) =>
      cell === 1 ? this.state.notes[i] : null
    ).filter(x => x);
    if (!freqs.length) return;
    var masterGain = audioContext.createGain()
    this.analyser = audioContext.createAnalyser()
    this.analyser.fftSize = 2048;
    var oscArr = []
    var gainArr = []
    for (var i=0; i < freqs.length; i++) {
      oscArr[i] = audioContext.createOscillator()
      oscArr[i].type = this.state.type.toLowerCase();
      oscArr[i].frequency.value = freqs[i];
      oscArr[i].start(0);
      gainArr[i] = audioContext.createGain()
      gainArr[i].gain.value = 1;

      oscArr[i].connect(gainArr[i]);
      gainArr[i].connect(masterGain);
    }
      masterGain.connect(this.analyser)
      this.analyser.connect(audioContext.destination)
      // masterGain.connect(audioContext.destination)


    var d1 = audioContext.createDelay();
        d1.delayTime.value = state.delay ? (this.props.data.bpm / 10) / 100 : 0;

    setTimeout(() => {
      masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.015);
    }, parseInt(this.props.data.release));

  }

  render() {
    let analyser
    if (this.analyser){
      analyser = this.analyser
    }

    let synthData = this.state
    let isPlaying = this.props.data.playing
    let play = () => { this.onPlay() }
    let handleChange = (name, value) => { this.handleChange(name, value) }
    return (
      <div>

        <Synth
          synthData={synthData}
          isPlaying={isPlaying}
          handleChange={handleChange}
          play={play}
        />
        <canvas id='scope' className='specs'></canvas>

        <Oscilloscope
        audioContext={audioContext}
        analyser={analyser}
        />

      </div>
    )
  }
}

export default SynthfulContainer;
