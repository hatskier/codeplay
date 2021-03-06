import sleep from "../../sleep";

function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function executingError(context, msg) {
  context.field.log(`Error: ${msg}. Please fix your code and try again ;)`, { error: true });
  throw new Error(msg);
}

  
let conf = {
  images: {
    'skale': 'https://codenplay.io/img/tasks/labyrinth/skale.jpg'
  },

  bg: 'skale',

  objects: [
    // {
    //   kind: 'img',
    //   id: 'Man',
    //   // img: 'https://codenplay.io/img/tasks/labyrinth/man-with-stick.gif',
    //   imgKey: 'man-static',
    //   size: {
    //     width: defaultSize,
    //     height: defaultSize
    //   },
    //   startPos
    // }
  ],

  taskDescription: 'Example variables'
}

conf.size = {
  width: 450,
  height: 450
},

conf.methods = {
  'testVar': {
    doc: 'testVar tests method receives single number parameter',
    async run(context, params) {
      await sleep(context.field.tickTime);
      context.field.log(JSON.stringify(params));
      if (!params || params.length != 1) {
        executingError(context, `Incorrect number of arguments passed to function: testVar`);
      }
      if (params[0] != 12) {
        context.field.log(JSON.stringify(params[0]));
        executingError(context, `NONONONON`);
      }
      context.state.solved = true;
    }
  }
};

conf.iterations = [
  {
    pre: async function() {},
    post: async function(context) {
      if (!context.state.solved) {
        executingError(context, 'Task is not solved');
      }
      await context.field.tickSleep();
    }
  },

  {
    async pre() {},
    async post(context) {
      if (!context.state.solved) {
        executingError(context, 'Task is not solved');
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

conf.startCodeVal =
`var x = 12;

`;

export default conf;