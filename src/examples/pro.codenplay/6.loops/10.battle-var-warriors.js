import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
        'Warrior1': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        },
        'Warrior2': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 48
        }
      },
      funResults: {
        getEnemiesCount: 2
      }
    },
    {
      enemies: {
        'Warrior1': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        },
        'Warrior2': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 48
        },
        'Warrior3': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 58
        }
      },
      funResults: {
        getEnemiesCount: 3
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
var enemies = getEnemiesCount();

while (enemies > 0) {
  hero.go();
  hero.attack();
  enemies = enemies - 1;
}
`
});

// TODO config methods

export default conf;
