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
`// Откомментируй две инструкции в этой функции
function pattern(length) {
  // man.moveUp(length);
  // man.moveLeft(length);
  // man.moveRight(length);
  // man.moveDown(length);
}

pattern(2);
pattern(2);
pattern(2);
man.moveRight(2);
`;

const solutionCode =
`// Откомментируй две инструкции в этой функции
function pattern(length) {
  // man.moveUp(length);
  // man.moveLeft(length);
  man.moveRight(length);
  man.moveDown(length);
}

pattern(2);
pattern(2);
pattern(2);
man.moveRight(2);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
