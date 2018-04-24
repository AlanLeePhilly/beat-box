import React from 'react';
import { KITNAMES } from '../../constants/Constants'

const SeqPatternSelect = props =>{
  let patternOptions = props.patterns.map((p, i) => <option key={i}>{p.name}</option>)
  patternOptions.unshift(<option disabled  key="99">Preset Patterns</option>)
  return(
    <div className="button-wrapper">
      <select
        name="pattern"
        value={props.pattern.name}
        onChange={(e) => { props.setPattern(e.target.value) }}
        data-label="pattern"
        className="pattern">
        {patternOptions}
      </select>
    </div>
  )
}

export default SeqPatternSelect;