import {render} from 'react-dom';
import React from 'react';
import App from './reaktor/reaktorApp.jsx';
global.jQuery = require('jquery');
require('bootstrap');
let tircContent = document.getElementById('reaktor-container');
render(<App />, tircContent);