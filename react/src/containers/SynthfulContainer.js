import React from 'react';
import { connect } from 'react-redux'
import Tone from 'tone';
import _ from 'lodash';
import { NOTEFREQS, ROOTNOTES, SCALESTEPS } from '../constants/Constants';
import { setRootNote, setOctave, setScale, setWaveType, setMasterGain, play, pause } from '../actions/synthAdjust';
import { setNoteNames, nextStep } from '../actions/sequencerAdjust';
import SynOctave from '../components/synth/SynOctave';
import SynRootNote from '../components/synth/SynRootNote';
import SynScale from '../components/synth/SynScale';
import SynWaveType from '../components/synth/SynWaveType';
import SynMasterGain from '../components/synth/SynMasterGain';
import SynPlay from '../components/synth/SynPlay';
import Oscilloscope from '../components/visualizer/Oscilloscope';
import Spectrum from '../components/visualizer/Spectrum';

class SynthfulContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subPattern: new Array(8)
    };
    Tone.Transport.start("+0.1");
    Tone.Transport.bpm.value = this.props.bpm;
    this.synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
    this.tonePattern = new Tone.Pattern((time, note) => {
      this.synth.triggerAttackRelease(note, "4n", time);
      this.props.nextStep();
    }, this.state.subPattern, "up");
    // Tone.Transport.loop = true;
    this.patternMaker = this.patternMaker.bind(this);
    this.onPlay = this.onPlay.bind(this);  
  };
  
  componentWillUnmount(){
    this.props.pause();
  };
  
  componentDidUpdate(prevProps){
    if(prevProps.noteNames != this.props.noteNames || !_.isEqual(prevProps.pattern.grid, this.props.pattern.grid)){
      this.patternMaker();
    };
  };
  
  onPlay(){
    if (this.props.playing){
      this.props.pause();
      this.tonePattern.stop();
    } else {
      this.patternMaker();
      this.props.play();
      this.tonePattern.start(0);
    };
  };
  
  patternMaker(){
    let newPattern = [];
    this.props.pattern.grid.forEach((step, i) => {
      let stepNotes = step.map((cell, j) => {
        let result = (cell == 1) ? this.props.noteNames[j].replace(/\s/g, '') : null
        return result;
      }).filter(x => x);
      
      if(stepNotes){
        newPattern.push(stepNotes);
      } else {
        newPattern.push(null)
      };
    });
    
    this.setState({subPattern: newPattern});
    this.tonePattern.values = newPattern;
  }
  
  render() {
    let selectedVisualizers = [];
    if (this.props.seeSpectrum && this.analyser){
      selectedVisualizers.push(
        <div className='spectrum column medium-6' key='spec'>
          <canvas id='spectrum' className='specs'></canvas>
          <Spectrum
            audioContext={this.props.ctx}
            analyser={this.analyser}
          />
        </div>
      );
    };
    if (this.props.seeOscilloscope && this.analyser){
      selectedVisualizers.push(
        <div className='oscilloscope column medium-6' key='scope'>
          <canvas id='scope' className='specs'></canvas>
          <Oscilloscope
            audioContext={this.props.ctx}
            analyser={this.analyser}
          />
        </div>
      );
    };
    
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
            />

            <SynOctave
              octave={this.props.octave}
              setOctave={this.props.setOctave}
            />

            <SynScale
              scale={this.props.scale}
              setScale={this.props.setScale}
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
        </div>
        <div className='visualizers'>
          {selectedVisualizers}
        </div>
      </div>
    );
  };
};

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
  };
};

const mapStateToProps = (state) => {
  return {
    pattern: state.sequencer.pattern,
    playing: state.sequencer.playing,
    currentStep: state.sequencer.currentStep,
    noteNames: state.synth.noteNames,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SynthfulContainer);

