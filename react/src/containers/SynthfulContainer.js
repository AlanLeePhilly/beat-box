import React from 'react';
import { connect } from 'react-redux'
import { NOTEFREQS, SCALES, ROOTNOTES } from '../constants/Constants'
import { setRootNote, setOctave, setScale, setFreqs, setWaveType, setMasterGain, setNoteNames } from '../actions/synthAdjust'
import SynOctave from '../components/synth/SynOctave'
import SynRootNote from '../components/synth/SynRootNote'
import SynScale from '../components/synth/SynScale'
import SynWaveType from '../components/synth/SynWaveType'
import SynMasterGain from '../components/synth/SynMasterGain'

const SynthfulContainer = props =>{




  return(
    <div>
      <SynRootNote
        rootNote={props.rootNote}
        setRootNote={props.setRootNote}
        setFreqs={setFreqs}
      />

      <SynOctave
        octave={props.octave}
        setOctave={props.setOctave}
        setFreqs={setFreqs}
      />

      <SynScale
        scale={props.scale}
        setScale={props.setScale}
        setFreqs={setFreqs}
      />

      <SynWaveType
        waveType={props.waveType}
        setWaveType={props.setWaveType}
      />

      <SynMasterGain
        masterGain={props.masterGain}
        setMasterGain={props.setMasterGain}
      />

    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRootNote: (rootNote) => dispatch(setRootNote(rootNote)),
    setOctave: (octave) => dispatch(setOctave(octave)),
    setScale: (scale) => dispatch(setScale(scale)),
    setFreqs: (freqs) => dispatch(setFreqs(freqs)),
    setWaveType: (waveType) => dispatch(setWaveType(waveType)),
    setMasterGain: (masterGain) => dispatch(setMasterGain(masterGain)),
    setNoteNames: (noteNames) => dispatch(setNoteNames(noteNames))
  }
}

const mapStateToProps = (state) => {
  return {
    pattern: state.sequencer.pattern,
    playing: state.sequencer.playing,
    currentStep: state.sequencer.currentStep,
    release: state.sequencer.release,
    noteNames: state.sequencer.noteNames,
    notes: state.synth.freqs,
    waveType: state.synth.waveType,
    masterGain: state.synth.masterGain,
    rootNote: state.synth.rootNote,
    octave: state.synth.octave,
    scale: state.synth.scale
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynthfulContainer);

//
//
// var getNotes = function(rootNote, octave, scale) {
//   rootNote = ROOTS.indexOf(rootNote)
//   var rootIndex = rootNote + (octave * 12);
//   var indArr = SCALES[scale].map((x, i) => { return x + rootIndex })
//   let noteArr = []
//   noteArr[0] = indArr.map(val => { return Object.values(NOTES)[val] })
//   noteArr[1] =  indArr.map(val => { return Object.keys(NOTES)[val] })
//   return noteArr
//   }
//
//
//
//   componentDidMount(){
//     this.setNotes()
//   }

//
//   setNotes(){
//     let noteArr = getNotes(this.state.rootNote, this.state.octave, this.state.scale)
//     this.setState({ notes: noteArr[0] })
//     this.props.setNoteNames(noteArr[1])
//   }
//
//   handleChange (name, value) { this.setState({[name]: value}) }
//
//   onPlay(){
//     if (this.props.data.playing) {
//       this.pause();
//     } else {
//       this.props.play()
//       this.interval = setInterval(() => {
//         let synthState = this.state
//         var next = this.props.data.pattern[this.props.data.currentStep]
//         var seqData = this.props.data
//         this.playNotes(next, { seqData });
//         this.props.nextStep()
//       }, ((60 * 1000) / this.props.data.bpm) / 2);
//     }
//   }
//
//
//
//   render() {
//     let analyser
//     if (this.analyser){
//       analyser = this.analyser
//     }
//
//     let synthData = this.state
//     let isPlaying = this.props.data.playing
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
