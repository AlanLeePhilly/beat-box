import React from 'react';
import classNames from 'classnames';

const DeviceToggle = props => {
  function handleSynth(){
    props.handler('synth')
  }
  function handleSampler(){
    props.handler('sampler')
  }
  
  return(
    <div className="device-toggle buttons row">
      <button 
        className={classNames('synth-toggle', { active: props.device == 'synth' })}
        onClick={handleSynth}>
        Synth
      </button>
      
      <button 
        className={classNames('sampler-toggle', { active: props.device == 'sampler' })}
        onClick={handleSampler}>
        Sampler
      </button>
    </div>
  )
}

export default DeviceToggle;