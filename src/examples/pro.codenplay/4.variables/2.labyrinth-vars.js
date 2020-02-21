import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
      ],
      stepWidth: 50, // %
      funResults: {
        getLength: 1,
      },
    },
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 2 },
      ],
      stepWidth: 25, // %
      funResults: {
        getLength: 2,
      },
    }
  ],
  stepsArgumentSupported: true,
});

const startCodeVal =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

var length = getLength();

man.moveRight(length);
`;

const solutionCode =
`// Укажи пещерному человеку путь
// чтобы он смог выбраться из лабиринта

var length = getLength();

man.moveRight(length);
man.moveDown(length);
man.moveRight(length);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
