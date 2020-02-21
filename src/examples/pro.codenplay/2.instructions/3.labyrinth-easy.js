import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 2 },
      ],
      stepWidth: 25, // %
    }
  ],

  stepsArgumentSupported: false,
});

const startCodeVal =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

man.moveRight();
`;

const solutionCode =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

man.moveRight();
man.moveRight();
man.moveDown();
man.moveDown();
man.moveDown();
man.moveRight();
man.moveRight();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
