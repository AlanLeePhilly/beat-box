import React from 'react';
import { KITNAMES } from '../../constants/Constants'

const SamKitSelector = props =>{
  let kitNameArr = KITNAMES.map((g, i) => <option key={i}>{g}</option>)


  return(
    <div className="button-wrapper">
      <span>Kit</span>
      <select
        name="kitName"
        value={props.kitName}
        onChange={(e) => {
          props.setKitName(e.target.value)
        }}
        data-label="kitName"
        className="kitName">
        {kitNameArr}
      </select>
    </div>
  )
}

export default SamKitSelector;
