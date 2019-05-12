import Field from './field';
import Editor from './editor';
import Parser from './lang/parser';
import Logger from './logger';

import $ from 'jquery';

import car from './examples/car';
import easyLabyrinth from './examples/labyrinth/easy-labyrinth';
import mediumLabyrinth from './examples/labyrinth/medium-labyrinth';
import hardLabyrinth from './examples/labyrinth/hard-labyrinth';
import easyBattle from './examples/battle/easy-battle';
import onlyWarriorBattle from './examples/battle/battle-only-warrior';

const MINIMAL_LOADING_TIME = 500; // ms

const configs = { car, easyLabyrinth, mediumLabyrinth, hardLabyrinth, easyBattle, onlyWarriorBattle };


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
  field.setSpeed('fast');

  const editor = Editor.setUp(conf);
  buildDocumentationView(conf);

  window.run = async function () {
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
      }
    }
  };


  function fail(err) {
    // TODO uncomment later
    // alert('Unfortunately not all tests passed yet :( Please try again. '
    //       + err.toString());
  }
  
  function success() {
    alert('Lesson completed! Well done!');
    // TODO uncomment
    // window.location.replace(nextPage);
  }
  
  function buildDocumentationView(conf) {
    let html = `
      <h6>${conf.taskDescription}</h6>
      <table id="doc-table">
        ${
          Object.keys(conf.methods).map(method =>
                                        '<tr><td class="doc-method-name">'
                                        + method
                                        + '</td><td>'
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