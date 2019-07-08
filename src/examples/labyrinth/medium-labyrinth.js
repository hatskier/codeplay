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

  startCodeVal:
`man.moveRight(6);
// man.moveDown(2);
// man.moveDown(3);
man.moveLeft(4);
// man.moveDown(4);
man.moveRight(7);
`
});

export default conf;