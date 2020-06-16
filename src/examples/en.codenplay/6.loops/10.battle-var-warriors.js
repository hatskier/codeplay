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

  startPosX: 20,
  shortDescription: true,
  
  requirements: {
    minInstructionsInWhileLoops: 3,
  },

  solutionCode:
`// Multiple tests will be started
// Variable "enemies" will store the number of enemies
var enemies = getEnemiesCount();

// Write code using loops
// Don't add new variables
while (enemies > 0) {
  hero.go();
  hero.attack();
  enemies--;
}
`,

  startCodeVal:
`// Multiple tests will be started
// Variable "enemies" will store the number of enemies
var enemies = getEnemiesCount();

// Write code using loops
// Don't add new variables
`,
});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
