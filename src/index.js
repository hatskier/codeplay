import conf from './examples/car';
import Field from './field';
import $ from 'jquery';
import editor from './editor';
import Parser from './lang/parser';


let field = new Field(conf);
field.init();

window.run = function () {
	const code = $('#code-editor').val();
  if (code) {
    const codeTree = code.split('\n');
    field.run(codeTree);
  }
};

// Setting up the editor
editor.setUp();

Parser.test();