import Nearley from 'nearley';
import Grammar from './simple-js-grammar';
// import Logger from '../logger';


export default {
  parse(code) {
    const parser = new Nearley.Parser(Nearley.Grammar.fromCompiled(Grammar));
    parser.feed(code);
    return parser.results;
  }
};