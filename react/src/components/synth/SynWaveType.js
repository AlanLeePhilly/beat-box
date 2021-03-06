import React from 'react';
import {WAVETYPES} from '../../constants/Constants'

const SynWaveType = props =>{
  let waveArr = WAVETYPES.map((w, i) => <option key={i}>{w}</option>)


  return(
    <div className="button-wrapper">
      <span>Wave Type</span>
      <select
        name="type"
        value={props.waveType.charAt(0).toUpperCase() + props.waveType.slice(1)}
        onChange={(e) => { props.setWaveType(e.target.value.toLowerCase()) }}
        data-label="wave"
        className="wave">
        {waveArr}
      </select>
    </div>
  )
}

export default SynWaveType;
