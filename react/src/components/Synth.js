import React from 'react';


class Synth {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  playNotes(notes = [], state = {}) {

    if (!notes.length) return;
    var oscArr = [this.ctx.createOscillator(), this.ctx.createOscillator(), this.ctx.createOscillator(), this.ctx.createOscillator()];
    var gainArr = [this.ctx.createGain(), this.ctx.createGain(), this.ctx.createGain(), this.ctx.createGain()];

    for (var i=0; i < notes.length; i++) {
      oscArr[i].type = state.type.toLowerCase();
      oscArr[i].frequency.value = notes[i];
      oscArr[i].start(0);
      gainArr[i].gain.value = 1;

      oscArr[i].connect(gainArr[i]);
      gainArr[i].connect(this.ctx.destination);


    }
    var delay = this.ctx.createDelay();
        delay.delayTime.value = state.delay ? (state.bpm / 10) / 100 : 0;

    /* VCA */


    /* connections */
    // osc.connect(vca);
    // vca.connect(delay);
    // vca.connect(this.ctx.destination);
    // delay.connect(this.ctx.destination);

    // osc.start(0);
    setTimeout(() => {
      gainArr[0].gain.setTargetAtTime(0, this.ctx.currentTime, 0.015);
    }, state.release);

    setTimeout(() => {
      gainArr[1].gain.setTargetAtTime(0, this.ctx.currentTime, 0.015);
    }, state.release);

    setTimeout(() => {
      gainArr[2].gain.setTargetAtTime(0, this.ctx.currentTime, 0.015);
    }, state.release);

    setTimeout(() => {
      gainArr[3].gain.setTargetAtTime(0, this.ctx.currentTime, 0.015);
    }, state.release);

  }
}



export default Synth;
