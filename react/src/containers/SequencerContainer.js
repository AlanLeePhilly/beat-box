import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import SynthfulContainer from './SynthfulContainer';
import Sequencer from '../components/Sequencer';
import Sampler from '../components/Sampler';


const defaultPattern = [
  [1,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0],
  [0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0],
  [0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,1]
];


// var aC = window.AudioContext
// || window.webkitAudioContext // Safari and old versions of Chrome
// || false;

class SequencerContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pattern: defaultPattern,
      playing: false,
      steps: 8,
      currentStep: 0,
      noteNames: [''],
      bpm: 98,
      release: 100,
      device: 'synth'
    };
    this.clearPattern = this.clearPattern.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.clearPattern = this.clearPattern.bind(this)
    this.setNoteNames = this.setNoteNames.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (name, value) {
  this.setState({[name]: value}, this.pause())
  }


  nextStep() {
    this.setState({
      currentStep: this.state.currentStep < this.state.steps - 1 ?
        this.state.currentStep + 1 : 0
    })
  }

  play() {
    this.setState({ playing: true });
  }

  pause() {
    this.setState({ playing: false, currentStep: 0 });
  }

  clearPattern() {
    this.setState({
      pattern: [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ]
    });
  }

  setNoteNames(names){
    this.setState({ noteNames: names})
  }

  setPattern(pattern){
    this.setState({ pattern: pattern })
  }

  toggleCell(step, cell) {
    var clonedPattern = this.state.pattern.slice(0);
    var cellState = clonedPattern[step][cell];
    clonedPattern[step][cell] = cellState === 1 ? 0 : 1;
    this.setState({ pattern: clonedPattern });
  }

  render() {
    const { pattern, currentStep, notes } = this.state;
    let nextStep = () => { this.nextStep() }
    let play = () => { this.play() }
    let pause = () => { this.pause() }
    let clear = () => { this.clearPattern() }
    let handleChange = (name, value) => { this.handleChange(name, value) }
    let setNoteNames = (names) => { this.setNoteNames(names) }
    let toggleCell = (step, cell) => { this.toggleCell(step, cell) }
    let device
    if (this.state.device == 'synth'){
      device = <SynthfulContainer
                  data={this.state}
                  play={play}
                  pause={pause}
                  nextStep={nextStep}
                  setNoteNames={setNoteNames}
                />
      }
    else {
      device = <Sampler
                  setNotes={this.setNotes}
                  state={this.state}
                  play={this.play}
                  pause={this.pause}
                  nextStep={this.nextStep}
                  isPlaying={this.isPlaying}
                />
    }
    return (
      <div className="Sequencer">
        {device}
        <Sequencer
          data={this.state}
          handleChange={handleChange}
          clear={clear}
          toggleCell={toggleCell}
        />
      </div>
    )
  }
}

export default SequencerContainer;
