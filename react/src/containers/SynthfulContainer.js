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
    this.state = {
      interval: null,
      scheduleAheadTime: 0.1,
      nextNoteTime: 0.0
    }
     this.masterGain = this.props.ctx.createGain()
    this.analyser = this.props.ctx.createAnalyser()
    this.analyser.fftSize = 4096;
    this.masterGain.connect(this.analyser)
    this.analyser.connect(this.props.ctx.destination)
    
    
    this.onPlay = this.onPlay.bind(this)
    this.makeSound = this.makeSound.bind(this)
    this.pause = this.pause.bind(this)
    this.scheduler = this.scheduler.bind(this)
    this.nextNote = this.nextNote.bind(this)
  }
  
  componentWillUnmount(){
    this.pause()
  }

  onPlay(){
    if (this.props.playing){
      this.pause()
    } else {
      this.props.play()
      this.setState({ nextNoteTime: this.props.ctx.currentTime + 0.1 })
      this.interval = setInterval(() => {
        this.scheduler()
      }, 50)
    }
  }

  scheduler() {
      // while there are notes that will need to play before the next interval, 
      // schedule them and advance the pointer.
      let counter = 1;
      let diff;
      while (this.state.nextNoteTime < this.props.ctx.currentTime + this.state.scheduleAheadTime ) {
          this.makeSound(this.state.nextNoteTime + .1)
          diff = this.state.nextNoteTime - this.props.ctx.currentTime
          console.log("step: " + this.props.currentStep + " count: " + counter + " diff: " + diff )
          this.nextNote()
          counter++
      }
  }
  
  nextNote() {
      // Advance current note and time by a 16th note...
      let secondsPerBeat = 60.0 / this.props.bpm * 2;    // Notice this picks up the CURRENT 
                                            // tempo value to calculate beat length.
      let newNextNoteTime = this.state.nextNoteTime + 0.25 * secondsPerBeat
      this.props.nextStep();
      this.setState({ nextNoteTime: newNextNoteTime })
      
  }

  pause(){
    clearInterval(this.interval)
    this.props.pause()
  }

  makeSound(time){
    let stepPattern = this.props.pattern.grid[this.props.currentStep]
    let freqArr = this.props.noteFreqs.map((freq, i) =>
      stepPattern[i] === 1 ? freq : null
    ).filter(x => x)
    let voiceCount = freqArr.length
    let oscArr = []

    for (var i=0; i < voiceCount; i++) {
      oscArr[i] = this.props.ctx.createOscillator()
      oscArr[i].type = this.props.waveType.toLowerCase();
      oscArr[i].frequency.value = freqArr[i];
      oscArr[i].start(time);
      oscArr[i].stop(time + .25);

      
      oscArr[i].connect(this.masterGain);
    }
    
    this.masterGain.gain.value = this.props.masterGain

    setTimeout(() => {
      this.masterGain.gain.setTargetAtTime(0, this.props.ctx.currentTime, 0.015);
    }, parseInt(this.props.release));
  }

  

  render() {
    let selectedVisualizers = []
    if (this.props.seeSpectrum && this.analyser){
      selectedVisualizers.push(
        <div className='spectrum column medium-6' key='spec'>
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
        <div className='oscilloscope column medium-6' key='scope'>
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
        <div className="column medium-9 end">
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

