import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
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
`function pattern(length) {
  man.moveRight(length);
  man.moveDown(length);
}

pattern(2);
pattern(2); // This argument should be changed
pattern(2);
man.moveRight(2);
`;

const solutionCode =
`function pattern(length) {
  man.moveRight(length);
  man.moveDown(length);
}

pattern(2);
pattern(1); // This argument should be changed
pattern(2);
man.moveRight(2);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
