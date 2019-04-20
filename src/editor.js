// import * as monaco from 'monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export default {
  setUp: function() { 
    monaco.editor.create(document.getElementById('code-editor'), {
      value: [
        'function x() {',
        '\tconsole.log("Hello world!");',
        '}'
      ].join('\n'),
      language: 'javascript',
      scrollBeyondLastLine: false,
      scrollbar: {
        verticalScrollbarSize: 7,
      },
      fontSize: 18
    });
  }
};