import React from 'react';
import {connect} from 'react-redux'
import {NOTEFREQS, ROOTNOTES, SCALESTEPS, DRUMNAMES} from '../constants/Constants'
import {setMasterGain, nextStep, play, pause} from '../actions/synthAdjust'
import {setNoteNames} from '../actions/sequencerAdjust'
import {setKitName} from '../actions/samplerAdjust'
import SamMasterGain from '../components/sampler/SamMasterGain'
import SamPlay from '../components/sampler/SamPlay'
import SamKitSelector from '../components/sampler/SamKitSelector'
import {BufferLoader} from '../helpers/BufferLoader'

class SamplerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    let analyser
    this.state = {
      interval: null
    }
    this.onPlay = this.onPlay.bind(this)
    this.setNoteNames = this.setNoteNames.bind(this)
    this.finishedLoading = this.finishedLoading.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.finishedLoading = this.finishedLoading.bind(this)
  }

  componentDidMount(){
    this.setNoteNames()
  }

  setNoteNames(){
    let noteNames = DRUMNAMES.map(drumName => `${this.props.kitName} - ${drumName}`)
    noteNames.push("x x","x x")
    this.props.setNoteNames(noteNames)
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

  kitToURLs(kitName){
    return DRUMNAMES.map(drumName => `https://s3.amazonaws.com/sequential-sounds-samples/${kitName}/${drumName}.wav`)
  }

  loadSamples(){
    var bufferLoader = new BufferLoader(
      this.ctx,
      this.kitToURLs(this.props.kitName)
      ,
      this.setNoteNames()
      );
    bufferLoader.load();
  }

  finishedLoading(bufferList) {
    debugger
    // Create two sources and play them both together.
    var source1 = this.ctx.createBufferSource();
    var source2 = this.ctx.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(this.ctx.destination);
    source2.connect(this.ctx.destination);
    source1.start(0);
    source2.start(0);
  }

  render() {
    return(
      <div className="seq-button buttons row">
        <button onClick={ () => { this.loadSamples() } }>
          LoadKit
        </button>
        <SamPlay
          play={this.onPlay}
          isPlaying={this.props.playing}
        />
        <SamKitSelector
          kitName={this.props.kitName}
          setKitName={this.props.setKitName}
        />
        <SamMasterGain
          masterGain={this.props.masterGain}
          setMasterGain={this.props.setMasterGain}
        />

      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMasterGain: (masterGain) => dispatch(setMasterGain(masterGain)),
    setNoteNames: (noteNames) => dispatch(setNoteNames(noteNames)),
    setKitName: (kitName) => dispatch(setKitName(kitName)),
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
    bpm: state.sequencer.bpm,
    kitName: state.sampler.kitName,
    masterGain: state.synth.masterGain
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SamplerContainer);



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
// export default SamplerContainer;
