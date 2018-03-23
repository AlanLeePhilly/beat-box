import React from 'react';
import { KITNAMES } from '../../constants/Constants'

const SeqPatternSelect = props =>{
  let patternOptions = props.patterns.map((p, i) => <option key={i}>{p.name}</option>)

  return(
    <div className="select-wrapper">
      <span>Kit</span>
      <select
        name="pattern"
        value={props.pattern.name}
        onChange={(e) => {
          props.setPattern(e.target.value)
        }}
        data-label="pattern"
        className="pattern">
        {patternOptions}
      </select>
    </div>
  )
}

export default SeqPatternSelect;