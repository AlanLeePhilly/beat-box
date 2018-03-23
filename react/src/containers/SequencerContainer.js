import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { play, pause, setBpm, setCurrentStep, setSteps, setNoteNames, setRelease, setDevice, setPattern, fetchPatterns} from '../actions/sequencerAdjust'
import SeqPlay from '../components/sequencer/SeqPlay';
import SeqBpm from '../components/sequencer/SeqBpm';
import SeqRelease from '../components/sequencer/SeqRelease';
import SeqClear from '../components/sequencer/SeqClear';
import SeqGrid from '../components/sequencer/SeqGrid';
import SeqPatternSelect from '../components/sequencer/SeqPatternSelect'
import { bindActionCreators } from 'redux'

class SequencerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setPattern = this.setPattern.bind(this)
    }
  
  
  componentDidMount(){
    this.props.fetchPatterns()
  }

  setPattern(patName){
    this.props.patterns.forEach( pattern => {
      if (pattern.name == patName) {
        this.props.setPattern(pattern)
      }
    })
    
  }

  clearPattern(){
    this.props.setPattern([
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0]
    ])
  }

  play(){
    if (this.props.playing) {
      this.props.pause()
    }
    else {
      this.props.play(this.props.bpm, this.props.steps)
    }
  }

  toggleCell(step, cell) {
    let clonedPattern = this.props.pattern.grid.slice(0);
    let cellState = clonedPattern[step][cell];
    clonedPattern[step][cell] = cellState === 1 ? 0 : 1;
    this.props.setPattern(clonedPattern)
  }

  render(){
    return (
      <div>
        <div className="select-wrapper seq-button buttons row">
          <SeqBpm
            setBpm={this.props.setBpm}
            bpm={this.props.bpm}
          />

          <SeqRelease
            setRelease={this.props.setRelease}
            release={this.props.release}
          />

          <SeqClear
            clearPattern={this.clearPattern}
          />
          
          <SeqPatternSelect
            setPattern={this.setPattern}
            pattern={this.props.pattern}
            patterns={this.props.patterns}
          />
        </div>

        <SeqGrid
          pattern={this.props.pattern}
          currentStep={this.props.currentStep}
          toggleCell={this.toggleCell}
          noteNames={this.props.noteNames}
        />
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    play: (bpm, steps) => dispatch(play(bpm, steps)),
    pause: () => dispatch(pause()),
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
