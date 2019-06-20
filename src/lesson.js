import Field from './field';
import Editor from './editor';
import Parser from './lang/parser';
import Logger from './logger';

import $ from 'jquery';

// Car
import car from './examples/car';

// Labyrinth
import easyLabyrinth from './examples/labyrinth/easy-labyrinth';
import mediumLabyrinth from './examples/labyrinth/medium-labyrinth';
import hardLabyrinth from './examples/labyrinth/hard-labyrinth';

// Battle
import oneArcher from './examples/battle/one-archer';
import oneWarrior from './examples/battle/one-warrior';
import warriorsAndArcher from './examples/battle/warriors-and-archer';
import oneDragon from './examples/battle/one-dragon';
import allTogether from './examples/battle/all-together';

// Avengers
import ironMan from './examples/avengers/iron-man';

// Question
import callGranny from './examples/question/call-granny';
import readMore from './examples/question/read-more';
import workHard from './examples/question/work-hard';


import Tour from './codeplay-tour';

const MINIMAL_LOADING_TIME = 500; // ms

const configs = { car, easyLabyrinth, mediumLabyrinth, hardLabyrinth, oneArcher, oneWarrior, oneDragon, allTogether, ironMan, callGranny, readMore, workHard, warriorsAndArcher };


$( document ).ready(async function() {
  Logger.info('Page is loaded');
  let params = new URL(location.href).searchParams;
  let configName = params.get('config');
  // let nextPage = params.get('nextPage');

  if (!configName) {
    alert('Bad config param!');
    throw 'Bad config';
  }

  let conf = configs[configName];

  await assetsLoading();

  let field = new Field(conf);
  field.init();
  field.setSpeed('slow');

  const editor = Editor.setUp(conf);
  buildDocumentationView(conf);

  window.run = async function() {
    showTerminalManagerLink();
    const code = editor.getValue();
    if (code) {
      const codeTree = Parser.parse(code);
      try {
        for (let iteration of conf.iterations) {
          await iteration.pre({field, state: field.state});
          // TODO think how to make it better
          let oldLineBg;
          await field.run(codeTree, {
            start(nr) {
              oldLineBg = Editor.highlightLine(nr, 'lightblue');
            },
            stop(nr) {
              Editor.highlightLine(nr, oldLineBg);
            }
          });
          await iteration.post({field, state: field.state});
        }
        success();
      } catch (err) {
        Logger.error(err);
        fail(err);

        // Resetting field
        field.clear();
        // TODO fix speed bug (spped is not set for a new field)
        field = new Field(conf);
        field.init();
        if (localStorage.programSpeed) {
          field.setSpeed(localStorage.programSpeed);
        }
      }
    }
  };

  window.toggleSpeed = function() {
    if (!localStorage.curSpeed || localStorage.curSpeed == 'slow') {
      localStorage.curSpeed = 'normal';
    } else if (localStorage.curSpeed == 'normal') {
      localStorage.curSpeed = 'fast';
    } else {
      localStorage.curSpeed = 'slow';
    }

    field.setSpeed(localStorage.curSpeed);
    toastr.success('Speed set to: ' + localStorage.curSpeed);
  };

  // TODO mwybe remove it
  // TODO beautify it
  // window.openSettings = function() {
  //   let speed = prompt('Please select speed (slow, normal or fast)');
  //   if (['slow', 'normal', 'fast'].includes(speed)) {
  //     field.setSpeed(speed);
  //     alert(`Speed is set to: ${speed}`);
  //   } else {
  //     alert(`Sorry, ${speed} is not a valid option for speed`);
  //   }
  // };

  window.help = function() {
    Tour.start();
  };
  if (!localStorage.tourStarted) {
    localStorage.tourStarted = true;
    Tour.start();
  } 

  function showTerminalManagerLink() {
    const link = document.getElementById('terminal-manager-link');
    link.style.display = 'block';
  }

  window.toggleTerminalMode = function () {
    $('#logs').toggle(300);
    showTerminalManagerLink();
    const link = document.getElementById('terminal-manager-link');
    if (link.innerHTML == 'hide logs') {
      link.innerHTML = 'show logs';
    } else {
      link.innerHTML = 'hide logs';
    }
  };

  function fail(err) {
    toastr.error(`${err}. Please fix your code and try again`);
    // TODO uncomment later
    // alert('Unfortunately not all tests passed yet :( Please try again. '
    //       + err.toString());
  }
  
  function success() {
    toastr.success('Lesson completed! Well done!');
    // TODO uncomment
    // window.location.replace(nextPage);
  }
  
  function buildDocumentationView(conf) {
    let html = `
      <p class="doc doc-task-description">${conf.taskDescription}</p>
      <table id="doc-table">
        ${
          Object.keys(conf.methods).map(method =>
                                        '<tr><td class="doc doc-method-name">'
                                        + method
                                        + '</td><td class="doc doc-method-description">'
                                        + conf.methods[method].doc
                                        + '</td></tr>')
          .join('')
        }
      </table>
    `;
    $('#doc-view').html(html);
  }

  async function assetsLoading() {
    const loadingStartedTime = Date.now();
    await preLoadImage('img/spinner2.svg');
    showOverlaySpinner();
    Logger.info('Image preloading started');
    await preLoadImages(conf.images);
    Logger.info('Image preloading finished');
    const loadingTime = Date.now() - loadingStartedTime;
    if (loadingTime < MINIMAL_LOADING_TIME) {
      await sleep(MINIMAL_LOADING_TIME - loadingTime);
    }
    hideOverlaySpinner();
  }

  async function preLoadImages(images) {
    for (const imageKey in images) {
      const url = images[imageKey];
      await preLoadImage(url);
      Logger.info(`Image loaded: ${url}`);
    }
  }

  function preLoadImage(url) {
    return new Promise(function(resolve) {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
    });
  }

  function showOverlaySpinner() {
    toggleOverlaySpinner(true);
  }

  function hideOverlaySpinner() {
    toggleOverlaySpinner(false);
  }

  function toggleOverlaySpinner(show) {
    const el = document.getElementById('overlay');
    if (show) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  }

  function sleep(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  }
});