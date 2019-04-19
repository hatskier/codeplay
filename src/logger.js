// TODO in future we could implement
// - logging levels
// - custom logging mechanisms (e.g. sending web requests for error level)
import Page from './page';

export default {
  error: console.error,
  info: function(...args) {
    console.log(...args);
    Page.addLog(...args);
  },
  warn: console.warn
};