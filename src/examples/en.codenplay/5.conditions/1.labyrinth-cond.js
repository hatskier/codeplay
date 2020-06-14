import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 3 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 3 },
      ],
      funResults: {
        getLabyrinthType: 'short',
      },
    },
    {
      path: [
        { direction: 'right', length: 4 },
        { direction: 'down', length: 4 },
        { direction: 'right', length: 4 },
      ],
      funResults: {
        getLabyrinthType: 'long',
      },
    }
  ],
  stepsArgumentSupported: true,
  codeFontSize: 15,
});

const startCodeVal =
`// Будет запущено несколько тестов
// В каждом тесте форма лабиринта
// будет одинаковая, а длина - разная

var type = getLabyrinthType();
var length;

if (type == 'short') {
  length = 3;
}

if (type == 'long') {
  // Замени этот коммент инструкцией
}

man.moveRight(length);
man.moveDown(length);
man.moveRight(length);
`;

const solutionCode =
`// Будет запущено несколько тестов
// В каждом тесте форма лабиринта
// будет одинаковая, а длина - разная

var type = getLabyrinthType();
var length;

if (type == 'short') {
  length = 3;
}

if (type == 'long') {
  length = 4;
}

man.moveRight(length);
man.moveDown(length);
man.moveRight(length);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
