@{%

const moo = require('moo')

let lexer = moo.compile({
    comment: /\/\/.*?$/,
    space: {match: /\s+/, lineBreaks: true},
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    identifier: /[a-zA-Z]+[a-zA-Z0-9\.]*/,
    keywords: ["(", ")", ";", "{", "}", ","]
});

%}

@lexer lexer

# This dirty hacks are used to ignore comments on grammar level
stmts -> _ (comment _):* (stm _ (comment _):* _):+ {% 
  function(data) {
    let res = data[2].map(function(el) {
      return el[0];
    });

    return res;
  }
%}

stm ->
    funCall {% id %}
  | ifElseStm {% id %}
  | whileStm {% id %}

expr -> value {% id %}

# TODO in future not only funCall will have location linked
funCall -> identifier "(" funArgs ")" _ ";" {%
  function(data) {
    return {
      type: 'funCall',
      name: data[0],
      args: data[2],
      line: data[1].line
    };
  }
%}

funArgs ->
    _ {% id %}
  | _ expr ("," _ expr):* {%
    function(data) {
      return [data[1]].concat(data[2].map(el => el[2]))
    }
  %}

ifElseStm -> "if" _ "(" _ expr _ ")" _ stmBlock (_ "else" _ "{" stmts "}"):? {%
  function(data) {
    let res = {
      type: 'ifElseStm',
      expr: data[4],
      ifStmts: data[8]
    };
    if (data[9]) {
      res.elseStmts = data[9][4];
    } else {
      res.elseStmts = [];
    }
    return res;
  }
%}

whileStm -> "while" _ "(" _ expr _ ")" _ stmBlock {%
  function(data) {
    let res = {
      type: 'whileStm',
      expr: data[4],
      stmts: data[8]
    };
    return res;
  }
%}

stmBlock -> "{" stmts "}" {%
  function(data) {
    return data[1];
  }
%}

value ->
      number {% id %}
    | string {% id %}
    | "true" {% function(d) { return true; } %}
    | "false" {% function(d) { return false; } %}
    | "null" {% function(d) { return null; } %}

number -> %number {% function(d) { return parseFloat(d[0].value) } %}

identifier -> %identifier {% function(d) { return d[0].value } %}

comment ->  %comment {% function(d) { return null; } %}

string -> %string {% function(d) { return JSON.parse(d[0].value) } %}

_ -> null | %space {% function(d) { return null; } %}
