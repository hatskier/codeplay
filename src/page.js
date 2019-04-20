import $ from 'jquery';
import Logger from './logger';

let Page = {};

let elemSelector = '#screen-view';
let fieldSize;
// let htmlImages = {};

Page.initEmptyScreen = function(bg, size) {
  Logger.info(`Setting bg to url: ${bg}`);
  $(elemSelector).css('background-image', `url('${bg}')`);
  $(elemSelector).css('background-size', `${size.width}px ${size.height}px`);


  Logger.info(`Setting screen size: ${JSON.stringify(size)}`);
  $(elemSelector).css('width', size.width + 'px');
  $(elemSelector).css('height', size.height + 'px');

  fieldSize = size;
};

Page.addObject = function(object) {
  function buildImageHtml(obj) {
    let html = `<img
      id='${obj.id}'
      src='${obj.img}'
      height='${obj.size.height}px'
      width='${obj.size.width}px'>`;
    return html;
  }

  Logger.info(`Adding object to field: ${object.id}`);
  $(elemSelector).append(buildImageHtml(object));
  const pxCoord = getPxCoords(object.pos);
  $('#' + object.id).css({
    'position': 'absolute',
    'top': `${pxCoord.x}px`,
    'left': `${pxCoord.y}px`
  });
};

Page.addLog = function(msg) {
  $('#logs').html(msg + '<br /><hr>' + $('#logs').html());
}

Page.changeObjectPos = function(id, pos) {
  return new Promise(function (resolve) {
    const pxCoord = getPxCoords(pos);
    $('#' + id).animate({
      'top': `${pxCoord.x}px`,
      'left': `${pxCoord.y}px`
    }, 1000, function () {
      resolve();
    });
  });
};

// TODO make this function smarter
function getPxCoords(pos) {
  return {
    x: fieldSize.width * pos.x / 100,
    y: fieldSize.height * pos.y / 100
  };
}

export default Page;