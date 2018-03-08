import React from 'react';

const SynPlay = props =>{
  return(
    <button
      className={props.isPlaying ? 'active' : ''}
      onClick={ () => { props.isPlaying? props.play() : props.play() } }>
      Play
    </button>
  )
}

export default SynPlay;
