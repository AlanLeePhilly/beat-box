import React from 'react';

const SeqPlay = props =>{
  return(
    <div className='button-wrapper'>
      <button
        className={props.isPlaying ? 'active' : ''}
        onClick={() => { props.isPlaying? props.pause() : props.play() }}>
        Play
      </button>
    </div>
  )
}

export default SeqPlay;
