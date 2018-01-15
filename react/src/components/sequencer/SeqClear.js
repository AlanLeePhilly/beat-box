import React from 'react';

const SeqClear = props =>{
  return(
    <div className="select-wrapper clear">
      <button onClick={ () => {props.clearPattern() }}>
        Clear
      </button>
    </div>
  )
}

export default SeqClear;
