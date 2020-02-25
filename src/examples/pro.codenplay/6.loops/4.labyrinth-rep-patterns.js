import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 2 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 2 },
      ],
      funResults: {
        getPatternsNumber: 2,
      },
    },
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 2 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 2 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 2 },
      ],
      funResults: {
        getPatternsNumber: 3,
      },
    }
  ],
  stepsArgumentSupported: true,
});

const startCodeVal =
`// Будет запущено несколько тестов
// В каждом тесте лабиринт будет состоять
// из похожих по форме элементов
// но их количество будет отличаться
var patternsNumber = getPatternsNumber();
// Вспомогательная переменная

// Откомментируй одну из инструкций
while (patternsNumber > 0) {
  // patternsNumber--;
  // patternsNumber++;
  // patternsNumber = 0;
  // patternsNumber = patternsNumber + 1;

  man.moveRight(2);
  man.moveDown(2);
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

// Откомментируй одну из инструкций
while (patternsNumber > 0) {
  patternsNumber--;
  // patternsNumber++;
  // patternsNumber = 0;
  // patternsNumber = patternsNumber + 1;

  man.moveRight(2);
  man.moveDown(2);
}

man.moveRight(2);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
