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
          location: 68
        },

        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 38
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
        },

        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        },
      },
      funResults: {
        getDistance: 3
      }
    },
  ],

  startPosX: 40,
  
  stepsArgSupported: true,
  shortDescription: true,
  codeFontSize: 16,
});

const startCodeVal =
`// Multiple tests will be started

// Variable distance will get distance
// to the enemy (number of steps)
var distance = getDistance();
var weapon;

// You should fix a bug (correct an error) 
// without adding new instructions
hero.go(1);
weapon = 'spear';
hero.attackWith(weapon);
hero.go(distance - 1);
weapon = 'swooord';
hero.attackWith(weapon);
`;

const solutionCode =
`// Multiple tests will be started

// Variable distance will get distance
// to the enemy (number of steps)
var distance = getDistance();
var weapon;

// You should fix a bug (correct an error) 
// without adding new instructions
hero.go(1);
weapon = 'spear';
hero.attackWith(weapon);
hero.go(distance - 1);
weapon = 'sword';
hero.attackWith(weapon);
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
