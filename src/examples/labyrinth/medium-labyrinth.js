import prepareLabyrinthConf from './labyrinth';

let conf = prepareLabyrinthConf({
  size: {
    width: 450,
    height: 450
  },

  path: [
    { direction: 'right', length: 6 },
    { direction: 'down', length: 2 },
    { direction: 'left', length: 4 },
    { direction: 'down', length: 4 },
    { direction: 'right', length: 7 },
  ],

  stepWidth: 11,

  solutionCode:
`// Write the directions for the caveman
// to get through the labyrinth.
// You can add numbers to specify
// the number of steps.
man.moveRight(6);
man.moveDown(2);
man.moveLeft(4);
man.moveDown(4);
man.moveRight(7);
`,

  startCodeVal: '// Write the directions for the caveman\n'
  + '// to get through the labyrinth.\n'
  + '// You can add numbers to specify\n'
  + '// the number of steps.\n'
  + 'man.moveRight(6);\n',

});

export default conf;