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
    methods[methodName] = {
      doc: conf.methods[methodName].doc,
      async run({field, state}, params) {
        if (!state.executedMethods) {
          state.executedMethods = [];
        }

        if (params && params.length > 0) {
          runtimeError(`Method ${methodName} has no arguments`, field);
        }

        field.log(conf.methods[methodName].log);

        field.changeBg(conf.methods[methodName].bg);
        await sleep(conf.tickTime);

        state.executedMethods.push(methodName);

        let counter = 0;
        for (let executedMethod of state.executedMethods) {
          if (executedMethod !== conf.order[counter]) {
            runtimeError('Incorrect order', field);
          }
          counter++;
        }
      }
    }
  }

  const iterations = [
    {
      pre: async function() {
        // 
      },
      post: async function({state}) {
        if (!state.executedMethods || state.executedMethods.length !== conf.order.length) {
          runtimeError('Task is not finished');
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
    startCodeVal: conf.startCodeVal,
    taskDescription: conf.taskDescription,
  }

}