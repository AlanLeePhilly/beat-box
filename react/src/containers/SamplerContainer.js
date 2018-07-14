import React from 'react';
import { connect } from 'react-redux'

import { DRUMNAMES } from '../constants/Constants'
import { setMasterGain, nextStep, play, pause } from '../actions/synthAdjust'
import { setKitName, setDrumNames,setBufferList, setLoaded } from '../actions/samplerAdjust'

import SamMasterGain from '../components/sampler/SamMasterGain'
import SamPlay from '../components/sampler/SamPlay'
import SamKitSelector from '../components/sampler/SamKitSelector'
import Oscilloscope from '../components/visualizer/Oscilloscope'
import Spectrum from '../components/visualizer/Spectrum'

import { BufferLoader } from '../helpers/BufferLoader'


class SamplerContainer extends React.Component {
  constructor(props) {
    super(props);
    let analyser
    this.state = {
      interval: null,
      scheduleAheadTime: 0.1,
      nextNoteTime: 0.0,
      bufferList: []
    }
    this.onPlay = this.onPlay.bind(this)
    this.setDrumNames = this.setDrumNames.bind(this)
    this.makeSound = this.makeSound.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.setBufferList = this.setBufferList.bind(this)
    this.scheduler = this.scheduler.bind(this)
    this.nextNote = this.nextNote.bind(this)
    
  }

  componentDidMount(){
    this.setDrumNames()
  }
  
  componentWillUnmount(){
    clearInterval(this.interval)
    this.props.pause()
  }

  setDrumNames(){
    let drumNames
    if (this.props.loaded) {
      drumNames = DRUMNAMES.map(drumName => `${this.props.kitName} - ${drumName}`)
      drumNames.push("","")
    } else {
      drumNames = ["LOADED", "NO KIT", "", "", "", "", "", ""]
    }

    this.props.setDrumNames(drumNames)
  }

  onPlay(){
    if (this.props.playing){
      clearInterval(this.interval)
      this.props.pause()
    } else {
      this.props.play()
      this.setState({ nextNoteTime: this.props.ctx.currentTime + 0.1 })
      this.interval = setInterval(() => {
        this.scheduler()
      }, 50)
    }
  }

  kitToURLs(kitName){
    return DRUMNAMES.map(drumName => `https://s3.amazonaws.com/sequential-sounds-samples/${kitName}/${drumName}.wav`)
  }

  loadSamples(){
    var bufferLoader = new BufferLoader(
      this.props.ctx,
      this.kitToURLs(this.props.kitName),
      this.setBufferList
      );
    bufferLoader.load();
  }

  setBufferList(bufferList){
    this.setState({bufferList: bufferList})
    this.props.setLoaded(true)
    this.setDrumNames()
  }
  
  scheduler() {
      // while there are notes that will need to play before the next interval, 
      // schedule them and advance the pointer.
      let counter = 1;
      let diff;
      while (this.state.nextNoteTime < this.props.ctx.currentTime + this.state.scheduleAheadTime ) {
          this.makeSound(this.state.nextNoteTime)
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
      let newNextNoteTime = this.state.nextNoteTime + 0.5 * secondsPerBeat
      this.props.nextStep();
      this.setState({ nextNoteTime: newNextNoteTime })
      
  }

  makeSound(time) {
    let stepPattern = this.props.pattern.grid[this.props.currentStep]
    let bufferList = this.state.bufferList.map((freq, i) =>
      stepPattern[i] === 1 ? freq : null
    ).filter(x => x)
    let sourceArr = []
    let gainArr = []
    let masterGain = this.props.ctx.createGain()
    for (var i=0; i < bufferList.length; i++) {
      sourceArr[i] = this.props.ctx.createBufferSource();
      sourceArr[i].buffer = bufferList[i]
      sourceArr[i].start(time);
      // sourceArr[i].stop(time + 0.1)
      gainArr[i] = this.props.ctx.createGain()
      gainArr[i].gain.value = 1;
      sourceArr[i].connect(gainArr[i]);
      gainArr[i].connect(masterGain);
    }
    this.analyser = this.props.ctx.createAnalyser()
    this.analyser.fftSize = 8192;
    
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
      <div className="column medium-4 end row">
        Sampler:
        <div className="samp-button medium-12 btn-box  buttons">
          <SamPlay
            play={this.onPlay}
            isPlaying={this.props.playing}
            isLoaded={this.props.loaded}
            loadSamples={this.loadSamples}
            kitName={this.props.kitName}
          />
          <SamKitSelector
            kitName={this.props.kitName}
            setKitName={this.props.setKitName}
          />
          {/* <SamMasterGain
            masterGain={this.props.masterGain}
            setMasterGain={this.props.setMasterGain}
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
    setBufferList: (bufferList) => dispatch(setBufferList(bufferList)),
    setMasterGain: (masterGain) => dispatch(setMasterGain(masterGain)),
    setDrumNames: (drumNames) => dispatch(setDrumNames(drumNames)),
    setKitName: (kitName) => dispatch(setKitName(kitName)),
    setLoaded: (loaded) => dispatch(setLoaded(loaded)),
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
    bpm: state.sequencer.bpm,
    kitName: state.sampler.kitName,
    drumNames: state.sampler.drumNames,
    bufferList: state.sampler.bufferList,
    loaded: state.sampler.loaded,
    masterGain: state.synth.masterGain,
    seeSpectrum: state.visualizer.seeSpectrum,
    seeOscilloscope: state.visualizer.seeOscilloscope
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SamplerContainer);
