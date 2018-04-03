import React from 'react';

const SamPlay = props =>{
  let button
  
  if (props.isLoaded){
    button = (
      <button
        className={props.isPlaying ? 'active' : ''}
        onClick={ () => { props.isPlaying? props.play() : props.play() } }>
        Play
      </button>
    )
  } else {
    button = (
      <button onClick={ () => { props.loadSamples() } }>
        LoadKit
      </button>
    )
  }
  
  
  return(
    <div className='button-wrapper'>
      {button}
    </div>
  )
}

export default SamPlay;
