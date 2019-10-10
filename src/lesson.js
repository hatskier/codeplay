import Field from './field';
import Editor from './editor';
import Parser from './lang/parser';
import Logger from './logger';
import GifUrls from './gifUrls';

// import $ from 'jquery';
// import Typed from 'typed.js';

// Car
import car from './examples/car';

// Labyrinth
import easyLabyrinth from './examples/labyrinth/easy-labyrinth';
import mediumLabyrinth from './examples/labyrinth/medium-labyrinth';
import hardLabyrinth from './examples/labyrinth/hard-labyrinth';

// Battle
import oneArcher from './examples/battle/one-archer';
import oneWarrior from './examples/battle/one-warrior';
// import warriorsAndArcher from './examples/battle/later/warriors-and-archer';
import oneDragon from './examples/battle/one-dragon';
import twoWarriors from './examples/battle/two-warriors';
// import allTogether from './examples/battle/all-together';

// Avengers
import ironMan from './examples/avengers/iron-man';

// Question
import callGranny from './examples/question/call-granny';
import readMore from './examples/question/read-more';
import workHard from './examples/question/work-hard';

// Variables
import varExample from './examples/variables/example';

// Conditions
import condExample from './examples/conditions/example';

import sleep from './sleep';


import Tour from './codeplay-tour';

const $ = window.$;
const toastr = window.toastr;

const MINIMAL_LOADING_TIME = 500; // ms
const spinnerUrl = 'https://s3.amazonaws.com/alcourses.codeplay/common/spinner2.svg';
const solvedTasksKey = 'codeplaySolvedTasks';
const allTasksKey = 'codeplayAllTasks';

const configs = {
  car,
  easyLabyrinth,
  mediumLabyrinth,
  hardLabyrinth,
  oneArcher,
  oneWarrior,
  oneDragon,
  // allTogether,
  ironMan,
  callGranny,
  readMore,
  workHard,
  twoWarriors,

  varExample,

  condExample,
};

// Global field variable
let field;

