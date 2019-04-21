import conf from './examples/car';
import Field from './field';
import Editor from './editor';
import Parser from './lang/parser';
// import Logger from './logger';


const field = new Field(conf);
field.init();

// Setting up the editor
const editor = Editor.setUp();

window.run = function () {
  const code = editor.getValue();
  if (code) {
    const codeTree = Parser.parse(code);
    field.run(codeTree);
  }
};