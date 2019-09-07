// TODO remove this file

import conf from './examples/car';
import Field from './field';
import Editor from './editor';
import Parser from './lang/parser';
// import Logger from './logger';

import $ from 'jquery';


const field = new Field(conf);
field.init();

// Setting up the editor
const editor = Editor.setUp(conf);

buildDocumentationView(conf);

window.run = function () {
  const code = editor.getValue();
  if (code) {
    const codeTree = Parser.parse(code);
    field.run(codeTree);
  }
};

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