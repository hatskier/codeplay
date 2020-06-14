// Russian version

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

function runtimeError(msg, field) {
  field.log(`Error: ${msg}`, {error: true});
  throw new Error(msg);
}

export default function (conf) {
  let methods = {};
  for (let methodName in conf.methods) {
    const { bg, doc, examples, log } = conf.methods[methodName];
    methods[methodName] = {
      doc,
      examples,
      async run({field, state}, params) {
        if (!state.stages) {
          state.stages = [];
        }

        // if (params && params.length > 0) {
        //   runtimeError(`Метод ${methodName} не принимает аргументы`, field);
        // }

        state.stages.push(bg);

        let counter = 0;
        for (let stage of state.stages) {
          if (stage !== conf.order[counter]) {
            runtimeError('Incorrect instructions order', field);
          }
          counter++;
        }
        field.log(log);
        field.changeBg(bg);
        await sleep(conf.tickTime);
      }
    }
  }

  const iterations = [
    {
      pre: async function() {
        // 
      },
      post: async function({state, field}) {
        if (!state.stages || state.stages.length !== conf.order.length) {
          runtimeError('Task is not finished', field);
        }
      }
    }
  ];

  const tickHooks = {
    pre: async function() {
    },
    post: async function() {
    }
  }


  return {
    bg: conf.startWithBg,
    objects: [],

    methods,
    iterations,
    tickHooks,

    size: conf.size,
    images: conf.images,
    docTableExtended: conf.docTableExtended,
    startCodeVal: conf.startCodeVal,
    solutionCode: conf.solutionCode,
    taskDescription: conf.taskDescription,
  }

}