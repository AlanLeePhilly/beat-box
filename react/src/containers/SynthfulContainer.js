import React from 'react';
import { connect } from 'react-redux'
import {NOTEFREQS, ROOTNOTES, SCALESTEPS} from '../constants/Constants'
import { setRootNote, setOctave, setScale, setFreqs, setWaveType, setMasterGain, nextStep, play, pause } from '../actions/synthAdjust'
import {setNoteNames} from '../actions/sequencerAdjust'
import SynOctave from '../components/synth/SynOctave'
import SynRootNote from '../components/synth/SynRootNote'
import SynScale from '../components/synth/SynScale'
import SynWaveType from '../components/synth/SynWaveType'
import SynMasterGain from '../components/synth/SynMasterGain'
import SynPlay from '../components/synth/SynPlay'

class SynthfulContainer extends React.Component {
  constructor(props) {
    super(props);
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    let analyser
    this.state = {
      interval: null
    }
    this.onPlay = this.onPlay.bind(this)
    this.playNotes = this.playNotes.bind(this)
    this.setFreqs = this.setFreqs.bind(this)
  }

  componentDidMount(){
    this.setFreqs()
  }

  setFreqs(){
    let rootNote = ROOTNOTES.indexOf(this.props.rootNote)
    let rootIndex = rootNote + (this.props.octave * 12);
    let indexArr = SCALESTEPS[this.props.scale].map((x, i) => { return x + rootIndex })
    let noteNames = indexArr.map(val => { return Object.keys(NOTEFREQS)[val] })
    let noteFreqs = indexArr.map(val => { return Object.values(NOTEFREQS)[val] })
    this.props.setNoteNames(noteNames)
    this.props.setFreqs(noteFreqs)
  }

  onPlay(){
    if (this.props.playing){
      clearInterval(this.interval)
      this.props.pause()
    } else {
      this.props.play()
      this.playNotes()
      this.interval = setInterval(() => {
        this.props.nextStep()
        // var next = this.this.props.data.pattern[this.this.props.data.currentStep]
        // var seqData = this.this.props.data
        this.playNotes();
      }, ((60 * 1000) / this.props.bpm));
    }
  }

  // function onPause(){
  //   debugger
  //   clearInterval(interval)
  //   this.props.pause()
  // }

  playNotes(){
    let stepPattern = this.props.pattern[this.props.currentStep]
    let freqArr = this.props.freqs.map((freq, i) =>
      stepPattern[i] === 1 ? freq : null
    ).filter(x => x)
    let voiceCount = freqArr.length
    let masterGain = this.ctx.createGain()
    this.analyser = this.ctx.createAnalyser()
    this.analyser.fftSize = 2048;
    let oscArr = []
    let gainArr = []
    for (var i=0; i < voiceCount; i++) {
      oscArr[i] = this.ctx.createOscillator()
      oscArr[i].type = this.props.waveType.toLowerCase();
      oscArr[i].frequency.value = freqArr[i];
      oscArr[i].start(0);
      gainArr[i] = this.ctx.createGain()
      gainArr[i].gain.value = 1;

      oscArr[i].connect(gainArr[i]);
      gainArr[i].connect(masterGain);
    }
    masterGain.connect(this.analyser)
    this.analyser.connect(this.ctx.destination)

    setTimeout(() => {
      masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.015);
    }, parseInt(this.props.release));
  }

  render() {
    return(
      <div className="seq-button buttons row">
        <button onClick={ () => { this.setFreqs() } }>
          Update
        </button>
        <SynPlay
          play={this.onPlay}
          isPlaying={this.props.playing}
        />
        <SynRootNote
          rootNote={this.props.rootNote}
          setRootNote={this.props.setRootNote}
          // setFreqs={this.setFreqs}
        />

        <SynOctave
          octave={this.props.octave}
          setOctave={this.props.setOctave}
          // setFreqs={this.setFreqs}
        />

        <SynScale
          scale={this.props.scale}
          setScale={this.props.setScale}
          // setFreqs={this.setFreqs}
        />

        <SynWaveType
          waveType={this.props.waveType}
          setWaveType={this.props.setWaveType}
        />

        <SynMasterGain
          masterGain={this.props.masterGain}
          setMasterGain={this.props.setMasterGain}
        />

      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRootNote: (rootNote) => dispatch(setRootNote(rootNote)),
    setOctave: (octave) => dispatch(setOctave(octave)),
    setScale: (scale) => dispatch(setScale(scale)),
    setFreqs: (freqs) => dispatch(setFreqs(freqs)),
    setWaveType: (waveType) => dispatch(setWaveType(waveType)),
    setMasterGain: (masterGain) => dispatch(setMasterGain(masterGain)),
    setNoteNames: (noteNames) => dispatch(setNoteNames(noteNames)),
    nextStep: () => dispatch(nextStep()),
    play: () => dispatch(play()),
    pause: () => dispatch(pause())
  }
}

const mapStateToProps = (state) => {
  return {
    pattern: state.sequencer.pattern,
    playing: state.sequencer.playing,
    currentStep: state.sequencer.currentStep,
    release: state.sequencer.release,
    noteNames: state.sequencer.noteNames,
    freqs: state.synth.freqs,
    waveType: state.synth.waveType,
    masterGain: state.synth.masterGain,
    rootNote: state.synth.rootNote,
    octave: state.synth.octave,
    scale: state.synth.scale,
    bpm: state.sequencer.bpm
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynthfulContainer);



//
//
//   render() {
//     let analyser
//     if (this.analyser){
//       analyser = this.analyser
//     }
//
//     let synthData = this.state
//     let isPlaying = this.this.props.data.playing
//     let play = () => { this.onPlay() }
//     let handleChange = (name, value) => { this.handleChange(name, value) }
//     return (
//       <div>
//
//         <Synth
//           synthData={synthData}
//           isPlaying={isPlaying}
//           handleChange={handleChange}
//           play={play}
//         />
//         <canvas id='scope' className='specs'></canvas>
//
//         <Oscilloscope
//         audioContext={audioContext}
//         analyser={analyser}
//         />
//
//       </div>
//     )
//   }
// }
//
// export default SynthfulContainer;
