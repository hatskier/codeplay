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
const spinnerUrl = 'https://s3.amazonaws.com/alcourses.codeplay/common/spinner2.svg';

const configs = {
  car,
  easyLabyrinth,
  mediumLabyrinth,
  hardLabyrinth,
  oneArcher,
  oneWarrior,
  oneDragon,
  allTogether,
  ironMan,
  callGranny,
  readMore,
  workHard,
  warriorsAndArcher
};

// Global field variable
let field;

// TODO think how to make it better
// and without global variables
let oldLineBg;
let prevNr;
let keysPressed = {};


function getParamStr(url) {
  Logger.info(`Getting paramStr from ${url}`);
  let paramsStr = "";
  let questionMarkReached = false;
  for (let c of url) {
    if (questionMarkReached) {
      paramsStr += c;
    }
    if (c == '?') {
      questionMarkReached = true;
    }
  }
  Logger.info(`Params str: ${paramsStr}`);
  return paramsStr;
}

function getParam(paramStr, param) {
  let jsonStr = 
    '{"'
    + decodeURI(paramStr)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g,'":"')
    + '"}';
  // Logger.info(jsonStr);
  let obj = JSON.parse(jsonStr);
  return obj[param];
}


$( document ).ready(async function() {
  Logger.info('Page is loaded');

  // let params = new URL(location.href).searchParams;
  // let configName = params.get('config');
  // let nextPage = params.get('nextPage');

  // Temporary version for blockstack
  let paramsStr = getParamStr(location.href);
  let configName = getParam(paramsStr, 'config');
  let nextPage = getParam(paramsStr, 'nextPage');

  if (!configName) {
    alert('Bad config param!');
    throw 'Bad config';
  }

  let conf = configs[configName];

  await assetsLoading();

  initField();

  const editor = Editor.setUp(conf);
  buildDocumentationView(conf);

  function preventHotKeys() {
    $(document).bind('keydown', function(e) {
      keysPressed[e.key] = true;
      Logger.debug(keysPressed);
      const macHotKeySaving = keysPressed['Meta'] && keysPressed['s'];
      const windowsHotKeySaving = keysPressed['Control'] && keysPressed['s'];
      if (macHotKeySaving || windowsHotKeySaving) {
        Logger.info('Preventing default behaviour for the pressed keys');
        Logger.info(keysPressed);
        e.preventDefault();
        return false;
      }
      return true;
    });

    $(document).bind('keyup', function(e) {
      // This hack was created because after releasing 2 keys only one event is raised
      keysPressed = {};
    });
  }

  preventHotKeys();

  window.reset = function() {
    changeManageButtons({showStop: false, showRun: false});
    field.stopExecution(function () {
      initField();
      changeManageButtons({showStop: false, showRun: true});
    });
  };

  window.run = async function() {
    changeManageButtons({showStop: true, showRun: false});
    showTerminalManagerLink();
    const code = editor.getValue();
    if (code) {
      try {
        const codeTree = Parser.parse(code);
        for (let iteration of conf.iterations) {
          await iteration.pre({field, state: field.state});

          await field.run(codeTree, {
            start(nr) {
              if (prevNr !== undefined) {
                Editor.highlightLine(prevNr, oldLineBg);
              }
              prevNr = nr;
              oldLineBg = Editor.highlightLine(nr, 'lightblue');
            },
            stop() {
              // Editor.highlightLine(nr, oldLineBg);
            }
          });

          await iteration.post({field, state: field.state});
        }
        await success();
      } catch (err) {
        Logger.error(err);
        fail(err);
        initField();
      } finally {
        changeManageButtons({showStop: false, showRun: true});
        // To revert normal color fot the last code line
        Editor.highlightLine(prevNr, oldLineBg);
      }
    }
  };

  window.toggleSpeed = function() {
    if (!localStorage.programSpeed || localStorage.programSpeed == 'slow') {
      localStorage.programSpeed = 'normal';
    } else if (localStorage.programSpeed == 'normal') {
      localStorage.programSpeed = 'fast';
    } else {
      localStorage.programSpeed = 'slow';
    }

    field.setSpeed(localStorage.programSpeed);
    toastr.success('Speed set to: ' + localStorage.programSpeed);
  };

  window.help = function() {
    Tour.start();
  };
  if (!localStorage.tourStarted) {
    localStorage.tourStarted = true;
    Tour.start();
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

  // TODO implement
  function changeManageButtons(opts) {
    if (opts && opts.showStop) {
      $('#stop-button').show();
    } else {
      $('#stop-button').hide();
    }

    if (opts && opts.showRun) {
      $('#run-button').show();
    } else {
      $('#run-button').hide();
    }
  }

  function initField() {
    field = new Field(conf);
    Logger.info(field); // TODO alex
    field.clear();
    field.init();
    if (localStorage.programSpeed) {
      field.setSpeed(localStorage.programSpeed);
    }
  }

  function showTerminalManagerLink() {
    const link = document.getElementById('terminal-manager-link');
    link.style.display = 'block';
  }

  function fail(err) {
    toastr.error(`${err}`);
    // TODO uncomment later
    // alert('Unfortunately not all tests passed yet :( Please try again. '
    //       + err.toString());
  }
  
  async function success() {
    toastr.success('Lesson completed! Well done! Saving your result... Please don\'t close the window');
    // TODO uncomment
    // await sleep(1000);
    // alert(nextPage);
    window.location.href = nextPage;
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
    try {
      const loadingStartedTime = Date.now();
      await preLoadImage(spinnerUrl);
      showOverlaySpinner();
      Logger.info('Image preloading started');
      await preLoadImages(conf.images);
      Logger.info('Image preloading finished');
      const loadingTime = Date.now() - loadingStartedTime;
      if (loadingTime < MINIMAL_LOADING_TIME) {
        await sleep(MINIMAL_LOADING_TIME - loadingTime);
      }
      hideOverlaySpinner();
    } catch (e) {
      toastr.error(e.toString());
      toastr.warning('Please check your internet connection.');
      throw e;
    }

  }

  async function preLoadImages(images) {
    for (const imageKey in images) {
      const url = images[imageKey];
      Logger.info(`Loading image: ${url}`);
      await preLoadImage(url);
      Logger.info(`Image loaded: ${url}`);
    }
  }

  function preLoadImage(url) {
    return new Promise(function(resolve, reject) {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = function () {
        reject(`Failed to load image: ${url}`);
      };
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