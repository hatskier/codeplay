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
  const pxCoord = getPxCoords(object.pos, object.size);
  $('#' + object.id).css({
    'position': 'absolute',
    'left': `${pxCoord.x}px`,
    'top': `${pxCoord.y}px`
  });
};

Page.addLog = function(msg) {
  $('#logs').html(msg + '<br /><hr>' + $('#logs').html());
}

Page.changeObjectPos = function(id, pos, size) {
  return new Promise(function (resolve) {
    const pxCoord = getPxCoords(pos, size);
    $('#' + id).animate({
      'left': `${pxCoord.x}px`,
      'top': `${pxCoord.y}px`
    }, 1000, function () {
      resolve();
    });
  });
};

function getPxCoords(pos, size) {
  let coords = {
    x: Math.round((fieldSize.width - size.width) * pos.x / 100),
    y: Math.round((fieldSize.height - size.height) * pos.y / 100)
  };
  // Logger.info(JSON.stringify(coords));
  // Logger.info(JSON.stringify(size));
  return coords;
}

export default Page;