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
var perfectWeapon = getPerfectWeapon();

// Fix the code of this function
function attack(weapon) {
  if (weapon == 'sword') {
    hero.spearAttack();
  }
  if (weapon == 'spear') {
    hero.swordAttack();
  }
}

attack(perfectWeapon);
`;

const solutionCode =
`// Multiple tests will be started
var perfectWeapon = getPerfectWeapon();

// Fix the code of this function
function attack(weapon) {
  if (weapon == 'sword') {
    hero.swordAttack();
  }
  if (weapon == 'spear') {
    hero.spearAttack();
  }
}

attack(perfectWeapon);
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
