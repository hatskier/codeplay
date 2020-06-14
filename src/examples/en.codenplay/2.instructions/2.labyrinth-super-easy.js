import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 1 },
        { direction: 'down', length: 1 },
        { direction: 'right', length: 1 },
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
man.moveDown();
man.moveRight();
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
