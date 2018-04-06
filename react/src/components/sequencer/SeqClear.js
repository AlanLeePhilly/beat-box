import React from 'react';

const SeqClear = props =>{
  return(
    <div className="clear">
      <button onClick={ () => {props.clearPattern() }}>
        Clear
      </button>
    </div>
  )
}

export default SeqClear;
