import React from 'react';

const Spectrum = props =>{

  if (document.getElementById('spectrum')){
    var spectCtx = document.getElementById('spectrum').getContext('2d');
    draw();
  }
  
  function draw() {
    drawSpectrum(props.analyser, spectCtx);
    requestAnimationFrame(draw);
  }

  function drawSpectrum(analyser, ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var freqData = new Uint8Array(analyser.frequencyBinCount);
    var scaling = height / 256;

    analyser.getByteFrequencyData(freqData);

    ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(200, 0, 0)';
    ctx.beginPath();

    for (var x = 0; x < width; x++)
    ctx.lineTo(x, height - freqData[x] * scaling);

    ctx.stroke();
  }

  return()
}

export default Spectrum;
