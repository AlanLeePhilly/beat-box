import React from 'react';

const SamPlay = props =>{
  let button
  
  if (props.isLoaded){
    button = (
      <button
        className={props.isPlaying ? 'active' : ''}
        onClick={ () => { props.isPlaying ? props.play() : props.play() } }>
        Play
      </button>
    )
  } else {
    button = (
      <button 
        id='load-btn'
        className={props.kitName == "Select Kit" ? 'inactive' : ''}
        onClick={ () => { props.loadSamples() } }>
        Load
      </button>
    )
  }
  
  
  return(
    <div>
      {button}
    </div>
  )
}

export default SamPlay;
