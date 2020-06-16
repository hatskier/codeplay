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
  codeFontSize: 14,
});

const startCodeVal =
`// Multiple tests will be started
// Labyrinth will contain repeated parts
// But numbers of this parts will differ
var patternsNumber = getPatternsNumber();

// Uncomment one of the instructions below
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
`// Multiple tests will be started
// Labyrinth will contain repeated parts
// But numbers of this parts will differs
var patternsNumber = getPatternsNumber();

// Uncomment one of the instructions below
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
