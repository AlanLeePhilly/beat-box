import React from 'react';

const SamPlay = props =>{
  return(
    <div className='button-wrapper'>
      <button
        className={props.isPlaying ? 'active' : ''}
        onClick={ () => { props.isPlaying? props.play() : props.play() } }>
        Play
      </button>
    </div>
  )
}

export default SamPlay;
