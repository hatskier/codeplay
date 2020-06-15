import createConfig from '../base-configs/labyrinth'

let config = createConfig({
  iterations: [
    {
      path: [
        { direction: 'right', length: 3 },
        { direction: 'down', length: 3 },
        { direction: 'right', length: 3 },
      ],
      funResults: {
        getLabyrinthType: 'short',
      },
    },
    {
      path: [
        { direction: 'right', length: 4 },
        { direction: 'down', length: 4 },
        { direction: 'right', length: 4 },
      ],
      funResults: {
        getLabyrinthType: 'long',
      },
    }
  ],
  stepsArgumentSupported: true,
  codeFontSize: 15,
});

const startCodeVal =
`// Multiple tests will be started
// Labyrinth shape will be similar
// but distances will be different

var type = getLabyrinthType();
var length;

if (type == 'short') {
  length = 3;
}

if (type == 'long') {
  // Replace this comment with some instruction
}

man.moveRight(length);
man.moveDown(length);
man.moveRight(length);
`;

const solutionCode =
`// Multiple tests will be started
// Labyrinth shape will be similar
// but distances will be different

var type = getLabyrinthType();
var length;

if (type == 'short') {
  length = 3;
}

if (type == 'long') {
  length = 4;
}

man.moveRight(length);
man.moveDown(length);
man.moveRight(length);
`;

export default {
  ...config,
  startCodeVal,
  solutionCode,
};
