import React from 'react';

const ROOT = ['C','C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const OCTAVE = [...Array(8).keys()]
const SCALE = ['chromatic', 'major', 'minor', 'majorPent', 'minorPent']
const WAVE = ['Sine', 'Square', 'Triange', 'Sawtooth']
const GAIN = [...Array(11).keys()]
const Synth = props =>{

  let rootArr = ROOT.map((r, i) => <option key={i}>{r}</option>)
  let octArr = OCTAVE.map((o, i) => <option key={i}>{o}</option>)
  let scaleArr = SCALE.map((s, i) => <option key={i}>{s}</option>)
  let waveArr = WAVE.map((w, i) => <option key={i}>{w}</option>)
  let gainArr = GAIN.map((g, i) => <option key={i}>{g}</option>)

  return(
    <div className="buttons">


      <div className="select-wrapper">
        <span>Root Note</span>
        <select
          name="rootNote"
          value={props.synthData.rootNote}
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value)
          }}
          data-label="rootNote"
          className="rootNote">
          {rootArr}
        </select>
      </div>

      <div className="select-wrapper">
        <span>Octave</span>
        <select
          name="octave"
          value={props.synthData.octave}
          onChange={(e) => {
            props.handleChange(e.target.name, parseInt(e.target.value))
          }}
          data-label="octave"
          className="octave">
          {octArr}
        </select>
      </div>

      <div className="select-wrapper">
        <span>Scale</span>
        <select
          name="scale"
          value={props.synthData.scale}
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value)
          }}
          data-label="scale"
          className="scale">
          {scaleArr}
        </select>
      </div>

      <div className="select-wrapper">
        <span>Wave</span>
        <select
          name="type"
          value={props.synthData.type}
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value.toLowerCase())
          }}
          data-label="wave"
          className="wave">
          {waveArr}
        </select>
      </div>

      <div className="select-wrapper">
        <span>Volume</span>
        <select
          name="masterGain"
          value={props.synthData.masterGain * 10}
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value/10)
          }}
          data-label="masterGain"
          className="masterGain">
          {gainArr}
        </select>
      </div>
    </div>
  )
}

export default Synth;
