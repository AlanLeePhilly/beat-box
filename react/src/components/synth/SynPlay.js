import React from 'react';

const SynPlay = props =>{
  return(
    <div className="button-wrapper">
      <button
        className={props.isPlaying ? 'active' : ''}
        onClick={ () => { props.isPlaying? props.play() : props.play() } }>
        Play
      </button>
    </div>
  )
}

export default SynPlay;
