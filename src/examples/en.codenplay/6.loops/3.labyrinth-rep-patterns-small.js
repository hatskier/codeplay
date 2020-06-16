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
`// Multiple tests will be started
// Labyrinth will contain repeated parts
// But numbers of this parts will differ
var patternsNumber = getPatternsNumber();
var counter = 0;

// Fix a bug
while (counter < patternsNumber) {
  counter++;
  man.moveRight();
  man.moveDown();
}

man.moveRight(5);
`;

const solutionCode =
`// Multiple tests will be started
// Labyrinth will contain repeated parts
// But numbers of this parts will differ
var patternsNumber = getPatternsNumber();
var counter = 0;

// Fix a bug
while (counter < patternsNumber) {
  counter++;
  man.moveRight();
  man.moveDown();
}

man.moveRight(1);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
