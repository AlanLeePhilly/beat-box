import React from 'react';

const SeqRelease = props =>{
  return(
    <div className="select-wrapper release">
      <span>Release</span>
      <input
        name="release"
        type="number"
        min="0"
        max="400"
        step="5"
        defaultValue={props.release}
        onChange={(e) => {
          props.setRelease(parseInt(e.target.value))
        }} />
    </div>
  )
}

export default SeqRelease;
