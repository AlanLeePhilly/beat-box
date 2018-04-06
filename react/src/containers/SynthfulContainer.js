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
import Oscilloscope from '../components/visualizer/Oscilloscope'
import Spectrum from '../components/visualizer/Spectrum'

class SynthfulContainer extends React.Component {
  constructor(props) {
    super(props);
    let analyser
    this.state = {
      interval: null
    }
    this.onPlay = this.onPlay.bind(this)
    this.makeSound = this.makeSound.bind(this)
    this.setFreqs = this.setFreqs.bind(this)
    this.pause = this.pause.bind(this)
  }

  componentDidMount(){
    this.setFreqs()
  }
  
  componentWillUnmount(){
    this.pause()
  }

  setFreqs({ rootNote, octave, scale} = this.props){
    let rootNoteIndx = ROOTNOTES.indexOf(rootNote)
    let rootIndex = rootNoteIndx + (octave * 12);
    let indexArr = SCALESTEPS[scale].map((x, i) => { return x + rootIndex })
    let noteNames = indexArr.map(val => { return Object.keys(NOTEFREQS)[val] })
    let noteFreqs = indexArr.map(val => { return Object.values(NOTEFREQS)[val] })
    this.props.setNoteNames(noteNames)
    this.props.setFreqs(noteFreqs)
  }

  onPlay(){
    if (this.props.playing){
      this.pause()
    } else {
      this.props.play()
      this.makeSound()
      this.interval = setInterval(() => {
        this.props.nextStep()
        this.makeSound();
      }, ((60 * 500) / this.props.bpm));
    }
  }

  pause(){
    clearInterval(this.interval)
    this.props.pause()
    this.setFreqs()
  }

  makeSound(){
    let stepPattern = this.props.pattern.grid[this.props.currentStep]
    let freqArr = this.props.freqs.map((freq, i) =>
      stepPattern[i] === 1 ? freq : null
    ).filter(x => x)
    let voiceCount = freqArr.length
    let masterGain = this.props.ctx.createGain()
    let oscArr = []
    let gainArr = []
    for (var i=0; i < voiceCount; i++) {
      oscArr[i] = this.props.ctx.createOscillator()
      oscArr[i].type = this.props.waveType.toLowerCase();
      oscArr[i].frequency.value = freqArr[i];
      oscArr[i].start(0);
      gainArr[i] = this.props.ctx.createGain()
      gainArr[i].gain.value = 1;

      oscArr[i].connect(gainArr[i]);
      gainArr[i].connect(masterGain);
    }
    this.analyser = this.props.ctx.createAnalyser()
    this.analyser.fftSize = 4096;
    
    masterGain.connect(this.analyser)
    this.analyser.connect(this.props.ctx.destination)

    setTimeout(() => {
      masterGain.gain.setTargetAtTime(0, this.props.ctx.currentTime, 0.015);
    }, parseInt(this.props.release));
  }

  

  render() {
    let selectedVisualizers = []
    if (this.props.seeSpectrum && this.analyser){
      selectedVisualizers.push(
        <div className='spectrum column medium-6'>
          <canvas id='spectrum' className='specs'></canvas>
          <Spectrum
            audioContext={this.props.ctx}
            analyser={this.analyser}
          />
        </div>
      )
    }
    if (this.props.seeOscilloscope && this.analyser){
      selectedVisualizers.push(
        <div className='oscilloscope column medium-6'>
          <canvas id='scope' className='specs'></canvas>
          <Oscilloscope
            audioContext={this.props.ctx}
            analyser={this.analyser}
          />
        </div>
      )
    }
    
    return(
      <div className="column medium-12 end">
        <div className="column medium-8 end">
          Synthesizer:
          <div className='synth-buttons medium-12 btn-box buttons'>
              {/* <button onClick={ () => { this.setFreqs() } }>
                Update
              </button> */}
            <SynPlay
              play={this.onPlay}
              isPlaying={this.props.playing}
            />
            <SynRootNote
              rootNote={this.props.rootNote}
              setRootNote={this.props.setRootNote}
              pause={this.pause}
            />

            <SynOctave
              octave={this.props.octave}
              setOctave={this.props.setOctave}
              pause={this.pause}
            />

            <SynScale
              scale={this.props.scale}
              setScale={this.props.setScale}
              pause={this.pause}
            />

            <SynWaveType
              waveType={this.props.waveType}
              setWaveType={this.props.setWaveType}
              pause={this.pause}
            />

            {/* <SynMasterGain
              masterGain={this.props.masterGain}
              setMasterGain={this.props.setMasterGain}
              pause={this.pause}
            /> */}
          </div>
        </div>
        <div className='visualizers'>
          {selectedVisualizers}
        </div>
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
    bpm: state.sequencer.bpm,
    seeSpectrum: state.visualizer.seeSpectrum,
    seeOscilloscope: state.visualizer.seeOscilloscope
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
