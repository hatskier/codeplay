import prepareBattle from '../variables/battleVar';

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
          location: 58
        }
      },
      funResults: {
        getDistance: 3
      }
    },
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
      funResults: {
        getDistance: 5
      }
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
var distance = getDistance();

while (distance > 0) {
  hero.go();
  distance = distance - 1;
}

hero.attack();
`
});

// TODO config methods

export default conf;
