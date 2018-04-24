import React from 'react';
import { connect } from 'react-redux'
import {NOTEFREQS, ROOTNOTES, SCALESTEPS} from '../constants/Constants'
import { setRootNote, setOctave, setScale, setWaveType, setMasterGain, nextStep, play, pause } from '../actions/synthAdjust'
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
    this.pause = this.pause.bind(this)
  }

  componentDidMount(){
  }
  
  componentWillUnmount(){
    this.pause()
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
  }

  makeSound(){
    let stepPattern = this.props.pattern.grid[this.props.currentStep]
    let freqArr = this.props.noteFreqs.map((freq, i) =>
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
    
    masterGain.gain.value = this.props.masterGain

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

            <SynMasterGain
              masterGain={this.props.masterGain}
              setMasterGain={this.props.setMasterGain}
            />
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
    setWaveType: (waveType) => dispatch(setWaveType(waveType)),
    setMasterGain: (masterGain) => dispatch(setMasterGain(masterGain)),
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
    noteFreqs: state.synth.noteFreqs,
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

