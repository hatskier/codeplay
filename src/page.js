import $ from 'jquery';
import Logger from './logger';

let Page = {};

let elemSelector = '#screen-view';
let htmlImages = {};

// TODO test
Page.initEmptyScreen = function(bg, size) {
  Logger.info(`Setting bg to url: ${bg}`);
  $(elemSelector).css('background-image', `url('${bg}')`);
  $(elemSelector).css('background-size', `${size.width} ${size.height}`);


  Logger.info(`Setting screen size: ${JSON.stringify(size)}`);
  $(elemSelector).css('width', size.width);
  $(elemSelector).css('height', size.height);
};

// TODO add position setting
Page.addObject = function(object) {
  function buildImageHtml(obj) {
    let html = `<img
      id='${obj.id}'
      src='${obj.img}'
      height='${obj.size.height}
      width='${obj.size.width}
    '>`
    Logger.info(`Built html for object: ${html}`);
    return html;
  }

  Logger.info(`Adding object to field: ${object.id}`);
  $(elemSelector).append(buildImageHtml(object));
};

Page.addLog = function(msg) {
  $('#logs').html(msg + '<br /><hr>' + $('#logs').html());
}

// TODO
Page.changeObjectPos = async function(id, pos) {
  // $('#' + id).css();
};



export default Page;