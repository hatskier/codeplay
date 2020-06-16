import prepareBattle from '../base-configs/battle'

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

  startPosX: 20,
  shortDescription: true,
  codeFontSize: 16,

  solutionCode:
`// Multiple tests will be started
// Distance to the enemy will differ

// Add one instruction inside the loop
var distance = getDistance();
while (distance > 0) {
  hero.go();
  // Decrement variable "distance" by 1 (use --)
  distance--;
}

hero.attack();
`,

  startCodeVal:
`// Multiple tests will be started
// Distance to the enemy will differ

// Add one instruction inside the loop
var distance = getDistance();
while (distance > 0) {
  hero.go();
  // Decrement variable "distance" by 1 (use --)
}

hero.attack();
`,

});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
