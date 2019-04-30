const defaultSize = 50;

function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function prepareLabyrinth({path, stepWidth, startCodeVal, size}) {
  const startPos = {
    x: 0,
    y: 5
  };
  
  let Conf = {
    bg: 'https://s3.amazonaws.com/alcourses.codeplay/labyrinth/skale.jpg',
  
    objects: [
      {
        kind: 'img',
        id: 'Man',
        // img: 'https://s3.amazonaws.com/alcourses.codeplay/labyrinth/man-with-stick.gif',
        img: 'https://s3.amazonaws.com/alcourses.codeplay/example-labyrinth/man-static.png',
        size: {
          width: defaultSize,
          height: defaultSize
        },
        startPos
      }
    ],
  
    taskDescription: 'You just need to go through the labyrinth'
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
            throw new Error('Unsupported statement: ' + step.direction);
          }
        }
      }
    }
    Conf.objects = htmlObjects.concat(Conf.objects);
  }
  
  function movingMethod(doc, dx, dy, direction) {
    return {
      doc,
      async run(context, params) {
        function validateParams(params) {
          if (params && params.length > 1) {
            throw new Error('Too many arguments');
          }
        }

        async function runStep() {
          if (direction == 'left') {
            await context.field.changeImage('Man', 'https://s3.amazonaws.com/alcourses.codeplay/labyrinth/man-with-stick-going-left.gif');
          } else {
            await context.field.changeImage('Man', 'https://s3.amazonaws.com/alcourses.codeplay/labyrinth/man-with-stick.gif');
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
            throw new Error('Bad move');
          }
          if (len > 1) {
            let preLastStep = context.state.path[len - 2];
            if (preLastStep.length !== path[len - 2].length) {
              throw new Error('Bad move');
            }
          }
        }

        validateParams(params);
        if (params && params.length == 1) {
          for (let i = 0; i < params[0]; i++) {
            await runStep();
          }
        } else {
          await runStep();
        }
        
      }
    };
  }

  drawLabyrinth();

  Conf.size = size;

  // Conf.objects = Conf.objects.concat(pathObjects);
  Conf.methods = {
    "man.moveRight": movingMethod('Man goes right', stepWidth, 0, 'right'),
    "man.moveLeft": movingMethod('Man goes left', -stepWidth, 0, 'left'),
    "man.moveUp": movingMethod('Man goes up', 0, -stepWidth, 'up'),
    "man.moveDown": movingMethod('Man goes down', 0, stepWidth, 'down')
  };

  Conf.iterations = [
    {
      pre: async function(context) {
        await context.field.changeImage('Man', 'https://s3.amazonaws.com/alcourses.codeplay/labyrinth/man-with-stick-going-left.gif');
      },
      post: async function(context) {
        await context.field.changeImage('Man', 'https://s3.amazonaws.com/alcourses.codeplay/example-labyrinth/man-static.png');
        if (JSON.stringify(path) !== JSON.stringify(context.state.path)) {
          throw new Error('You have not reached the target');
        }
      }
    }
  ];

  Conf.tickHooks = {
    pre: async function() {
    },
    post: async function() {
    }
  }

  Conf.startCodeVal = startCodeVal;

  return Conf;
}

export default prepareLabyrinth;