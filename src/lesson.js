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
const configs = { car, easyLabyrinth, mediumLabyrinth, hardLabyrinth, easyBattle };

$( document ).ready(async function() {
  Logger.info('Page is loaded');
  let params = new URL(location.href).searchParams;
  let configName = params.get('config');
  let nextPage = params.get('nextPage');

  if (!configName) {
    alert('Bad config param!');
    throw 'Bad config';
  }

  let conf = configs[configName];

  // TODO add loader
  await preLoadImage('img/spinner2.svg');
  showOverlaySpinner();
  Logger.info('Image preloading started');
  await preLoadImages(conf.images);
  Logger.info('Image preloading finished');
  hideOverlaySpinner();

  const field = new Field(conf);
  field.init();

  const editor = Editor.setUp(conf);
  buildDocumentationView(conf);

  window.run = async function () {
    const code = editor.getValue();
    if (code) {
      const codeTree = Parser.parse(code);
      try {
        for (let iteration of conf.iterations) {
          await iteration.pre({field, state: field.state});
          // TODO thinks how to make it better
          await field.run(codeTree, {
            start(nr) {
              Editor.highlightLine(nr, 'lightblue');
            },
            stop(nr) {
              Editor.highlightLine(nr, 'white');
            }
          });
          await iteration.post({field, state: field.state});
        }
        // success();
      } catch (err) {
        Logger.error(err);
        fail(err);
        // TODO
        // location.reload();
        // Back to start state
        // TODO make it better
      }
    }
  };


  function fail(err) {
    alert('Unfortunately not all tests passed yet :( Please try again. '
          + err.toString());
  }
  
  function success() {
    alert('Lesson completed! Well done!');
    window.location.replace(nextPage);
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
});