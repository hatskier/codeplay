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

  startCodeVal: '// You just need to go through the labyrinth\n'
  + '// Write your code below\n\n'
  + 'man.moveRight(6);\n',

});

export default conf;