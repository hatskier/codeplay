// import * as monaco from 'monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

// TODO example should be defined in task configuration
const exampleValue = [
  'if (true) {',
  '\tcar.go();',
  '}',
  'car.go();'
].join('\n');

export default {
  setUp: function(conf) { 
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems() {
        let suggestions = [];
        for (let method in conf.methods) {
          suggestions.push({
            label: method,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: conf.methods[method].doc,
            insertText: method + '();'
          });
        }
        return {suggestions};
      }
    });

    return monaco.editor.create(document.getElementById('code-editor'), {
      value: exampleValue,
      language: 'javascript',
      theme: 'vs', // vs, vs-dark, hc-black
      scrollBeyondLastLine: false,
      scrollbar: {
        verticalScrollbarSize: 7,
      },
      fontSize: 18,
      contextmenu: false
    });
  }
};