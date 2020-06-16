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
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
      ],
    }
  ],
  stepsArgumentSupported: true,
  codeFontSize: 16,
});

const startCodeVal =
`// Add one instruction into pattern function
function pattern() {
  man.moveRight(1);
}

function solve() {
  var counter = 0;
  while (counter < 5) {
    counter++;
    pattern();
  }
  man.moveRight(1);
}

solve();
`;

const solutionCode =
`// Add one instruction into pattern function
function pattern() {
  man.moveRight(1);
  man.moveDown(1);
}

function solve() {
  var counter = 0;
  while (counter < 5) {
    counter++;
    pattern();
  }
  man.moveRight(1);
}

solve();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
