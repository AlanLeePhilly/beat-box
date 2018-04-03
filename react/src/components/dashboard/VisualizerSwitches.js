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
    <div className="visualizer-toggle buttons">
      
      <button 
        className={classNames('spectrum-toggle', { active: props.seeSpectrum })}
        onClick={handleSpec}>
        Spectrum
      </button>
      
      <button 
        className={classNames('spectrum-toggle', { active: props.seeOscilloscope })}
        onClick={handleOsc}>
        Oscilloscope
      </button>
      
    </div>
  )
}
export default VisualizerSwitches;