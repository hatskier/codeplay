// TODO
  // - stepsArgumentSupported
  // - many iterations
  // - funResults

const defaultSize = 50;

const size = {
  width: 550,
  height: 450,
};

function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function executingError(context, msg) {
  context.field.log(`Ошибка: ${msg}. Поправь код и попробуй снова ;)`, { error: true });
  throw new Error(msg);
}

function taskFinished(pathFromConf, path) {
  let len1 = pathFromConf.length, len2 = path.length;
  return pathFromConf && path && len1 == len2 &&
  (pathFromConf[len1 - 1].length - path[len2 - 1].length) <= 1 && // hack for counterintuitive last move
  (pathFromConf[len1 - 1].length - path[len2 - 1].length) >= 0;
}

function prepareLabyrinth({ iterations, stepsArgumentSupported, startCodeVal, solutionCode }) {
  // TODO fix it later for multiple iterations
  const { path, stepWidth, funResults } = iterations[0];

  // TODO
  // - stepsArgumentSupported
  // - many iterations
  // - funResults

  const startPos = {
    x: 0,
    y: 5
  };
  
  let conf = {
    images: {
      'skale': 'https://codenplay.io/img/tasks/labyrinth/skale.jpg',
      // 'man-static': 'https://codenplay.io/img/tasks/example-labyrinth/man-static.png',
      // 'man-going-left': 'https://codenplay.io/img/tasks/labyrinth/man-with-stick-going-left.gif',
      // 'man-going-right': 'https://codenplay.io/img/tasks/labyrinth/man-with-stick.gif'
      'man-static': 'https://codenplay.io/img/tasks/labyrinth/caveman-waiting.png',
      'man-going-left': 'https://codenplay.io/img/tasks/labyrinth/caveman-going-left.gif',
      'man-going-right': 'https://codenplay.io/img/tasks/labyrinth/caveman-going-right.gif',
    },

    size,

    bg: 'skale',
  
    objects: [
      {
        kind: 'img',
        id: 'Man',
        // img: 'https://codenplay.io/img/tasks/labyrinth/man-with-stick.gif',
        imgKey: 'man-static',
        size: {
          width: defaultSize,
          height: defaultSize
        },
        startPos,
      }
    ],

    docTableExtended: true,
  
    taskDescription: 'Помоги пещерному человеку пройти лабиринт'
  }

  function drawLabyrinth() {
    let htmlObjects = [];
    const stepSizePx = size.width * (stepWidth / 100);
    let curPos = copyObject(startPos);
    for (let step of path) {
      for (let i = 0; i < step.length; i++) {
        let newHtmlObject = {
          kind: 'html',
          html: '<div id="___ID___" style="background: cornsilk; border: 1px solid orange;"></div>',
        };
  
        newHtmlObject.size = {
          width: (step.direction == 'left' || step.direction == 'right') ? stepSizePx : defaultSize,
          height: (step.direction == 'up' || step.direction == 'down') ? stepSizePx : defaultSize,
        };
  
        newHtmlObject.startPos = copyObject(curPos);

        // small hack for left direction
        if (step.direction == 'left') {
          newHtmlObject.startPos.x -= (stepWidth - ((defaultSize / size.width) * 100));
        }

        // Hack to shift labyrinth to one block right
        // newHtmlObject.startPos.x += stepWidth;
  
        htmlObjects.push(newHtmlObject);
  
        // New position evaluating
        switch (step.direction) {
          case 'left': {
            curPos.x -= stepWidth;
            break;
          }
          case 'right': {
            curPos.x += stepWidth;
            break;
          }
          case 'up': {
            curPos.y -= stepWidth;
            break;
          }
          case 'down': {
            curPos.y += stepWidth;
            break;
          }
          default: {
            throw new Error('Неизвестное направление: ' + step.direction);
          }
        }
      }
    }
    conf.objects = htmlObjects.concat(conf.objects);
  }
  
  function movingMethod(doc, dx, dy, direction, examples) {
    return {
      doc,
      examples,
      async run(context, params) {
        function validateParams(params) {
          if (params && params.length > 1) {
            throw new Error('Слишком много аргументов');
          }
        }

        let stepsAmount = 1;
        if (params.length > 0) {
          stepsAmount = params[0];
        }
        context.field.log(`Человек делает шагов: ${stepsAmount} в направлении: ${direction}...`);

        async function runStep() {
          if (direction == 'left') {
            await context.field.changeImage('Man', 'man-going-left');
          } else {
            await context.field.changeImage('Man', 'man-going-right');
          }
          
          
          // Moving on field
          await context.field.safeMove('Man', {
            x: dx,
            y: dy
          });
  
          if (context.state.path) {
            let lastStep = context.state.path[context.state.path.length - 1];
            if (lastStep.direction == direction) {
              lastStep.length++;
            } else {
              context.state.path.push({
                direction,
                length: 1
              })
            }
          } else {
            context.state.path = [{direction, length: 1}];
          }
          
          // Validating
          let len = context.state.path.length;
          let lastStep = context.state.path[len - 1];
          if (lastStep.direction !== path[len - 1].direction || lastStep.length > path[len - 1].length) {
            executingError(context, 'Ошибочка - туда идти нельзя');
          }
          if (len > 1) {
            let preLastStep = context.state.path[len - 2];
            if (preLastStep.length !== path[len - 2].length) {
              executingError(context, 'Ошибочка - туда идти нельзя');
            }
          }
        }

        validateParams(params);
        if (params && params.length == 1) {
          for (let i = 0; i < stepsAmount; i++) {
            await runStep();
          }
        } else {
          await runStep();
        }
        
      }
    };
  }

  drawLabyrinth();

  conf.methods = {
    'man.moveRight': movingMethod('Человек идет вправо', stepWidth, 0, 'right', 'man.moveRight();'),
    'man.moveLeft': movingMethod('Человек идет влево', -stepWidth, 0, 'left', 'man.moveLeft();'),
    'man.moveUp': movingMethod('Человек идет вверх', 0, -stepWidth, 'up', 'man.moveUp();'),
    'man.moveDown': movingMethod('Человек идет вниз', 0, stepWidth, 'down', 'man.moveDown();')
  };

  conf.iterations = [
    {
      pre: async function(context) {
        await context.field.changeImage('Man', 'man-going-left');
        // context.state.path = [];
      },
      post: async function(context) {
        await context.field.changeImage('Man', 'man-static');
        if (!taskFinished(path, context.state.path)) {
          executingError(context, 'Нужно выйти из лабиринта');
        }
      }
    }
  ];

  conf.tickHooks = {
    pre: async function() {
    },
    post: async function() {
    }
  }

  conf.startCodeVal = startCodeVal;
  conf.solutionCode = solutionCode;

  return conf;
}

export default prepareLabyrinth;
