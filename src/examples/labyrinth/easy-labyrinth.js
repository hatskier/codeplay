import prepareLabyrinthConf from './labyrinth';

let conf = prepareLabyrinthConf({
  size: {
    width: 450,
    height: 450
  },

  path: [
    { direction: 'right', length: 2 },
    { direction: 'down', length: 3 },
    { direction: 'right', length: 2 },
  ],

  stepWidth: 25,

  startCodeVal: '// You just need to go through the labyrinth\n'
                + '// Write your code below\n'
                + 'man.moveRight();\n',
                // + 'man.moveRight();\n'
                // + 'man.moveDown();\n'
                // + 'man.moveDown();\n'
                // + 'man.moveDown();\n'
                // + 'man.moveRight();\n'
                // + '// man.moveRight();\n'
});

export default conf;