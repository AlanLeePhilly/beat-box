import React from 'react';

const SeqCell = props =>{


  return(
    <div
      onClick={props.handler}
      className={props.classNames}
    >
    </div>

  )
}

export default SeqCell;
