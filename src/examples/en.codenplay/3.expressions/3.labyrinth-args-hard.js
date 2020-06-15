import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 4 },
        { direction: 'down', length: 2 },
        { direction: 'left', length: 3 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 5 },
        { direction: 'down', length: 2 },
        { direction: 'right', length: 3 },
      ],
    }
  ],

  stepsArgumentSupported: true,
});

const startCodeVal =
`// Write directions for the caveman
// to get through the labyrinth

man.moveRight(4);
`;

const solutionCode =
`// Write directions for the caveman
// to get through the labyrinth

man.moveRight(4);
man.moveDown(2);
man.moveLeft(3);
man.moveDown(3);
man.moveRight(5);
man.moveDown(2);
man.moveRight(3);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
