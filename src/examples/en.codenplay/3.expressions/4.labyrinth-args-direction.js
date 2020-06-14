import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 1 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 2 },
      ],
    }
  ],

  stepsArgumentSupported: false,
});

const startCodeVal =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

man.move('right');
`;

const solutionCode =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

man.move('right');
man.move('down');
man.move('down');
man.move('right');
man.move('right');
`;

// Update methods
const oldMethods = { ...config.methods };

config.methods['man.move'] = {
  doc: 'Принимает как аргумент направление движения',
  examples: `man.move('right'); <br /> man.move('left'); <br /> man.move('up'); <br /> man.move('down');`,
  async run(context, params) {
    switch (params[0]) {
      case 'right':
        await oldMethods['man.moveRight'].run(context, []);
        break;
      case 'down':
        await oldMethods['man.moveDown'].run(context, []);
        break;
      case 'left':
        await oldMethods['man.moveLeft'].run(context, []);
        break;
      case 'up':
        await oldMethods['man.moveUp'].run(context, []);
        break;
      default:
        throw new Error(`Инструкция move не поддерживает аргумент: ${params[0] || '\'\''}`);
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
