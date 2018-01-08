import React from 'react';
import classNames from 'classnames';


const Sequencer = props =>{

  return(
    <div className="Sequencer">
      <ul className="notes">
        {noteNames}
      </ul>
    </div>
  )
}

export default Sequencer;
