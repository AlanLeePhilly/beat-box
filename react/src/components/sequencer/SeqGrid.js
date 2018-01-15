import React from 'react';
import classNames from 'classnames';
import SeqCell from './SeqCell'

const SeqGrid = props =>{

  var noteNames
  if (props.noteNames) {
      noteNames = props.noteNames.map((note, i) =>
      <li key={`note-${note}${i}`}>{note}</li>
    ).reverse()
  }

  var pattern = props.pattern
    if (!pattern) {
      pattern = [
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1]
      ]
    }

  return(
    <div>
      <ul className="notes">
        {noteNames}
      </ul>

      <div className="flex grid">
        {pattern.map((step, stepIndex) =>
          <div
            key={`step-${stepIndex}`}
            className={classNames('step', { active: stepIndex === props.currentStep })}>
            {step.map((cell, i) => {
              let handler = () => props.toggleCell(stepIndex, i)
              return(
                <SeqCell
                  key={`step${stepIndex}-cell-${i}`}
                  handler={handler}
                  classNames={classNames('cell', {
                    active: stepIndex == props.currentStep,
                    on: cell === 1
                  })}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>

)}
export default SeqGrid;


{/* <div className="flex grid">
  {pattern.map((step, stepIndex) =>
    <div
      key={`step-${stepIndex}`}
      className={classNames('pattern', {
        active: stepIndex === props.currentStep,
      })}>
      {step.map((cell, i) =>
        <div
          key={`step${stepIndex}-cell-${i}`}
          onClick={props.toggleCell(stepIndex, i) }
          className={classNames('cell', {
            active: stepIndex == props.currentStep,
            on: cell === 1
          })}>
        </div>
      )}
    </div>
  )}
</div> */}
