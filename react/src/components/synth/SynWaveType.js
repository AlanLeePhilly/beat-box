import React from 'react';
import {WAVETYPES} from '../../constants/Constants'

const SynWaveType = props =>{
  let waveArr = WAVETYPES.map((w, i) => <option key={i}>{w}</option>)


  return(
    <div className="select-wrapper">
      <span>Wave Type</span>
      <select
        name="type"
        value={props.waveType}
        onChange={(e) => {
          props.setWaveType(e.target.value.toLowerCase())
        }}
        data-label="wave"
        className="wave">
        {waveArr}
      </select>
    </div>
  )
}

export default SynWaveType;