// TODO think how to make it better
// and without global variables
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
      // Logger.debug(keysPressed);
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

  window.editor = editor;

  window.reset = function() {
    changeManageButtons({showStop: false, showRun: false});
    field.stopExecution(function () {
      initField();
      changeManageButtons({showStop: false, showRun: true});
    });
  };

  window.run = async function() {
    await Editor.reorderLines();
    changeManageButtons({showStop: true, showRun: false});
    showTerminalManagerLink();
    const code = editor.getValue();
    if (code) {
      try {
        const codeTree = Parser.parse(code);
        let iterationNr = 1;
        for (let iteration of conf.iterations) {
          initField();
          if (conf.iterations.length > 1) {
            toastr.success(`Running test interation No. ${iterationNr}`);
            iterationNr++;
          }

          await iteration.pre({field, state: field.state});

          await field.run(codeTree, {
            start(nr) {
              if (prevNr !== undefined) {
                Editor.highlightLine(prevNr, '');
              }
              prevNr = nr;
              Editor.highlightLine(nr, 'lightblue');
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
        Editor.highlightLine(prevNr, '');
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

  window.goToTheNextLesson = function () {
    let redirected = false;
    try {
      let allTasksStr = localStorage[allTasksKey];

      // Hack for the time being
      if (!allTasksStr) {
        allTasksStr = JSON.stringify([
          'ironMan',
          'easyLabyrinth',
          'mediumLabyrinth',
          'hardLabyrinth',
          // 'workHard',
          'oneWarrior',
          'oneArcher',
          'twoWarriors',
          'oneDragon',
          // 'readMore'
        ]);
        localStorage[allTasksKey] = allTasksStr;
      }
      let allTasks = JSON.parse(allTasksStr);
  
      let solvedStr = localStorage[solvedTasksKey] || '[]';
      let solved = JSON.parse(solvedStr);

      for (let task of allTasks) {
        if (!solved[task] && !redirected) {
          window.location.href = `lesson.html?config=${task}`;
          redirected = true;
        }
      }
    } finally {
      if (!redirected) {
        window.location.href = 'index.html';
      }
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
    let failUrl = GifUrls.getFailImg();
    toastr.error(`<img class="error-notification-img" src='${failUrl}'>
                  <div class="error-notification-text">${err}</div>`);
    // TODO uncomment later
    // alert('Unfortunately not all tests passed yet :( Please try again. '
    //       + err.toString());
  }

  function addLessonToLocalStorage(lessonName) {
    let solvedLessonsFromLocalStorage = localStorage.getItem(solvedTasksKey);
    let solvedLessons = {};
    try {
      solvedLessons = JSON.parse(solvedLessonsFromLocalStorage);
    } catch (e) {
      Logger.error(e);
    }
    if (!solvedLessons) {
      solvedLessons = {};
    }
    solvedLessons[lessonName] = true;
    localStorage.setItem(solvedTasksKey, JSON.stringify(solvedLessons));
  }
  
  async function success() {
    // toastr.success('Lesson completed! Well done! Saving your result... Please don\'t close the window');
    toastr.success('Well done!');
    // TODO uncomment
    addLessonToLocalStorage(configName);
    // await sleep(1000);
    // alert(nextPage);
    // window.location.href = nextPage;

    // I should AB test if gif or done img is better
    document.getElementById('success-modal-img').src = GifUrls.getSuccessImg();

    $('#success-modal').modal({
      escapeClose: false,
      clickClose: false,
      showClose: false
    });
  }
  
  function buildDocumentationView(conf) {
    let html = `
      <p class="doc doc-task-description">${conf.taskDescription}</p>
      <table id="doc-table">
        ${
          Object.keys(conf.methods).map(method =>
                                        '<tr><td class="doc doc-method-name notranslate">'
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
      // await GifUrls.preLoad();
      Logger.info('Image preloading finished');
      const loadingTime = Date.now() - loadingStartedTime;
      if (loadingTime < MINIMAL_LOADING_TIME) {
        await sleep(MINIMAL_LOADING_TIME - loadingTime);
      }
      hideOverlaySpinner();

      // Then we also preload gifs for fail cases in background
      GifUrls.preLoad();
    } catch (e) {
      toastr.error(e.toString());
      toastr.warning('Please check your internet connection.');
      throw e;
    }

  }

  async function updateLoadingProgress(target) {
    let prevVal = Number(document.getElementById('percentage-loaded').innerHTML) || 0;
    if (prevVal < target) {
      await sleep(10);
      document.getElementById('percentage-loaded').innerHTML = (prevVal + 1);
      await updateLoadingProgress(target);
    }
  }

  function getLoadingProgress(loaded, total) {
    return Math.round(loaded / total * 100);
  }

  async function preLoadImages(images) {
    let imagesLoadedCounter = 0;
    for (const imageKey in images) {
      const url = images[imageKey];
      Logger.info();
      Logger.info(`Image loading: ${imageKey}`);
      await preLoadImage(url);
      imagesLoadedCounter++;
      let loadingProgress = getLoadingProgress(imagesLoadedCounter, Object.keys(images).length);
      await updateLoadingProgress(loadingProgress);
      Logger.info(`Image loaded: ${imageKey}`);
    }
  }

  function preLoadImage(url) {
    return new Promise(function(resolve, reject) {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      // resolve();
      img.onerror = function () {
        reject(`Failed to load image: ${url}`);
      };
    });
  }

  // TODO - make it better
  function showOverlaySpinner() {
    changeVisibility('top-container', false);
    changeVisibility('bottom-container', false);
    changeVisibility('control-bar', false);
    changeVisibility('overlay', true);
  }

  function hideOverlaySpinner() {
    changeVisibility('top-container', true);
    changeVisibility('bottom-container', true);
    changeVisibility('control-bar', true);
    changeVisibility('overlay', false);
  }

  function changeVisibility(elemId, visible) {
    let elem = document.getElementById(elemId);
    if (visible) {
      elem.style.display = 'block';
    } else {
      elem.style.display = 'none';
    }
  }
});