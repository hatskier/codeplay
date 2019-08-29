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


  startCodeVal: '// Write the directions for the man\n'
  + '// to get through the labyrinth\n'
  + 'man.moveRight(4);\n',
});

export default conf;