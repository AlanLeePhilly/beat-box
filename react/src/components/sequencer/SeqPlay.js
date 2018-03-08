import React from 'react';

const SeqPlay = props =>{
  return(
    <button
      className={props.isPlaying ? 'active' : ''}
      onClick={() => { props.isPlaying? props.pause() : props.play() }}>
      Play
    </button>
  )
}

export default SeqPlay;
