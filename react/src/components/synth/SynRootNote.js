import React from 'react';
import { ROOTNOTES } from '../../constants/Constants'

const SynRootNote = props =>{

  let rootArr = ROOTNOTES.map((r, i) => <option key={i}>{r}</option>)

  return(
    <div className="button-wrapper">
      <span>Root Note</span>
      <select
        name="rootNote"
        value={props.rootNote}
        onClick={props.pause}
        onChange={(e) => {
          props.setRootNote(e.target.value)
          props.pause()
        }}
        data-label="rootNote"
        className="rootNote">
        {rootArr}
      </select>
    </div>
  )
}

export default SynRootNote;
