// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo')

let lexer = moo.compile({
    comment: /\/\/.*?$/,
    space: {match: /\s+/, lineBreaks: true},
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    string: /["'](?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^\'\"\\])*["']/,
    // string:  /["'](?:\\["\\]|[^\n"\\])*["']/,
    identifier: /[a-zA-Z]+[a-zA-Z0-9\.]*/,
    keywords: ["(", ")", ";", "{", "}", ",", "=", "+", "-", ">", "<", "=="]
});

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "stmts$ebnf$1", "symbols": []},
    {"name": "stmts$ebnf$1$subexpression$1", "symbols": ["comment", "_"]},
    {"name": "stmts$ebnf$1", "symbols": ["stmts$ebnf$1", "stmts$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "stmts$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "stmts$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": ["comment", "_"]},
    {"name": "stmts$ebnf$2$subexpression$1$ebnf$1", "symbols": ["stmts$ebnf$2$subexpression$1$ebnf$1", "stmts$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "stmts$ebnf$2$subexpression$1", "symbols": ["stm", "_", "stmts$ebnf$2$subexpression$1$ebnf$1", "_"]},
    {"name": "stmts$ebnf$2", "symbols": ["stmts$ebnf$2$subexpression$1"]},
    {"name": "stmts$ebnf$2$subexpression$2$ebnf$1", "symbols": []},
    {"name": "stmts$ebnf$2$subexpression$2$ebnf$1$subexpression$1", "symbols": ["comment", "_"]},
    {"name": "stmts$ebnf$2$subexpression$2$ebnf$1", "symbols": ["stmts$ebnf$2$subexpression$2$ebnf$1", "stmts$ebnf$2$subexpression$2$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "stmts$ebnf$2$subexpression$2", "symbols": ["stm", "_", "stmts$ebnf$2$subexpression$2$ebnf$1", "_"]},
    {"name": "stmts$ebnf$2", "symbols": ["stmts$ebnf$2", "stmts$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "stmts", "symbols": ["_", "stmts$ebnf$1", "stmts$ebnf$2"], "postprocess":  
        function(data) {
          let res = data[2].map(function(el) {
            return el[0];
          });
        
          return res;
        }
        },
    {"name": "stm", "symbols": ["funCall"], "postprocess": id},
    {"name": "stm", "symbols": ["ifElseStm"], "postprocess": id},
    {"name": "stm", "symbols": ["whileStm"], "postprocess": id},
    {"name": "stm", "symbols": ["varDecl"], "postprocess": id},
    {"name": "stm", "symbols": ["varDeclEmpty"], "postprocess": id},
    {"name": "stm", "symbols": ["varAssign"], "postprocess": id},
    {"name": "expr", "symbols": ["value"], "postprocess": 
        function(data) {
          return {
            type: "exprVal",
            value: data[0],
          }
        }
          },
    {"name": "expr", "symbols": ["funCallExpr"], "postprocess": id},
    {"name": "expr", "symbols": ["varExpr"], "postprocess": id},
    {"name": "expr", "symbols": ["cmpExpr"], "postprocess": id},
    {"name": "expr", "symbols": ["expr", "_", {"literal":"+"}, "_", "expr"], "postprocess": 
        function(data) {
          return {
            type: "exprPlus",
            exprs: [
              data[0],
              data[4]
            ]
          }
        }
          },
    {"name": "expr", "symbols": ["expr", "_", {"literal":"-"}, "_", "expr"], "postprocess": 
        function(data) {
          return {
            type: "exprMinus",
            exprs: [
              data[0],
              data[4]
            ]
          }
        }
          },
    {"name": "funCall", "symbols": ["identifier", {"literal":"("}, "funArgs", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        function(data) {
          return {
            type: 'funCall',
            name: data[0],
            args: data[2],
            line: data[1].line
          };
        }
        },
    {"name": "funCallExpr", "symbols": ["identifier", {"literal":"("}, "funArgs", {"literal":")"}, "_"], "postprocess": 
        function(data) {
          return {
            type: 'funCallExpr',
            name: data[0],
            args: data[2],
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
        },
    {"name": "whileStm", "symbols": [{"literal":"while"}, "_", {"literal":"("}, "_", "expr", "_", {"literal":")"}, "_", "stmBlock"], "postprocess": 
        function(data) {
          let res = {
            type: 'whileStm',
            expr: data[4],
            stmts: data[8],
            line: data[0].line
          };
          return res;
        }
        },
    {"name": "varDecl", "symbols": [{"literal":"var"}, "_", "identifier", "_", {"literal":"="}, "_", "expr", {"literal":";"}], "postprocess": 
        function(data) {
          return {
            type: "varDecl",
            name: data[2],
            expr: data[6],
            line: data[0].line
          }
        }
        },
    {"name": "varDeclEmpty", "symbols": [{"literal":"var"}, "_", "identifier", {"literal":";"}], "postprocess": 
        function(data) {
          return {
            type: "varDeclEmpty",
            name: data[2],
            line: data[0].line
          }
        }
        },
    {"name": "varAssign", "symbols": ["identifier", "_", {"literal":"="}, "_", "expr", {"literal":";"}], "postprocess": 
        function(data) {
          return {
            type: "varAssign",
            name: data[0],
            expr: data[4],
            line: data[2].line,
          }
        }
        },
    {"name": "varExpr", "symbols": ["identifier"], "postprocess": 
        function(data) {
          return {
            type: "varExpr",
            name: data[0]
          }
        }
        },
    {"name": "cmpExpr", "symbols": ["eqExpr"], "postprocess": id},
    {"name": "cmpExpr", "symbols": ["gtExpr"], "postprocess": id},
    {"name": "cmpExpr", "symbols": ["ltExpr"], "postprocess": id},
    {"name": "eqExpr", "symbols": ["expr", "_", {"literal":"=="}, "_", "expr"], "postprocess": 
        function(data) {
          return {
            type: "eqExpr",
            exprs: [data[0], data[4]]
          }
        }
        },
    {"name": "gtExpr", "symbols": ["expr", "_", {"literal":">"}, "_", "expr"], "postprocess": 
        function(data) {
          return {
            type: "gtExpr",
            exprs: [data[0], data[4]]
          }
        }
        },
    {"name": "ltExpr", "symbols": ["expr", "_", {"literal":"<"}, "_", "expr"], "postprocess": 
        function(data) {
          return {
            type: "ltExpr",
            exprs: [data[0], data[4]]
          }
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
    {"name": "comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": function(d) { return null; }},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        function(d) {
          return d[0].value.replace(new RegExp("'", 'g'), "").replace(new RegExp("\"", 'g'), "")
        }
        },
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
