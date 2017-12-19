import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import Sequencer from './components/Sequencer'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Sequencer />, document.getElementById('app'));
})
