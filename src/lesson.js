import Field from './field';
import Editor from './editor';
import Parser from './lang/parser';
import Logger from './logger';
import GifUrls from './gifUrls';
import Page from './page';

// import $ from 'jquery';
// import Typed from 'typed.js';

import sleep from './sleep';

import Translation from './translation';

import Tour from './codeplay-tour';

import lessonConfigs from './lesson-configs';

const $ = window.$;
const toastr = window.toastr;
toastr.options = {
  closeButton: true,
  showDuration: 3000,
  hideDuration: 10,
  // positionClass: 'toast-top-center',
};

const MINIMAL_LOADING_TIME = 500; // ms
const FAILED_TIMES_TO_SHOW_SOLUTION = 3;
const spinnerUrl = 'https://codenplay.io/img/tasks/common/spinner2.svg';
const solvedTasksKey = 'codeplaySolvedTasks';
const allTasksKey = 'codeplayAllTasks';

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

function isMobile() {
  return window.screen.width < 1024;
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function getFailedTimeToShowSolution() {
  if (isMobile()) {
    return 0;
  } else {
    return FAILED_TIMES_TO_SHOW_SOLUTION;
  }
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

function adjustFieldScreenScaling(conf) {
  if (window.screen.width < (conf.size.width + 20)) {
    const scaling = window.screen.width / (conf.size.width + 50);
    console.log('Adjusting field screen size with scale: ' + scaling);
    document.getElementById('screen-view-container').style.transform = `scale(${scaling})`;
    document.getElementById('screen-view-container').style['margin-top'] = `-${(1 - scaling) * conf.size.height}px`;
    document.getElementById('screen-view-container').style['-webkit-transform-origin'] = 'left bottom';
    document.getElementById('screen-view-container').style['-moz-transform-origin'] = 'left bottom';
    // document.getElementById('screen-view').width = window.screen.width;
    // document.getElementById('screen-view').height = window.screen.width;
  }
}

async function showIterationNrMsg(nr) {
  // alert('Iteration: ' + nr);
  // toastr.success('Running test iteration nr: ' + nr);
  // let htmlWithMessageToAdd = `
  //   <div id="iteration"></div>
  // `;
  // $('#scre')
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
  let lang = getParam(paramsStr, 'lang');

  if (lang !== 'pl' && lang !== 'ru') {
    lang = 'en';
  }
  window.lang = lang;

  if (!configName) {
    alert('Bad config param!');
    throw 'Bad config';
  }

  let conf = lessonConfigs[configName];

  await assetsLoading();

  adjustFieldScreenScaling(conf);

  if (!isMobile()) {
    document.getElementById('window').classList.add('slide-down-el');
    document.getElementById('screen-view').classList.add('slide-left-el');
    document.getElementById('code-editor').classList.add('slide-right-el');

    // It is commented because tooltips stop working when it's enabled
    // document.getElementById('control-bar').classList.add('slide-left-el');
  }

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

  if (localStorage.savedCodeInEditor) {
    window.editor.setValue(localStorage.savedCodeInEditor);
    localStorage.removeItem('savedCodeInEditor');
  }

  if (lang !== 'en') {
    Translation.translatePage(lang);
  }

  window.reset = function() {
    changeManageButtons({showStop: false, showRun: false});
    field.stopExecution(function () {
      initField();
      changeManageButtons({showStop: false, showRun: true});
    });
  };

  window.solveTask = function() {
    if (conf.solutionCode) {
      editor.setValue(conf.solutionCode);
      window.toastr.success('Read the solution code! Try to understand it and then click the run button');
    }
  };

  window.gifUrls = GifUrls;

  window.run = async function() {
    toastr.success('Program started');
    scrollToTop();
    await Editor.reorderLines();
    changeManageButtons({showStop: true, showRun: false});
    showTerminalManagerLink();
    window.showLogsInTerminal();
    const code = editor.getValue();
    if (code) {
      try {
        const codeTree = Parser.parse(code);
        let iterationNr = 0;
        for (let iteration of conf.iterations) {
          initField();
          field.state.__iterationNr = iterationNr;
          if (conf.iterations.length > 1) {
            // toastr.success(`Running test interation No. ${iterationNr + 1}`);
            await showIterationNrMsg(++iterationNr);
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
        Page.setVariablesTableVisibility(false);
        window.hideLogsInTerminal();
        // To revert normal color fot the last code line
        Editor.highlightLine(prevNr, '');
      }
    }
  };

  // Deprecated
  // window.toggleSpeed = function() {
  //   if (!localStorage.programSpeed || localStorage.programSpeed == 'slow') {
  //     localStorage.programSpeed = 'normal';
  //   } else if (localStorage.programSpeed == 'normal') {
  //     localStorage.programSpeed = 'fast';
  //   } else {
  //     localStorage.programSpeed = 'slow';
  //   }

  //   field.setSpeed(localStorage.programSpeed);
  //   toastr.success('Speed set to: ' + localStorage.programSpeed);
  // };

  window.setSpeed = function(speed) {
    localStorage.programSpeed = speed;
    field.setSpeed(localStorage.programSpeed);
    toastr.success('Program execution speed set to: ' + localStorage.programSpeed);
  }

  window.startCodeplayTour = function() {
    Tour.start();
  };

  if (!localStorage.tourStarted && !isMobile()) {
    // This timeout added
    // because we should wait until initial animation is finished
    setTimeout(() => {
      localStorage.tourStarted = true;
      Tour.start();  
    }, 1510);
  }

  if (isMobile()) {
    window.solveTask();
  }

  if (!localStorage.mobileNotificationShowed && isMobile()) {
    localStorage.mobileNotificationShowed = true;
    alert('As you know programmers usually use computers to work,'
          + ' so we strongly recommend to check our website on'
          + ' desktop to have the best posssible experience :)');
  }

  function updateTerminalModeLinkText() {
    showTerminalManagerLink();
    const link = document.getElementById('terminal-manager-link');

    if ($('#logs').is(':visible')) {
      link.innerHTML = 'show less';
    } else {
      link.innerHTML = 'show more';
    }
  }

  window.toggleTerminalMode = function() {
    $('#logs').toggle(300, updateTerminalModeLinkText);
  };
  
  window.showLogsInTerminal = function() {
    $('#logs').show(300, updateTerminalModeLinkText);
  };
  
  window.hideLogsInTerminal = function() {
    $('#logs').hide(300, updateTerminalModeLinkText);
  }

  window.reloadWithLang = function(lang) {
    // localStorage.savedCodeInEditor = window.editor.getValue();
    // Rebuild url
    if (lang == window.lang) {
      return;
    }

    if (location.href.includes('lang=')) {
      location.href = location.href.replace(
        /lang=../g,
        `lang=${lang}`);
    } else {
      location.href += `&lang=${lang}`;
    }
  };

  window.goBack = function() {
    location.href = nextPage;
  };

  // window.goToTheNextLesson = function () {
  //   let redirected = false;
  //   try {
  //     let allTasksStr = localStorage[allTasksKey];

  //     // Hack for the time being
  //     if (!allTasksStr) {
  //       allTasksStr = JSON.stringify([
  //         'ironMan',
  //         'easyLabyrinth',
  //         'mediumLabyrinth',
  //         'hardLabyrinth',
  //         // 'workHard',
  //         'oneWarrior',
  //         'oneArcher',
  //         'twoWarriors',
  //         'oneDragon',
  //         // 'readMore'
  //       ]);
  //       localStorage[allTasksKey] = allTasksStr;
  //     }
  //     let allTasks = JSON.parse(allTasksStr);
  
  //     let solvedStr = localStorage[solvedTasksKey] || '[]';
  //     let solved = JSON.parse(solvedStr);

  //     for (let task of allTasks) {
  //       if (!solved[task] && !redirected) {
  //         window.location.href = `lesson.html?config=${task}`;
  //         redirected = true;
  //       }
  //     }
  //   } finally {
  //     if (!redirected) {
  //       window.location.href = 'index.html';
  //     }
  //   }
  // };

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

  function showSolution() {
    // if (snackBarConfirm('Do you want to see the solution code?')) {
    //   window.solveTask();
    //   window.toastr('Read the solution code! Try to understand it and then click the run button');
    // } else {
    //   // We set it to -2 so the user should fail 2 more times next time to see this question
    //   window.failedTimes = -2;
    // }
    let snackbarContainer = document.querySelector('#snackbar');
    let data = {
      message: 'Do you want to see the solution code?',
      timeout: 7000,
      actionHandler: function() {
        window.solveTask();
      },
      actionText: 'Yes'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

  // TODO Alex implement it better later
  // We replace screen and the revert it
  // async function showGifResult(gifUrl) {
    // let oldHtmlForScreen = $('#screen-view').html();
    // $('#screen-view').remove();
    // let htmlCode = `<img src=${gifUrl} id='screen-view' />`;
    // $('#screen-view-container').append(htmlCode);
    // document.getElementById('screen-view').append(htmlCode);
    // await sleep(3000);
    // $('#gif-result').remove();
    // $('#screen-view-container').append(oldHtmlForScreen);
    // document.getElementById('result-gif').style.display = 'block';
    // await sleep(3000);
    // document.getElementById('result-gif').style.display = 'none';
  // }

  function fail(err) {
    if (window.failedTimes) {
      window.failedTimes++;
    } else {
      window.failedTimes = 1;
    }

    if (window.failedTimes >= getFailedTimeToShowSolution()) {
      showSolution();
    }
    
    let failUrl = GifUrls.getFailImg();
    // Toastr message with fail gif
    toastr.error(`<img class="error-notification-img" src='${failUrl}'>
                  <div class="error-notification-text">${err}</div>`);
    // toastr.error(err);
    // showGifResult(failUrl);
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

    // This is important (it is saved in blockstack on the next page)
    localStorage.lastSolvedLessonCodenplay = lessonName;
    localStorage.gameTaskJustSolved = true;
  }
  
  async function success() {
    // toastr.success('Lesson completed! Well done! Saving your result... Please don\'t close the window');
    // toastr.success('Well done!');
    // TODO uncomment
    addLessonToLocalStorage(configName);
    // await sleep(1000);
    // alert(nextPage);
    // window.location.href = nextPage;

    // I should AB test if gif or done img is better
    // document.getElementById('success-modal-img').src = GifUrls.getSuccessImg();

    // $('#success-modal').modal({
    //   escapeClose: false,
    //   clickClose: false,
    //   showClose: false
    // });

    let successImgUrl = GifUrls.getSuccessImg();
    // toastr.success('Well done!');
    // toastr.options.positionClass = 'toast-top-right';
    toastr.success(`<img class="error-notification-img" src='${successImgUrl}'>
    <div class="error-notification-text">Well done! Saving your result...</div>`);
    // showGifResult(successImgUrl);
    await sleep(2500);

    // TODO uncomment for connecting to blockstack app
    window.location.href = nextPage;
  }

  function buildDocTable(conf) {
    // let docTable = Object.keys(conf.methods).map(method =>
    //   `<tr><td id="${method}" class="doc doc-method-name notranslate">`
    //   + method
      
    //   + '</td><td class="doc doc-method-description">'
    //   + conf.methods[method].doc
    //   + '</td>'
    //   // conf.docTableExtended ? 
    //   + '</tr>'
    //   )
    // .join('');

    let docTable = '';

    if (conf.docTableExtended) {
      let tableHeaders = `<tr>
        <th>Instruction</th>
        <th>Description</th>
        <th>Examples</th>
      </tr>`
      docTable += tableHeaders;
    }

    for (let method of Object.keys(conf.methods)) {
      docTable +=
        `<tr><td id="${method}" class="doc doc-method-name notranslate">${method}</td>`;

      if (conf.docTableExtended) {
        docTable +=
          `<td class="doc doc-method-description">${conf.methods[method].doc}</td>`;
        docTable +=
          `<td class="doc doc-method-examples">${conf.methods[method].examples || ''}</td>`
      }

      docTable += '</tr>';
    }

    return docTable;
  }
  
  function buildDocumentationView(conf) {
    let html = `
      <h6 class="notranslate"><span class="notranslate">Task</span>: ${configName}</h6>
      <p class="doc doc-task-description notranslate">${conf.taskDescription}</p>

      <h6 class="notranslate">Available instructions</h6>

      <table id="doc-table">
        ${buildDocTable(conf)}
      </table>

      <h6 class="notranslate">Please note</h6>
      <p class="notranslate">Each instruction should end with ();</p>
      <p class="notranslate">Green lines with // are ignored by the program executor (we call 'em comments)</p>
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

      Logger.debug(`Loading time: ${loadingTime}`);
      // if (loadingTime < MINIMAL_LOADING_TIME) {
      //   await sleep(MINIMAL_LOADING_TIME - loadingTime);
      // }
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
      await sleep(3);
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
    changeVisibility('code-editor', false);
    changeVisibility('main-page-button-container', false);
    changeVisibility('bottom-container', false);
    changeVisibility('control-bar', false);
    changeVisibility('overlay', true);
  }

  function hideOverlaySpinner() {
    changeVisibility('code-editor', true);
    changeVisibility('main-page-button-container', true);
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