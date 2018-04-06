import React from 'react';
import { KITNAMES } from '../../constants/Constants'

const SamKitSelector = props =>{
  
  let kitNameArr = KITNAMES.map((g, i) => {
    if(i==0){
      return(<option disabled key={i}>{g}</option>)
    } else{
      return(<option key={i}>{g}</option>)
    }
  })



  return(
    <div className="button-wrapper">
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


