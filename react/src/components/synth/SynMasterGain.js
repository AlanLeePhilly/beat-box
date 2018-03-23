import React from 'react';
import {GAIN} from '../../constants/Constants'

const SynMasterGain = props =>{
  let gainArr = GAIN.map((g, i) => <option key={i}>{g}</option>)


  return(
    <div className="button-wrapper">
      <select
        name="masterGain"
        value={props.masterGain * 10}
        onChange={(e) => {
          props.setMasterGain(e.target.value/10)
        }}
        data-label="masterGain"
        className="masterGain">
        {gainArr}
      </select><br/>
      <span>Volume</span>
    </div>
  )
}

export default SynMasterGain;
