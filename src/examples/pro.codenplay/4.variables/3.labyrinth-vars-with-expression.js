import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 2 },
      ],
      funResults: {
        getLength: 2,
      },
    },
    {
      path: [
        { direction: 'right', length: 3 },
        { direction: 'down', length: 4 },
        { direction: 'right', length: 3 },
      ],
      funResults: {
        getLength: 3,
      },
    },
    {
      path: [
        { direction: 'right', length: 4 },
        { direction: 'down', length: 5 },
        { direction: 'right', length: 4 },
      ],
      funResults: {
        getLength: 4,
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
man.moveDown(length + 1);
man.moveRight(length);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
