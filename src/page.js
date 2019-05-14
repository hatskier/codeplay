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

Page.clearAll = function() {
  $(elemSelector).empty();
};

// TODO check if this function works correctly
Page.containsObject = function(object) {
  return $('#' + object.id).length > 0;
}

Page.addObject = function(object) {
  function buildImageHtml(obj) {
    let html = `<img
      id='${obj.id}'
      src='${obj.img.src}'>`;
    return html;
  }

  if (!Page.containsObject(object)) {
    Logger.info(`Adding object to field: ${object.id}`);
    let html = object.html;
    if (object.kind == 'img') {
      html = buildImageHtml(object);
    }
    $(elemSelector).append(html);
    const pxCoord = getPxCoords(object);
    $('#' + object.id).css({
      'position': 'absolute',
      'left': `${pxCoord.x}px`,
      'top': `${pxCoord.y}px`,
      'height': `${object.size.height}px`,
      'width': `${object.size.width}px`
    });
  }
};

Page.removeObject = function(id) {
  $('#' + id).remove();
}

Page.addLog = function(msg) {
  $('#logs').html(msg + '<br /><hr>' + $('#logs').html());
};

Page.changeObjectImg = function(id, url) {
  return $('#' + id).attr('src', url);
};

Page.changeObjectPos = function(object, duration) {
  return new Promise(function (resolve) {
    const pxCoord = getPxCoords(object);
    $('#' + object.id).animate({
      'left': `${pxCoord.x}px`,
      'top': `${pxCoord.y}px`
    }, duration, resolve);
  });
};

Page.changeObjectRotation = function(id, degrees, duration) {
  return new Promise(function(resolve) {
    $({deg: degrees.old}).animate({deg: degrees.new}, {
      duration,
      step: function(now) {
        $('#' + id).css({
          transform: 'rotate(' + now + 'deg)'
        });
      },
      complete: resolve
    });
  });
};

function getPxCoords(object) {
  // if (object.kind == 'html') {
    return {
      x: Math.round(fieldSize.width * object.pos.x / 100),
      y: Math.round(fieldSize.height * object.pos.y / 100)
    };
  // }
  // let coords = {
  //   x: Math.round((fieldSize.width - object.size.width) * object.pos.x / 100),
  //   y: Math.round((fieldSize.height - object.size.height) * object.pos.y / 100)
  // };
  // // Logger.info(JSON.stringify(coords));
  // // Logger.info(JSON.stringify(size));
  // return coords;
}

export default Page;