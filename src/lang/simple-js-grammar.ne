@{%

const moo = require('moo')

let lexer = moo.compile({
    comment: /\/\/.*?$/,
    space: {match: /\s+/, lineBreaks: true},
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    identifier: /[a-zA-Z]+[a-zA-Z0-9\.]*/,
    keywords: ["(", ")", ";", "{", "}", ",", "=", "+", ">", "<", "=="]
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
  | varDecl {% id %}
  | varDeclEmpty {% id %}
  | varAssign {% id %}

expr ->
  value {%
    function(data) {
      return {
        type: "exprVal",
        value: data[0],
      }
    }
  %}
  | funCallExpr {% id %}
  | varExpr {% id %}
  | cmpExpr {% id %}
  | expr _ "+" _ expr {%
    function(data) {
      return {
        type: "exprPlus",
        exprs: [
          data[0],
          data[4]
        ]
      }
    }
  %}

# funCall and funCallExpr could be refactored
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

funCallExpr -> identifier "(" funArgs ")" _ {%
  function(data) {
    return {
      type: 'funCallExpr',
      name: data[0],
      args: data[2],
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
      ifStmts: data[8],
      line: data[0].line
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
      stmts: data[8],
      line: data[0].line
    };
    return res;
  }
%}

# varDecl and varAssign could be refactored
varDecl -> "var" _ identifier _ "=" _ expr ";" {%
  function(data) {
    return {
      type: "varDecl",
      name: data[2],
      expr: data[6],
      line: data[0].line
    }
  }
%}

varDeclEmpty -> "var" _ identifier ";" {%
  function(data) {
    return {
      type: "varDeclEmpty",
      name: data[2],
      line: data[0].line
    }
  }
%}

varAssign -> identifier _ "=" _ expr ";" {%
  function(data) {
    return {
      type: "varAssign",
      name: data[0],
      expr: data[4],
      line: data[2].line,
    }
  }
%}

varExpr -> identifier {%
  function(data) {
    return {
      type: "varExpr",
      name: data[0]
    }
  }
%}

cmpExpr ->
      eqExpr {% id %}
    | gtExpr {% id %}
    | ltExpr {% id %}

eqExpr -> expr _ "==" _ expr {%
  function(data) {
    return {
      type: "eqExpr",
      exprs: [data[0], data[4]]
    }
  }
%}

gtExpr -> expr _ ">" _ expr {%
  function(data) {
    return {
      type: "gtExpr",
      exprs: [data[0], data[4]]
    }
  }
%}

ltExpr -> expr _ "<" _ expr {%
  function(data) {
    return {
      type: "ltExpr",
      exprs: [data[0], data[4]]
    }
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
