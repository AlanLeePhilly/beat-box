import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Synth from './Synth';

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

const NOTES = {
"C0": 16.35,"C#0": 17.32,"D0": 18.35,"D#0": 19.45,"E0": 20.6,"F0": 21.83,
"F#0": 23.12,"G0": 24.5,"G#0": 25.96,"A0": 27.5,"A#0": 29.14,"B0": 30.87,
"C1": 32.7,"C#1": 34.65,"D1": 36.71,"D#1": 38.89,"E1": 41.2,"F1": 43.65,
"F#1": 46.25,"G1": 49,"G#1": 51.91,"A1": 55,"A#1": 58.27,"B1": 61.74,
"C2": 65.41,"C#2": 69.3,"D2": 73.42,"D#2": 77.78,"E2": 82.41,"F2": 87.31,
"F#2": 92.5,"G2": 98,"G#2": 103.83,"A2": 110,"A#2": 116.54,"B2": 123.47,
"C3": 130.81,"C#3": 138.59,"D3": 146.83,"D#3": 155.56,"E3": 164.81,"F3": 174.61,
"F#3": 185,"G3": 196,"G#3": 207.65,"A3": 220,"A#3": 233.08,"B3": 246.94,
"C4": 261.63,"C#4": 277.18,"D4": 293.66,"D#4": 311.13,"E4": 329.63,"F4": 349.23,
"F#4": 369.99,"G4": 392,"G#4": 415.3,"A4": 440,"A#4": 466.16,"B4": 493.88,
"C5": 523.25,"C#5": 554.37,"D5": 587.33,"D#5": 622.25,"E5": 659.26,"F5": 698.46,
"F#5": 739.99,"G5": 783.99,"G#5": 830.61,"A5": 880,"A#5": 932.33,"B5": 987.77,
"C6": 1046.5,"C#6": 1108.73,"D6": 1174.66,"D#6": 1244.51,"E6": 1318.51,"F6": 1396.91,
"F#6": 1479.98,"G6": 1567.98,"G#6": 1661.22,"A6": 1760,"A#6": 1864.66,"B6": 1975.53,
"C7": 2093,"C#7": 2217.46,"D7": 2349.32,"D#7": 2489.02,"E7": 2637.02,"F7": 2793.83,
"F#7": 2959.96,"G7": 3135.96,"G#7": 3322.44,"A7": 3520,"A#7": 3729.31,"B7": 3951.07,
"C8": 4186.01,"C#8": 4434.92,"D8": 4698.64,"D#8": 4978.03};

const SCALES = {
  'chromatic': [1,2,3,4,5,6,7],
  'major': [2,4,5,7,9,11,12],
  'minor': [2,3,5,7,8,10,12],
  'majorPent': [2,4,7,9,12,14,16],
  'minorPent': [3,5,7,10,12,15,17]
};

const ROOTNOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

var getNotes = function(rootNote, octave, scale) {
  rootNote = ROOTNOTES.indexOf(rootNote)
  var rootIndex = rootNote + (octave - 1) * 12;
  var indArr = SCALES[scale].map((x, i) => { return x + rootIndex })
  indArr.unshift(rootIndex)
  let noteArr = []
  noteArr[0] =  indArr.map(val => { return Object.keys(NOTES)[val] })
  noteArr[1] = indArr.map(val => { return Object.values(NOTES)[val] })
  return noteArr
  }


var synth = new Synth();

class Sequencer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pattern: defaultPattern,
      playing: false,
      steps: 8,
      step: 8,
      octave: 4,
      rootNote: 'C',
      scale: 'chromatic',
      notes: [],
      noteNames: [],
      type: 'sine',
      bpm: 98,
      release: 100,
      delay: false
    };
this.setNotes = this.setNotes.bind(this)
  }

  setNotes(){
    let noteArr = getNotes(this.state.rootNote, this.state.octave, this.state.scale)
    this.setState({
      notes: noteArr[1],
      noteNames: noteArr[0]
    })
  }

  componentDidMount(){
    this.setNotes()
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

  changeWaveType(type) {
    this.setState({
      type: type
    }, () => {
      this.pause();

      if (this.state.playing) this.play();
    });
  }

  changeScale(scale) {
    this.setState({
      scale: scale
    }, () => {
      this.pause();
      this.setNotes();
      if (this.state.playing) this.play();
    });
  }

  changeRootNote(rootNote) {
    this.setState({
      rootNote: rootNote
    }, () => {
      this.pause();
      this.setNotes();
      if (this.state.playing) this.play();
    });
  }

  changeOctave(octave) {
    this.setState({
      octave: +octave
    }, () => {
      this.pause();
      this.setNotes();
      if (this.state.playing) this.play();
    });
  }

  play() {

    const { bpm, notes, type, release, delay } = this.state;
    const notesArray = Object.keys(notes).map(key => notes[key]);

    this.setState({
      playing: true
    });

    this.interval = setInterval(() => {

      this.setState({
        step: this.state.step < this.state.steps - 1 ?
          this.state.step + 1 : 0
      }, () => {
        var next = this.state.pattern[this.state.step].map((cell, i) =>
          cell === 1 ? notesArray[i] : null
        ).filter(x => x);
        synth.playNotes(next, {
          release,
          bpm,
          type,
          delay
        });

      });
    }, ((60 * 1000) / this.state.bpm) / 2);
  }

  pause() {
    this.setState({
      playing: false,
      step: 8
    });

    clearInterval(this.interval);
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
    return (
      <div className="container">
        <header><h1>Sequencial Sounds</h1></header>
        <div className="Sequencer">

          <div className="buttons">
            <button
              className={this.state.playing ? 'active' : ''}
              onClick={() => {
                if (this.state.playing) this.pause();
                else this.play();
              }}>
              Play
            </button>

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
            </div>

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
              <li key={`note-${note}`}>{note.slice(0, note.length - 1)}</li>
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

          <div className="buttons">

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
          </div>
        </div>
      </div>
    )
  }
}

export default Sequencer;
