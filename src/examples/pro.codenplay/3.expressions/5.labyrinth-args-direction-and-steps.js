import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 2 },
      ],
      stepWidth: 24.92, // %
    }
  ],

  stepsArgumentSupported: false,
});

const startCodeVal =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

man.move('right', 2);
`;

const solutionCode =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

man.move('right', 2);
man.move('down', 3);
man.move('right', 2);
`;

// Update methods
const oldMethods = { ...config.methods };

function incorrectUsageOfMethod() {
  throw new Error(`Инструкция "move" принимает 2 аргумента: направление (строка) и количество шагов (число)`);
}

config.methods['man.move'] = {
  doc: 'Принимает как аргументы направление движения и количество шагов',
  examples: `man.move('right', 2); <br /> man.move('left', 1); <br /> man.move('up', 2); <br /> man.move('down', 3);`,
  async run(context, params) {
    if (params.length != 2) {
      incorrectUsageOfMethod();
      return;
    }
    if (typeof params[0] != 'string') {
      throw new Error('Первый аргумент инструкции "move" должен быть строкового типа');
      return;
    }
    if (typeof params[1] != 'number') {
      throw new Error('Второй аргумент инструкции "move" должен быть числом');
      return;
    }

    const [direction, steps] = params;

    switch (direction) {
      case 'right':
        await oldMethods['man.moveRight'].run(context, [steps]);
        break;
      case 'down':
        await oldMethods['man.moveDown'].run(context, [steps]);
        break;
      case 'left':
        await oldMethods['man.moveLeft'].run(context, [steps]);
        break;
      case 'up':
        await oldMethods['man.moveUp'].run(context, [steps]);
        break;
      default:
        incorrectUsageOfMethod();
        break;
    }
  },
};
delete config.methods['man.moveRight'];
delete config.methods['man.moveDown'];
delete config.methods['man.moveLeft'];
delete config.methods['man.moveUp'];

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
