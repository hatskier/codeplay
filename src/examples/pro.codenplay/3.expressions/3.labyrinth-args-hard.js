import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 4 },
        { direction: 'down', length: 2 },
        { direction: 'left', length: 3 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 5 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 3 },
      ],
    }
  ],

  stepsArgumentSupported: true,
});

const startCodeVal =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

man.moveRight(4);
`;

const solutionCode =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

man.moveRight(4);
man.moveDown(2);
man.moveLeft(3);
man.moveDown(3);
man.moveRight(5);
man.moveDown(2);
man.moveRight(3);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
