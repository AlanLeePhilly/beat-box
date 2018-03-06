import React from 'react';

const SamPlay = props =>{
  return(
    <button
      className={props.isPlaying ? 'active' : ''}
      onClick={ () => { props.isPlaying? props.play() : props.play() } }>
      Play
    </button>
  )
}

export default SamPlay;
