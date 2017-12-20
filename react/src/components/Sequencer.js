import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Synth from './Synth';
import Synthful from './Synthful';

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
      delay: false
    };
    this.setNotes = this.setNotes.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

    setNotes(noteArr){
      this.setState({
        notes: noteArr[0],
        noteNames: noteArr[1]
      })
    }

  // componentDidMount(){
  //   this.setNotes()
  // }

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

  // changeWaveType(type) {
  //   this.setState({
  //     type: type
  //   }, () => {
  //     this.pause();
  //
  //     if (this.state.playing) this.play();
  //   });
  // }

  // changeScale(scale) {
  //   this.setState({
  //     scale: scale
  //   }, () => {
  //     this.pause();
  //     this.setNotes();
  //     if (this.state.playing) this.play();
  //   });
  // }

  // changeRootNote(rootNote) {
  //   this.setState({
  //     rootNote: rootNote
  //   }, () => {
  //     this.pause();
  //     this.setNotes();
  //     if (this.state.playing) this.play();
  //   });
  // }

  // changeOctave(octave) {
  //   this.setState({
  //     octave: +octave
  //   }, () => {
  //     this.pause();
  //     this.setNotes();
  //     if (this.state.playing) this.play();
  //   });
  // }

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
  componentWillReceiveProps(){
    debugger
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
    const { pattern, step, notes } = this.state;
    const notesArray = Object.keys(notes).map(key => notes[key]);
    let nextStep = () => { this.nextStep() }
    let play = () => { this.play() }
    let pause = () => { this.pause() }
    return (
      <div className="container">
        <header><h1>Sequencial Sounds</h1></header>
        <div className="Sequencer">

          <div className="buttons">
            {/* <button
              className={this.state.playing ? 'active' : ''}
              onClick={() => {
                if (this.state.playing) this.pause();
                else this.play();
              }}>
              Play
            </button> */}

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

            {/* <div className="select-wrapper">
              <span>Wave</span>
              <select
                value={this.state.type}
                onChange={(e) => this.changeWaveType(e.target.value)}
                data-label="wave"
                data-label="wave"
                className="wave">
                <option>Sine</option>
                <option>Square</option>
                <option>Sawtooth</option>
                <option>Triangle</option>
              </select>
            </div> */}

            <div className="select-wrapper">
              <span>Release</span>
              <input
                type="number"
                min="0"
                max="400"
                step="1"
                defaultValue={this.state.release}
                onChange={(e) => this.changeRelease(e.target.value)} />
            </div>

            <button
              onClick={() => {
                this.setState({
                  delay: !this.state.delay
                }, () => {
                  this.pause();
                  if (this.state.playing) this.play();
                });
              }}
              className={classNames({ active: this.state.delay })}>
              Delay
            </button>
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

          {/* <div className="buttons">
            <div className="select-wrapper">
              <span>Root Note</span>
              <select
                value={this.state.rootNote}
                onChange={(e) => this.changeRootNote(e.target.value)}
                data-label="rootNote"
                className="rootNote">
                <option>C</option>
                <option>C#</option>
                <option>D</option>
                <option>D#</option>
                <option>E</option>
                <option>F</option>
                <option>F#</option>
                <option>G</option>
                <option>G#</option>
                <option>A</option>
                <option>A#</option>
                <option>B</option>
              </select>
            </div>

            <div className="select-wrapper">
              <span>Octave</span>
              <select
                value={this.state.octave}
                onChange={(e) => this.changeOctave(e.target.value)}
                data-label="octave"
                className="octave">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </div>

            <div className="select-wrapper">
              <span>Scale</span>
              <select
                value={this.state.scale}
                onChange={(e) => this.changeScale(e.target.value)}
                data-label="scale"
                data-label="scale"
                className="scale">
                <option>chromatic</option>
                <option>major</option>
                <option>minor</option>
                <option>majorPent</option>
                <option>minorPent</option>
              </select>
            </div>
          </div> */}
          <Synthful
            setNotes={this.setNotes}
            state={this.state}
            play={this.play}
            pause={this.pause}
            nextStep={this.nextStep}
          />
        </div>
      </div>
    )
  }
}

export default Sequencer;
