import React from 'react';
import SequencerContainer from './SequencerContainer'
import SynthfulContainer from './SynthfulContainer'
import SamplerContainer from './SamplerContainer'

const Dashboard = props =>{


  return(
    <div className="Sequence-container Sequencer">
      <SequencerContainer />
      <SamplerContainer />
      {/* <SynthfulContainer /> */}
    </div>
  )
}

export default Dashboard;
