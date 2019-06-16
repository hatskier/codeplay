// TODO in future we could implement
// - logging levels
// - custom logging mechanisms (e.g. sending web requests for error level)

import Page from './page';


export default {
  /*eslint-disable */
  error: console.error,
  // info: function(...args) {
  //   console.log(...args);
  //   Page.addLog(...args);
  // },
  info: console.log,
  warn: console.warn,
  debug: console.log
  /*eslint-enable */
};
