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

  if (x >   y) {
    great();
  }

  if (343  < 43) {
    hmm();
  } else {
    yo();
  }

  if (x == 23) {
    yohoho();
  }

  if (y > 3) {
    yGt3();
  }

  // TODO comment

  // while(true) {
    // doSmthInWhile(4,5,6);
  // }

  //First comment
  // Second comment
  // Thrird one

  // car.go();

  // Last comment

  // var x = 123;

  // var y;

  // x = go(length - 1);
`;

let codeTree = parse(code)[0];

console.log(JSON.stringify(codeTree, null, 2));

console.log("----------------------------------------------------------------------------");
let code2 = `
function foo (a,b,c, ddd)  {
    console.log('asd');
}

function bar (firstArg) {
    console.log(123 + 321);
}


function foo (){
    console.log(variableArg);
}
`;
console.log(JSON.stringify(parse(code2)[0], null, 2));