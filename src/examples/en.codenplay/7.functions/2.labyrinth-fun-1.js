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
        { direction: 'down', length: 2 },
        { direction: 'right', length: 2 },
      ],
    }
  ],
  stepsArgumentSupported: true,
  codeFontSize: 16,
});

const startCodeVal =
`// Uncomment one instruction in this function
function pattern() {
  // man.moveRight(1);
  // man.moveRight(2);
  // man.moveRight(3);
  // man.moveRight(5);
  man.moveDown(2);
}

pattern();
pattern();
pattern();
man.moveRight(2);
`;

const solutionCode =
`// Uncomment one instruction in this function
function pattern() {
  // man.moveRight(1);
  man.moveRight(2);
  // man.moveRight(3);
  // man.moveRight(5);
  man.moveDown(2);
}

pattern();
pattern();
pattern();
man.moveRight(2);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
