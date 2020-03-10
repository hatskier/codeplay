const defaultSize = 50;

const size = {
  width: 550,
  height: 450,
};

const startPos = {
  x: 0,
  y: 5
};

function copyObject(obj) {
  return { ...obj };
}

function getManObject() {
  return {
    kind: 'img',
    id: 'Man',
    imgKey: 'man-static',
    size: {
      width: defaultSize,
      height: defaultSize
    },
    startPos,
  };
}

function calculateStepWidth(path) {
  let stepsInWidth = 0;
  for (const { direction, length } of path) {
    if (direction == 'left') {
      stepsInWidth -= length;
    }
    if (direction == 'right') {
      stepsInWidth += length;
    }
  }
  const singleBorderWidth = 1 / 20; // %
  let bordersWidth = singleBorderWidth * (stepsInWidth + 2); // %

  // Hacks for special configurations
  if (stepsInWidth == 5) {
    bordersWidth -= 0.1;
  }
  if (stepsInWidth == 6) {
    bordersWidth -= 0.2;
  }
  if (stepsInWidth == 7) {
    bordersWidth -= 0.2;
  }
  if (stepsInWidth == 8) {
    bordersWidth -= 0.2;
  }
  if (stepsInWidth == 9) {
    bordersWidth -= 0.3;
  }

  return (100 - bordersWidth) / stepsInWidth; // %
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

// Returns list of objects to add
// This function also adds caveman to the initial position
function drawLabyrinth({ path, stepWidth }) {
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

      htmlObjects.push(newHtmlObject);

      // New position evaluation
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

  htmlObjects.push(getManObject());

  return htmlObjects;
}

function clearLabyrinth(context) {
  context.field.removeObjects({
    filter: obj => obj.id != 'test-notification-nr',
  });
}

function prepareIterations(iterations) {
  return iterations.map(iteration => {
    const { path, funResults } = iteration;

    const stepWidth = calculateStepWidth(path);

    return {
      async pre(context) {
        // Setting up new path and new funResults
        context.state.correctPath = path;
        context.state.stepWidth = stepWidth;
        context.state.funResults = funResults;

        // Clear labyrinth
        clearLabyrinth(context);

        // Redraw labyrinth
        const newObjects = drawLabyrinth({ path, stepWidth });
        for (const newObject of newObjects) {
          context.field.addObject(newObject);
        }
      },
      async post(context) {
        // Validate completion
        await context.field.changeImage('Man', 'man-static');
        if (!taskFinished(path, context.state.path)) {
          executingError(context, 'Нужно выйти из лабиринта');
        }
        // Clear state
        context.state.path = []
      },
    }
  });
}

function prepareLabyrinth({ iterations, stepsArgumentSupported, startCodeVal, solutionCode, codeFontSize }) {  
  let conf = {
    images: {
      'skale': 'https://codenplay.io/img/tasks/labyrinth/skale.jpg',
      'man-static': 'https://codenplay.io/img/tasks/labyrinth/caveman-waiting.png',
      'man-going-left': 'https://codenplay.io/img/tasks/labyrinth/caveman-going-left.gif',
      'man-going-right': 'https://codenplay.io/img/tasks/labyrinth/caveman-going-right.gif',
    },
    size,
    bg: 'skale',
    objects: [],
    docTableExtended: true,
    taskDescription: 'Помоги пещерному человеку пройти лабиринт',
    codeFontSize,
    startCodeVal,
    solutionCode,
    tickHooks: {
      async pre() {},
      async post() {},
    },
  };

  conf.objects = conf.objects.concat(drawLabyrinth({
    path: iterations[0].path,
    stepWidth: calculateStepWidth(iterations[0].path),
  }));
  
  function movingMethod(doc, dxCoef, dyCoef, direction, examples) {
    return {
      doc,
      examples,
      async run(context, params) {
        function validateParams(params) {
          if (params && params.length > 1) {
            throw new Error('Слишком много аргументов');
          }
          if (params && params.length == 1 && !stepsArgumentSupported) {
            throw new Error('Эти инструкции не принимают аргументы');
          }
        }

        let stepsAmount = 1;
        if (stepsArgumentSupported) {
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
            x: dxCoef * context.state.stepWidth,
            y: dyCoef * context.state.stepWidth,
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
            context.state.path = [{ direction, length: 1 }];
          }
          
          // Validating
          let len = context.state.path.length;
          let lastStep = context.state.path[len - 1];
          if (lastStep.direction !== context.state.correctPath[len - 1].direction
              || lastStep.length > context.state.correctPath[len - 1].length) {
            executingError(context, 'Хмм, в ту сторону идти нельзя');
          }
          if (len > 1) {
            let preLastStep = context.state.path[len - 2];
            if (preLastStep.length !== context.state.correctPath[len - 2].length) {
              executingError(context, 'Хмм, в ту сторону идти нельзя');
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

  let docs = {
    right: {
      examples: 'man.moveRight();',
      text: 'Человек идет вправо. Эта инструкция не принимает аргументы',
    },
    left: {
      examples: 'man.moveLeft();',
      text: 'Человек идет влево. Эта инструкция не принимает аргументы',
    },
    up: {
      examples: 'man.moveUp();',
      text: 'Человек идет вверх. Эта инструкция не принимает аргументы',
    },
    down: {
      examples: 'man.moveDown();',
      text: 'Человек идет вниз. Эта инструкция не принимает аргументы',
    },
  };

  if (stepsArgumentSupported) {
    docs = {
      right: {
        examples: 'man.moveRight(1); <br /> man.moveRight(3);',
        text: 'Человек идет вправо. Эта инструкция принимает количество шагов как аргумент',
      },
      left: {
        examples: 'man.moveLeft(1); <br /> man.moveLeft(2);',
        text: 'Человек идет влево. Эта инструкция принимает количество шагов как аргумент',
      },
      up: {
        examples: 'man.moveUp(1); <br /> man.moveUp(4);',
        text: 'Человек идет вверх. Эта инструкция принимает количество шагов как аргумент',
      },
      down: {
        examples: 'man.moveDown(1); <br /> man.moveDown(2);',
        text: 'Человек идет вниз. Эта инструкция принимает количество шагов как аргумент',
      },
    };
  }

  conf.methods = {
    'man.moveRight': movingMethod(docs.right.text, 1, 0, 'right', docs.right.examples),
    'man.moveLeft': movingMethod(docs.left.text, -1, 0, 'left', docs.left.examples),
    'man.moveUp': movingMethod(docs.up.text, 0, -1, 'up', docs.up.examples),
    'man.moveDown': movingMethod(docs.down.text, 0, 1, 'down', docs.down.examples)
  };

  conf.iterations = prepareIterations(iterations);

  return conf;
}

export default prepareLabyrinth;
