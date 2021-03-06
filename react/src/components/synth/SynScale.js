import React from 'react';
import {SCALENAMES} from '../../constants/Constants'

const SynScale = props =>{
  let scaleArr = SCALENAMES.map((s, i) => <option key={i}>{s}</option>)


  return(
    <div className="button-wrapper">
      <span>Scale</span>
      <select
        name="scale"
        value={props.scale}
        onChange={(e) => { props.setScale(e.target.value) }}
        data-label="scale"
        className="scale">
        {scaleArr}
      </select>
    </div>
  )
}

export default SynScale;
