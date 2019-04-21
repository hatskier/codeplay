// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo')

let lexer = moo.compile({
    space: {match: /\s+/, lineBreaks: true},
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    identifier: /[a-zA-Z]+[a-zA-Z0-9\.]*/,
    keywords: ["(", ")", ";", "{", "}", ","]
})

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "stmts$ebnf$1$subexpression$1", "symbols": ["stm", "_"]},
    {"name": "stmts$ebnf$1", "symbols": ["stmts$ebnf$1$subexpression$1"]},
    {"name": "stmts$ebnf$1$subexpression$2", "symbols": ["stm", "_"]},
    {"name": "stmts$ebnf$1", "symbols": ["stmts$ebnf$1", "stmts$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "stmts", "symbols": ["_", "stmts$ebnf$1"], "postprocess":  
        function(data) {
          let res = data[1].map(function(el) {
            return el[0];
          });
        
          return res;
        }
        },
    {"name": "stm", "symbols": ["funCall"], "postprocess": id},
    {"name": "stm", "symbols": ["ifElseStm"], "postprocess": id},
    {"name": "stm", "symbols": ["whileStm"], "postprocess": id},
    {"name": "expr", "symbols": ["value"], "postprocess": id},
    {"name": "funCall", "symbols": ["identifier", {"literal":"("}, "funArgs", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        function(data) {
          return {
            type: 'funCall',
            name: data[0],
            args: data[2]
          };
        }
        },
    {"name": "funArgs", "symbols": ["_"], "postprocess": id},
    {"name": "funArgs$ebnf$1", "symbols": []},
    {"name": "funArgs$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "expr"]},
    {"name": "funArgs$ebnf$1", "symbols": ["funArgs$ebnf$1", "funArgs$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "funArgs", "symbols": ["_", "expr", "funArgs$ebnf$1"], "postprocess": 
        function(data) {
          return [data[1]].concat(data[2].map(el => el[2]))
        }
          },
    {"name": "ifElseStm$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"else"}, "_", {"literal":"{"}, "stmts", {"literal":"}"}]},
    {"name": "ifElseStm$ebnf$1", "symbols": ["ifElseStm$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ifElseStm$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ifElseStm", "symbols": [{"literal":"if"}, "_", {"literal":"("}, "_", "expr", "_", {"literal":")"}, "_", "stmBlock", "ifElseStm$ebnf$1"], "postprocess": 
        function(data) {
          let res = {
            type: 'ifStm',
            expr: data[4],
            ifStmts: data[8]
          };
          if (data[9]) {
            res.elseStmts = data[9][4];
          }
          return res;
        }
        },
    {"name": "whileStm", "symbols": [{"literal":"while"}, "_", {"literal":"("}, "_", "expr", "_", {"literal":")"}, "_", "stmBlock"], "postprocess": 
        function(data) {
          let res = {
            type: 'whileStm',
            expr: data[4],
            stmts: data[8]
          };
          return res;
        }
        },
    {"name": "stmBlock", "symbols": [{"literal":"{"}, "stmts", {"literal":"}"}], "postprocess": 
        function(data) {
          return data[1];
        }
        },
    {"name": "value", "symbols": ["number"], "postprocess": id},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": [{"literal":"true"}], "postprocess": function(d) { return true; }},
    {"name": "value", "symbols": [{"literal":"false"}], "postprocess": function(d) { return false; }},
    {"name": "value", "symbols": [{"literal":"null"}], "postprocess": function(d) { return null; }},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": function(d) { return parseFloat(d[0].value) }},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": function(d) { return d[0].value }},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": function(d) { return JSON.parse(d[0].value) }},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": function(d) { return null; }}
]
  , ParserStart: "stmts"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
