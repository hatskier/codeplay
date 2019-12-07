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

    solutionCode:
`// Write the directions for the caveman
// to get through the labyrinth
man.moveRight();
man.moveRight();
man.moveDown();
man.moveDown();
man.moveDown();
man.moveRight();
man.moveRight();
`,

  startCodeVal: '// Write the directions for the caveman\n'
                + '// to get through the labyrinth\n'
                + 'man.moveRight();\n',
                // + 'man.moveRight();\n'
                // + 'man.moveDown();\n'
                // + 'man.moveDown();\n'
                // + 'man.moveDown();\n'
                // + 'man.moveRight();\n'
                // + '// man.moveRight();\n'
});

export default conf;