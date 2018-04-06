import React from 'react';
import classNames from 'classnames';
import SeqCell from './SeqCell'
import SeqLabel from './SeqLabel'

const SeqGrid = props =>{
  let pattern = props.pattern.grid.slice(0)    
  pattern.unshift(props.noteNames)

  function toggleCell(step, cell) {
    let clonedPattern = {}
    Object.assign(clonedPattern, props.pattern)
    let cellState = clonedPattern['grid'][step][cell];
    clonedPattern['grid'][step][cell] = cellState === 1 ? 0 : 1;
    clonedPattern['name'] = "(custom)"
    props.setPattern(clonedPattern)
  }

  return(
    <div className="flex row">
      <div className="flex grid large-10 medium-10 small-2 column">
        {pattern.map((step, stepIndex) =>
          <div
            key={`step-${stepIndex}`}
            className={classNames('step', { active: stepIndex === props.currentStep })}>
            {step.map((cell, i) => {
              let handler = () => toggleCell(stepIndex-1, i)
              if (typeof cell == "string"){
                return (
                  <SeqLabel 
                  key={`seqLabel-${i}`}
                  value={cell}
                  />
                )
              } else{
                return(
                  <SeqCell
                    key={`step${stepIndex-1}-cell-${i}`}
                    handler={handler}
                    classNames={classNames('cell', {
                      active: stepIndex-1 == props.currentStep,
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