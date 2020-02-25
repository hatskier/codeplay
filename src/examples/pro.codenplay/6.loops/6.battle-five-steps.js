import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
        'Warrior': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 78
        }
      },
      // funResults: {
      //   getDistance: 1
      // }
    },
  ],

  stepWidth: 10,
  startPosX: 20,

  // maxTicksToWin: 6,
  
  requirements: {
    minInstructionsInWhileLoops: 3,
  },

  solutionCode:
`
`,

startCodeVal:
`
var counter = 0;

while (counter < 5) {
  counter = counter + 1;
  hero.go();
}

hero.attack();
`
});

// TODO config methods

export default conf;
