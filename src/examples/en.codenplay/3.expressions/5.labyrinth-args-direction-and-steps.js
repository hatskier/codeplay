import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 2 },
      ],
    }
  ],

  stepsArgumentSupported: true,
});

const startCodeVal =
`// Write directions for the caveman
// to get through the labyrinth

man.move('right', 2);
`;

const solutionCode =
`// Write directions for the caveman
// to get through the labyrinth

man.move('right', 2);
man.move('down', 3);
man.move('right', 2);
`;

// Update methods
const oldMethods = { ...config.methods };

function incorrectUsageOfMethod() {
  throw new Error(`Instruction "move" accepts 2 arguments: direction (String) and number of steps (Number)`);
}

config.methods['man.move'] = {
  doc: 'This instruction accepts 2 arguments: direction (String) and number of steps (Number)',
  examples: `man.move('right', 2); <br /> man.move('left', 1); <br /> man.move('up', 2); <br /> man.move('down', 3);`,
  async run(context, params) {
    if (params.length != 2) {
      incorrectUsageOfMethod();
      return;
    }
    if (typeof params[0] != 'string') {
      throw new Error('The first argument of "move" instruction should be a String');
      return;
    }
    if (typeof params[1] != 'number') {
      throw new Error('The second argument of "move" instruction should be a Number');
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
