import React from 'react';
import classNames from 'classnames';
import SeqCell from './SeqCell'

const SeqGrid = props =>{

  var noteNames
  if (props.noteNames) {
      noteNames = props.noteNames.map((note, i) =>
      <div className='note-name' key={`note-${note}${i}`}>{note}</div>
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
    <div className="flex row">
      <div className="notes large-2 medium-2 small-2 column">
        {noteNames}
      </div>

      <div className="flex grid large-10 medium-10 small-2 column">
        {pattern.map((step, stepIndex) =>
          <div
            key={`step-${stepIndex}`}
            className={classNames('step', { active: stepIndex === props.currentStep })}>
            {step.map((cell, i) => {
              let handler = () => props.toggleCell(stepIndex, i)
              if (cell.type == "div"){
                return cell
              } else{
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
              }
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
