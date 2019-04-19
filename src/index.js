import conf from './examples/car';
import Field from './field';

console.warn(document.getElementById('logs'));
let field = new Field(conf);
field.init();