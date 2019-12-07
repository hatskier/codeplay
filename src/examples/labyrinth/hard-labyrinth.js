import prepareLabyrinthConf from './labyrinth';

let conf = prepareLabyrinthConf({
  size: {
    width: 450,
    height: 450
  },

  path: [
    { direction: 'right', length: 4 },
    { direction: 'down', length: 2 },
    { direction: 'left', length: 3 },
    { direction: 'down', length: 3 },
    { direction: 'right', length: 5 },
    { direction: 'down', length: 2 },
    { direction: 'right', length: 3 },
  ],

  stepWidth: 11,

  solutionCode:
`// Write the directions for the man
// to get through the labyrinth.
// You can add numbers to specify
// the number of steps.
man.moveRight(4);
man.moveDown(2);
man.moveLeft(3);
man.moveDown(3);
man.moveRight(5);
man.moveDown(2);
man.moveRight(3);
`,


  startCodeVal: '// Write the directions for the man\n'
  + '// to get through the labyrinth.\n'
  + '// You can add numbers to specify\n'
  + '// the number of steps.\n'
  + 'man.moveRight(4);\n',
});

export default conf;