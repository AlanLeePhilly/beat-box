import React from 'react';
// import ComponentToRender from './RelativePath'
// import DataToUse from './RelativePath'


class Sampler extends React.Component {
  constructor(props) {
    super(props);
    this.ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    this.state = {
      notes: []
    }
  }

  onPlay(){
    if (this.props.isPlaying()) {
      this.pause();
    } else {
      this.props.play()
      this.interval = setInterval(() => {
        let seqState = this.props.state
        var next = this.props.state.pattern[this.props.state.step]
        this.playNotes(next, {
          seqState
        });
        this.props.nextStep()
      }, ((60 * 1000) / this.props.state.bpm) / 2);
    }
  }

  init() {
    var audioBuffer = context.createBuffer(1, 1024, 44100.0);
    // Create master gain control.
    masterGainNode = context.createGain();
    masterGainNode.gain.value = 0.7;
    masterGainNode.connect(context.destination);

    // Create compressor to sweeten overall mix
    if (context.createDynamicsCompressor) {
        compressor = context.createDynamicsCompressor();
        compressor.connect(masterGainNode);
    } else {
        compressor = masterGainNode;
    }
    // Create convolver for reverb
    convolver = context.createConvolver();
    convolver.connect(compressor);

    loadImpulseResponse('impulse-responses/house-impulses/living-kitchen-leveled.wav');
    // loadImpulseResponse('test.html');
    // Initialize drum kits
    var numKits = kitNames.length;
    kits = new Array(numKits);
    for (var i  = 0; i < numKits; i++) {
        kits[i] = new Kit(kitNames[i]);
    }
    initCanvas();
  }

  playNote(buffer, pan, x, y, z, sendGain, mainGain, cutoff, resonance, noteTime) {
    // Create the note
    var voice = context.createBufferSource();
    voice.buffer = buffer;
    // Connect to filter
    var hasBiquadFilter = context.createBiquadFilter;
    var filter = hasBiquadFilter ? context.createBiquadFilter() : context.createLowPass2Filter();
    if (hasBiquadFilter) {
        filter.frequency.value = cutoff;
        filter.Q.value = resonance; // this is actually resonance in dB
    } else {
        filter.cutoff.value = cutoff;
        filter.resonance.value = resonance;
    }
    voice.connect(filter);
    // Optionally, connect to a panner
    var finalNode;
    if (pan) {
        var panner = context.createPanner();
        panner.panningModel = 'HRTF';
        panner.setPosition(x, y, z);
        filter.connect(panner);
        finalNode = panner;
    } else {
        finalNode = filter;
    }
    // Connect to dry mix
    var dryGainNode = context.createGain();
    dryGainNode.gain.value = mainGain;
    finalNode.connect(dryGainNode);
    dryGainNode.connect(compressor);
    // Connect to wet mix
    var wetGainNode = context.createGain();
    wetGainNode.gain.value = sendGain;
    finalNode.connect(wetGainNode);
    wetGainNode.connect(convolver);
    voice.start(noteTime);
  }

  render() {

    return(
      <div>
        <button
          className={this.props.state.playing ? 'active' : ''}
          onClick={() => {
             this.onPlay();
          }}>
          Play
        </button>
      </div>

    )
  }
}

export default Sampler;
