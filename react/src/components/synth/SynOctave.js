import React from 'react';
import {OCTAVE} from '../../constants/Constants'


const SynOctave = props =>{

let octArr = OCTAVE.map((o, i) => <option key={i}>{o}</option>)
  return(
    <div className="select-wrapper">
      <span>Octave</span>
      <select
        name="octave"
        value={props.octave}
        onChange={(e) => {
          props.setOctave(parseInt(e.target.value))
          props.setFreqs()
        }}
        data-label="octave"
        className="octave">
        {octArr}
      </select>
    </div>

  )
}

export default SynOctave;
