import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 2 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 2 },
      ],
    }
  ],

  stepsArgumentSupported: false,
});

const startCodeVal =
`// Write directions for the caveman
// to get through the labyrinth

man.moveRight();
`;

const solutionCode =
`// Write directions for the caveman
// to get through the labyrinth

man.moveRight();
man.moveRight();
man.moveDown();
man.moveDown();
man.moveDown();
man.moveRight();
man.moveRight();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
