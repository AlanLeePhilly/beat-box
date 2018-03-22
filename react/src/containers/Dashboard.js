import React from 'react';
import { connect } from 'react-redux'
import SequencerContainer from './SequencerContainer'
import SynthfulContainer from './SynthfulContainer'
import SamplerContainer from './SamplerContainer'
import {setDevice} from '../actions/sequencerAdjust'
import { DEVICE_LIST } from '../constants/Constants'
import DeviceToggle from '../components/dashboard/DeviceToggle';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(device){
    this.props.setDevice(device)
  }

  render(){
    let selectedDevice 
    if (this.props.device == "synth"){
      selectedDevice = <SynthfulContainer 
                        ctx={this.ctx}
                      />
    } else {
      selectedDevice = <SamplerContainer 
                        ctx={this.ctx}
                      />
    }
    
    return(
      <div className="Sequence-container Sequencer">
        <DeviceToggle 
          device={this.props.device}
          handler={this.handleChange}
        />
        {selectedDevice}
        <SequencerContainer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDevice: (name) => dispatch(setDevice(name))
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.sequencer.device
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

