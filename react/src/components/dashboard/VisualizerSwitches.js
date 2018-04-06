import React from 'react';
import classNames from 'classnames';

const VisualizerSwitches = props =>{
  function handleSpec(){
    props.setSpectrum(!props.seeSpectrum)
  }
  function handleOsc(){
    props.setOscilloscope(!props.seeOscilloscope)
  }
  return(
    <div className="visualizer-toggle btn-box buttons">
      
      <button 
        className={classNames('spectrum-toggle', { active: props.seeSpectrum })}
        onClick={handleSpec}>
        Spec
      </button>
      
      <button 
        className={classNames('spectrum-toggle', { active: props.seeOscilloscope })}
        onClick={handleOsc}>
        Scope
      </button>
      
    </div>
  )
}
export default VisualizerSwitches;