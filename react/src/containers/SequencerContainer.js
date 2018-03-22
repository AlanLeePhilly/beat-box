import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { play, pause, setPattern, setBpm, setCurrentStep, setSteps, setNoteNames, setRelease, setDevice} from '../actions/sequencerAdjust'
import SeqPlay from '../components/sequencer/SeqPlay';
import SeqBpm from '../components/sequencer/SeqBpm';
import SeqRelease from '../components/sequencer/SeqRelease';
import SeqClear from '../components/sequencer/SeqClear';
import SeqGrid from '../components/sequencer/SeqGrid';
import { bindActionCreators } from 'redux'

const SequencerContainer = props => {

  function clearPattern() {
    props.setPattern([
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

  var play = () => {
    if (props.playing) {
      props.pause()
    }
    else {
      props.play(props.bpm, props.steps)
    }
  }

  function toggleCell(step, cell) {
    var clonedPattern = props.pattern.slice(0);
    var cellState = clonedPattern[step][cell];
    clonedPattern[step][cell] = cellState === 1 ? 0 : 1;
    props.setPattern(clonedPattern)
  }

    return (
      <div>
        <div className="seq-button buttons row">
          {/* <SeqPlay
            play={play}
            pause={props.pause}
            isPlaying={props.playing}
          /> */}

          <SeqBpm
            setBpm={props.setBpm}
            bpm={props.bpm}
          />

          <SeqRelease
            setRelease={props.setRelease}
            release={props.release}
          />

          <SeqClear
            clearPattern={clearPattern}
          />
        </div>

        <SeqGrid
          pattern={props.pattern}
          currentStep={props.currentStep}
          toggleCell={toggleCell}
          noteNames={props.noteNames}
        />
      </div>
    )

}

const mapDispatchToProps = (dispatch) => {
  return {
    play: (bpm, steps) => dispatch(play(bpm, steps)),
    pause: () => dispatch(pause()),
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
    playing: state.sequencer.playing,
    bpm: state.sequencer.bpm,
    steps: state.sequencer.steps,
    currentStep: state.sequencer.currentStep,
    noteNames: state.sequencer.noteNames,
    release: state.sequencer.release,
    device: state.sequencer.device
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SequencerContainer);
