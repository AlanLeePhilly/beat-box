import React from 'react';
import { connect } from 'react-redux'

import _ from 'lodash'

import SequencerContainer from './SequencerContainer'
import SynthfulContainer from './SynthfulContainer'
import SamplerContainer from './SamplerContainer'

import {setDevice, setPattern} from '../actions/sequencerAdjust'
import { setSpectrum, setOscilloscope } from '../actions/visualizerAdjust'

import VisualizerSwitches from '../components/dashboard/VisualizerSwitches'
import DeviceToggle from '../components/dashboard/DeviceToggle';
import SeqGrid from '../components/sequencer/SeqGrid';
import { DEVICE_LIST } from '../constants/Constants';

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
    let displayNames
    if (this.props.device == "synth"){
      displayNames = this.props.noteNames
      selectedDevice = <SynthfulContainer 
                        ctx={this.ctx}
                      />
    } else {
      displayNames = this.props.drumNames
      selectedDevice = <SamplerContainer 
                        ctx={this.ctx}
                      />
    }
    
    let setSpectrum = () => {
      this.props.setSpectrum(!this.props.seeSpectrum)
    }
    
    let setOscilloscope = () => {
      this.props.setOscilloscope(!this.props.seeOscilloscope)
    }

    
    return(
      <div className="Dashboard Sequencer grid">
        <div className="row">
          <div className="page-title">Beat Box</div>
        </div>
        
        <SeqGrid
          pattern={_.cloneDeep(this.props.pattern)}
          currentStep={this.props.currentStep}
          setPattern={this.props.setPattern}
          displayNames={displayNames}
        />
        <div className=' gutter-small row'>
          <div className="column medium-4 small-12">
              Device:
              <DeviceToggle 
                device={this.props.device}
                handler={this.handleChange}
              />
          </div>
          
          <div className="column medium-4 small-12">
            Grid:
            <SequencerContainer />
          </div>
          
          <div className="column medium-4 small-12">
            Visualizers:
            <VisualizerSwitches 
              seeOscilloscope={this.props.seeOscilloscope}
              setOscilloscope={this.props.setOscilloscope}
              seeSpectrum={this.props.seeSpectrum}
              setSpectrum={this.props.setSpectrum}        
            />
          </div>
        </div>
        <div className=' gutter-small row'>
          {selectedDevice}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDevice: (name) => dispatch(setDevice(name)),
    setSpectrum: (bool) => dispatch(setSpectrum(bool)),
    setOscilloscope: (bool) => dispatch(setOscilloscope(bool)),
    setPattern: (pattern) => dispatch(setPattern(pattern))    
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.sequencer.device,
    seeSpectrum: state.visualizer.seeSpectrum,
    seeOscilloscope: state.visualizer.seeOscilloscope,
    pattern: state.sequencer.pattern,
    currentStep: state.sequencer.currentStep,
    noteNames: state.synth.noteNames,
    drumNames: state.sampler.drumNames
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

