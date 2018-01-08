import React from 'react';

const SeqBpm = props =>{
  return(
    <div className="select-wrapper bpm">
      <span>BPM</span>
      <input
        name="bpm"
        type="number"
        min="40"
        max="200"
        step="1"
        defaultValue={props.bpm}
        onChange={(e) => {
          props.setBpm(parseInt(e.target.value))
        }} />
    </div>
  )
}

export default SeqBpm;
