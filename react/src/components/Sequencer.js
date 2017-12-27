import React from 'react';
import classNames from 'classnames';

const Sequencer = props =>{

let noteNames
if (props.data.noteNames) {
    noteNames = props.data.noteNames.map(note =>
    <li key={`note-${note}`}>{note}</li>
  ).reverse()
}
  return(
    <div className="Sequencer">

      <div className="buttons">

        <div className="select-wrapper bpm">
          <span>BPM</span>
          <input
            name="bpm"
            type="number"
            min="40"
            max="200"
            step="1"
            defaultValue={props.data.bpm}
            onChange={(e) => {
              props.handleChange(e.target.name, parseInt(e.target.value))
            }} />
        </div>

        <div className="select-wrapper release">
          <span>Release</span>
          <input
            name="release"
            type="number"
            min="0"
            max="400"
            step="5"
            defaultValue={props.data.release}
            onChange={(e) => {
              props.handleChange(e.target.name, parseInt(e.target.value))
            }} />
        </div>

        <div className="select-wrapper device">
          <span>Device</span>
          <select
            name="device"
            value={props.data.device}
            onChange={(e) => {
              props.handleChange(e.target.name, e.target.value)
            }}
            data-label="device"
            className="device">
            <option>synth</option>
            <option>sampler</option>
          </select>
        </div>

        <div className="select-wrapper clear">
          <button onClick={props.clear}>
            Clear
          </button>
        </div>
      </div>

      <ul className="notes">
        {noteNames}
      </ul>

      <div className="flex grid">
        {props.data.pattern.map((step, stepIndex) =>
          <div
            key={`step-${stepIndex}`}
            className={classNames('pattern', {
              active: stepIndex === props.data.currentStep,
            })}>
            {step.map((cell, i) =>
              <div
                key={`step${stepIndex}-cell-${i}`}
                onClick={() => {
                  props.toggleCell(stepIndex, i);
                }}
                className={classNames('cell', {
                  active: stepIndex == props.data.currentStep,
                  on: cell === 1
                })}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sequencer;
