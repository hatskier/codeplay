import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
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
        getDistance: 1
      }
    },

    {
      enemies: {
        'Warrior': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 68
        }
      },
      funResults: {
        getDistance: 2
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
        getDistance: 3
      }
    },
  ],

  startPosX: 40,
  shortDescription: true,
  stepsArgSupported: false,
  codeFontSize: 16,

  solutionCode:
`// Multiple tests will be started
// Distance to the enemy will differ
var distance = getDistance();

// This time instruction hero.go
// doesn't accept arguments
// So you should use a loop
function goAndAttack(distance) {
  // Add one instruction into this loop
  while (distance > 0) {
    hero.go();
    distance--;
  }
  hero.attack();
}

goAndAttack(distance);
`,

  startCodeVal:
`// Multiple tests will be started
// Distance to the enemy will differ
var distance = getDistance();

// This time instruction hero.go
// doesn't accept arguments
// So you should use a loop
function goAndAttack(distance) {
  // Add one instruction into this loop
  while (distance > 0) {
    hero.go();
  }
  hero.attack();
}

goAndAttack(distance);
`,
});

delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.attackWith"];

export default conf;
