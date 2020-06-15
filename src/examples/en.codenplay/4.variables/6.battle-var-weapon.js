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
          location: 49
        }
      },
      funResults: {
        getPerfectWeapon: 'sword',
      }
    },

    {
      enemies: {
        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 28
        }
      },
      funResults: {
        getPerfectWeapon: 'spear',
      }
    }
  ],

  startPosX: 40,
  
  stepsArgSupported: true,
  shortDescription: true,

});

const startCodeVal =
`// Multiple tests will be started

// Variable weapon will get a
// string value with the most
// appropriate weapon
var weapon = getPerfectWeapon();

// Write your code below
`;

const solutionCode =
`// Multiple tests will be started

// Variable weapon will get a
// string value with the most
// appropriate weapon
var weapon = getPerfectWeapon();

// Write your code below
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
