import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
      ],
      funResults: {
        getPatternsNumber: 2,
      },
    },
    {
      path: [
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
      ],
      funResults: {
        getPatternsNumber: 3,
      },
    }
  ],
  stepsArgumentSupported: true,
  codeFontSize: 16,
});

const startCodeVal =
`// Будет запущено несколько тестов
// В каждом тесте лабиринт будет состоять
// из похожих по форме элементов
// но их количество будет отличаться
var patternsNumber = getPatternsNumber();
// Вспомогательная переменная
var counter = 0;

// Нужно пофиксить баг
while (counter < patternsNumber) {
  counter++;
  man.moveRight();
  man.moveDown();
}

man.moveRight(2);
`;

const solutionCode =
`// Будет запущено несколько тестов
// В каждом тесте лабиринт будет состоять
// из похожих по форме элементов
// но их количество будет отличаться
var patternsNumber = getPatternsNumber();
// Вспомогательная переменная
var counter = 0;

// Нужно пофиксить баг
while (counter < patternsNumber) {
  counter++;
  man.moveRight();
  man.moveDown();
}

man.moveRight();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
