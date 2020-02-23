import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
      ],
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
man.moveDown();
man.moveRight();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
