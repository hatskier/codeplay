// import * as monaco from 'monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export default {
  setUp(conf) { 
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems(model, position) {
        let suggestions = [];
        for (let method in conf.methods) {
          let insertText = method + '();';

          // HACK - Fix with autocomplete after "."
          let lineContent = model.getLineContent(position.lineNumber);
          let lineContentWithoutSpaces = lineContent.replace(/ /g, '');
          if (lineContentWithoutSpaces.includes('.')) {
            insertText = insertText.slice(lineContentWithoutSpaces.length - 1, insertText.length);
          }

          if (method.includes(lineContentWithoutSpaces)) {
            suggestions.push({
              label: method,
              detail: 'PRESS ENTER OR TAB ',
              preselect: 'asdas',
              kind: monaco.languages.CompletionItemKind.Method,
              documentation: conf.methods[method].doc,
              insertText, 
            });
          }

        }
        return {suggestions};
      },

    });

    return monaco.editor.create(document.getElementById('code-editor'), {
      value: conf.startCodeVal,
      language: 'javascript',
      theme: 'vs', // vs, vs-dark, hc-black
      scrollBeyondLastLine: false,
      scrollbar: {
        verticalScrollbarSize: 7,
      },
      fontSize: 18,
      contextmenu: false
    });
  },

  highlightLine(nr, color) {
    // const oldBg = document.getElementsByClassName('view-lines')[0].children[nr - 1].style.background;
    let lines = document.getElementsByClassName('view-lines')[0].children;
    if (lines.length >= nr) {
      lines[nr - 1].style.background = color;
    }
    // return oldBg;
  }
};