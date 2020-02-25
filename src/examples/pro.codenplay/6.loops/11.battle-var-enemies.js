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
        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 28
        },
        'Warrior2': {
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
        {
      enemies: {
        'Warrior1': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        },
        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 28
        },
        'Warrior2': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 58
        },
        'Warrior3': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 68
        }
      },
      funResults: {
        getEnemiesCount: 4
      }
    },
  ],

  startPosX: 20,
  shortDescription: true,

  requirements: {
    minInstructionsInWhileLoops: 6,
  },

  solutionCode:
`
`,

startCodeVal:
`
var enemies = getEnemiesCount();
var counter = 0;

while (counter < enemies) {
  hero.go();
  
  if (counter == 1) {
    hero.spearAttack();
  } else {
    hero.swordAttack();
  }

  counter = counter + 1;
}
`
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;
