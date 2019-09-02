const Grammar = require('../src/lang/simple-js-grammar');

const Nearley = require('nearley');

// import Logger from '../logger';


function parse(code) {
  // Create a Parser object from our grammar.
  const parser = new Nearley.Parser(Nearley.Grammar.fromCompiled(Grammar));

  // Parse something!
  parser.feed(code);

  // parser.results is an array of possible parsings.
  return parser.results; // [[[[ "foo" ],"\n" ]]]
}


let code =
`
  if (true) {
    foo();
    bar(1,2,3,4);
  } else {
    bas123();

  }

  // TODO comment

  while(true) {
    doSmthInWhile(4,5,6);
  }

  //First comment
  // Second comment
  // Thrird one

  car.go();

  // Last comment
`;

let codeTree = parse(code)[0];

console.log(JSON.stringify(codeTree, null, 2));