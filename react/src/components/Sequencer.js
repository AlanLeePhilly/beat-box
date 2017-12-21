import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Synth from './Synth';
import Synthful from './Synthful';
import Sampler from './Sampler';

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



var AC = window.AudioContext
|| window.webkitAudioContext // Safari and old versions of Chrome
|| false;

// if (AC) {
// var synth = new Synth();
// }

class Sequencer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pattern: defaultPattern,
      playing: false,
      steps: 8,
      step: 0,
      notes: [],
      noteNames: [],
      bpm: 98,
      release: 100,
      delay: false,
      device: 'synth'
    };
    this.setNotes = this.setNotes.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.isPlaying = this.isPlaying.bind(this)
  }

  setNotes(noteArr){
      this.setState({
        notes: noteArr[0],
        noteNames: noteArr[1]
      })
    }

  isPlaying(){
    return this.state.playing
  }

  changeRelease(release) {
    this.setState({
      release
    }, () => {
      this.pause();

      if (this.state.playing) this.play();
    })
  }

  changeBPM(bpm) {
    if (bpm > 300 || bpm < 60) return;

    this.setState({
      bpm
    }, () => {
      this.pause();

      if (this.state.playing) this.play();
    });
  }

  changeDevice(device){
    this.setState({
      device
    })
  }

  nextStep() {
    this.setState({
      step: this.state.step < this.state.steps - 1 ?
        this.state.step + 1 : 0
    })
  }

  play() {
    this.setState({ playing: true });
  }

  pause() {
    this.setState({
      playing: false,
      step: 0
    });
  }

  toggleCell(step, cell) {

    var clonedPattern = this.state.pattern.slice(0);
    var cellState = clonedPattern[step][cell];

    clonedPattern[step][cell] = cellState === 1 ? 0 : 1;

    this.setState({
      pattern: clonedPattern
    });
  }

  render() {
    let device
    if (this.state.device == 'synth'){
      device = <Synthful
                  setNotes={this.setNotes}
                  state={this.state}
                  play={this.play}
                  pause={this.pause}
                  nextStep={this.nextStep}
                  isPlaying={this.isPlaying}
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
    const { pattern, step, notes } = this.state;
    const notesArray = Object.keys(notes).map(key => notes[key]);
    let nextStep = () => { this.nextStep() }
    let play = () => { this.play() }
    let pause = () => { this.pause() }
    return (
      <div className="container">

        <div className="Sequencer">

          <div className="buttons">

            <div className="select-wrapper">
              <span>BPM</span>
              <input
                type="number"
                min="80"
                max="300"
                step="1"
                defaultValue={this.state.bpm}
                onChange={(e) => this.changeBPM(e.target.value)} />
            </div>

            <div className="select-wrapper">
              <span>Release</span>
              <input
                type="number"
                min="0"
                max="400"
                step="5"
                defaultValue={this.state.release}
                onChange={(e) => this.changeRelease(e.target.value)} />
            </div>

            <div className="select-wrapper">
              <span>Instrument</span>
              <select
                value={this.state.device}
                onChange={(e) => this.changeDevice(e.target.value)}
                data-label="device"
                data-label="device"
                className="device">
                <option>synth</option>
                <option>sampler</option>
              </select>
            </div>

          </div>

          <ul className="notes">
            {this.state.noteNames.map(note =>
              <li key={`note-${note}`}>{note}</li>
            ).reverse()}
          </ul>

          <div className="flex">
            {pattern.map((step, stepIndex) =>
              <div key={`step-${stepIndex}`} className="pattern">
                {step.map((cell, i) =>
                  <div
                    key={`step${stepIndex}-cell-${i}`}
                    onClick={() => {
                      this.toggleCell(stepIndex, i);
                    }}
                    className={classNames('cell', {
                      active: stepIndex === step,
                      on: cell === 1
                    })}
                  />
                )}
              </div>
            )}
          </div>

          {device}
        </div>
      </div>
    )
  }
}

export default Sequencer;
