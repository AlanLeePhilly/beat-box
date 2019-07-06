import React from 'react';

const SynEnvelope = props =>{
  
  return(
    <div className="button-wrapper">
      <input 
        className="env-range row"
        type="range" min=".01" max=".5" 
        onChange={(e) => { props.setAttack(e.target.value) }} 
        step=".01"
        value={props.attack} 
        id="attack" 
      />
      <input 
        className="env-range row"
        type="range" min=".01" max="1"
        step=".01" 
        onChange={(e) => { props.setRelease(e.target.value) }} 
        value={props.release} id="release" 
      />

    </div>
  )
}

export default SynEnvelope;