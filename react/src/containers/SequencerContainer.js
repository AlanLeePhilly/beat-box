import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { setBpm, setCurrentStep, setSteps, setNoteNames, setRelease, setDevice, setPattern, fetchPatterns} from '../actions/sequencerAdjust'
import SeqPlay from '../components/sequencer/SeqPlay';
import SeqRelease from '../components/sequencer/SeqRelease';
import SeqClear from '../components/sequencer/SeqClear';
import SeqGrid from '../components/sequencer/SeqGrid';
import SeqPatternSelect from '../components/sequencer/SeqPatternSelect'
import { bindActionCreators } from 'redux'

class SequencerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setPattern = this.setPattern.bind(this)
    this.clearPattern = this.clearPattern.bind(this)
    }
  
  componentDidMount(){
    this.props.fetchPatterns()
  }

  setPattern(patName){
    let patterns = JSON.parse(JSON.stringify(this.props.patterns))
    patterns.forEach( pattern => {
      if (pattern.name == patName) {
        this.props.setPattern(pattern)
      }
    })  
  }

  clearPattern(){
    this.props.setPattern({
      name: '',
      grid: [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ]
    })
  }

  render(){
    return (
      <div className="seq-buttons btn-box buttons">


        {/* <SeqRelease
          setRelease={this.props.setRelease}
          release={this.props.release}
        /> */}
        <SeqPatternSelect
          setPattern={this.setPattern}
          pattern={this.props.pattern}
          patterns={this.props.patterns}
        />

        <SeqClear
          clearPattern={this.clearPattern}
        />

      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatterns: () => dispatch(fetchPatterns()),
    setPattern: (pattern) => dispatch(setPattern(pattern)),
    setBpm: (bpm) => dispatch(setBpm(bpm)),
    setRelease: (num) => dispatch(setRelease(num)),
    setCurrentStep: (nextStep) => dispatch(setCurrentStep(nextStep)),
    setNoteNames: (names) => dispatch(setNoteNames(names)),
    setSteps: (num) => dispatch(setSteps(num)),
    setDevice: (name) => dispatch(setDevice(name))
  }
}

const mapStateToProps = (state) => {
  return {
    pattern: state.sequencer.pattern,
    patterns: state.sequencer.patterns,
    playing: state.sequencer.playing,
    bpm: state.sequencer.bpm,
    steps: state.sequencer.steps,
    currentStep: state.sequencer.currentStep,
    noteNames: state.sequencer.noteNames,
    release: state.sequencer.release,
    device: state.sequencer.device,
    loading: state.sequencer.loading,
    error: state.sequencer.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SequencerContainer);
