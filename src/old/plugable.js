// DEPRECATED

import Field from './field';
import Editor from './editor';
import Parser from './lang/parser';
import HtmlComponents from './html-components';

// import conf from './examples/labyrinth';
// import conf from './examples/man';
// import conf from './examples/rocket';
import conf from './examples/car';
// import Logger from './logger';

import $ from 'jquery';

window.initCodePlay = function(elemSelector) {
  $(elemSelector).html(HtmlComponents.externalLinks + HtmlComponents.style + HtmlComponents.contentHtml);
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
};


