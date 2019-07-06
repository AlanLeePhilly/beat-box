import React from 'react';
import { connect } from 'react-redux'
import Tone from 'tone';
import _ from 'lodash';
import { NOTEFREQS, ROOTNOTES, SCALESTEPS } from '../constants/Constants';
import { setRootNote, setOctave, setScale, setWaveType, setAttack, setRelease, setMasterGain, play, pause } from '../actions/synthAdjust';
import { setNoteNames, nextStep, setBpm } from '../actions/sequencerAdjust';
import SynOctave from '../components/synth/SynOctave';
import SynEnvelope from '../components/synth/SynEnvelope';
import SynRootNote from '../components/synth/SynRootNote';
import SynScale from '../components/synth/SynScale';
import SynWaveType from '../components/synth/SynWaveType';
import SynMasterGain from '../components/synth/SynMasterGain';
import SynPlay from '../components/synth/SynPlay';
import SeqBpm from '../components/sequencer/SeqBpm';
import Oscilloscope from '../components/visualizer/Oscilloscope';
import Spectrum from '../components/visualizer/Spectrum';

class SynthfulContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subPattern: new Array(8),
      
    };
    Tone.Transport.start("+0.1");
    this.analyser = new Tone.Analyser().toMaster()
    this.synth = new Tone.PolySynth(6, Tone.Synth).connect(this.analyser);
    this.tonePattern = new Tone.Pattern((time, note) => {
      this.synth.triggerAttackRelease(note, .05, time);
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
    Tone.Transport.bpm.value = this.props.bpm * 2;

    this.synth.set({
      oscillator: {
        type: this.props.waveType
      },
      envelope: {
        attack: this.props.attack,
        release: this.props.release
        
      }
    })
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
        <div className="synth-row column medium-centered medium-10">
          <div className="column medium-12" style={{paddingRight: '40px'}}>Synthesizer:</div>
          <div className='synth-buttons medium-12 btn-box buttons row'>
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
            
            <SeqBpm
              setBpm={this.props.setBpm}
              bpm={this.props.bpm}
            />
          </div>
          {/* <SynEnvelope 
            attack={this.props.attack}
            setAttack={this.props.setAttack}
            release={this.props.release}
            setRelease={this.props.setRelease}
          /> */}
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
    setAttack: (attack) => dispatch(setAttack(attack)),
    setRelease: (release) => dispatch(setRelease(release)),
    setBpm: (bpm) => dispatch(setBpm(bpm)),
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
    noteFreqs: state.synth.noteFreqs,
    masterGain: state.synth.masterGain,
    rootNote: state.synth.rootNote,
    octave: state.synth.octave,
    scale: state.synth.scale,
    waveType: state.synth.waveType,
    attack: state.synth.attack,
    release: state.synth.release,
    bpm: state.sequencer.bpm,
    seeSpectrum: state.visualizer.seeSpectrum,
    seeOscilloscope: state.visualizer.seeOscilloscope
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SynthfulContainer);

