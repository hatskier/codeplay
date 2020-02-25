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

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
