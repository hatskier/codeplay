import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 6 },
        { direction: 'down', length: 2 },
        { direction: 'left', length: 4 },
        { direction: 'down', length: 4 },
        { direction: 'right', length: 7 },
      ],
    }
  ],

  stepsArgumentSupported: true,
});

const startCodeVal =
`// Write directions for the caveman
// to get through the labyrinth

man.moveRight(6);
`;

const solutionCode =
`// Write directions for the caveman
// to get through the labyrinth

man.moveRight(6);
man.moveDown(2);
man.moveLeft(4);
man.moveDown(4);
man.moveRight(7);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
