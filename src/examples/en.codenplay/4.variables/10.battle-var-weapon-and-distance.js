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
        }
      },
      funResults: {
        getPerfectWeapon: 'sword',
        getDistance: 2,
      }
    },

    {
      enemies: {
        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        }
      },
      funResults: {
        getPerfectWeapon: 'spear',
        getDistance: 1
      }
    }
  ],

  startPosX: 40,
  
  stepsArgSupported: true,
  shortDescription: true,
});

const startCodeVal =
`// Multiple tests will be started

// Use these variables in your code
var distance = getDistance();
var weapon = getPerfectWeapon();

// Write your code below
`;

const solutionCode =
`// Multiple tests will be started

// Use these variables in your code
var distance = getDistance();
var weapon = getPerfectWeapon();

// Write your code below
hero.go(distance);
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
