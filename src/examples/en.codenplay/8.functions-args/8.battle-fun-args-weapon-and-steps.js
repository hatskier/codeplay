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
        getDistanceToEnemy: 2,
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
        getDistanceToEnemy: 1
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
var distanceToEnemy = getDistanceToEnemy();

// Add 2 instructions into this function
// Use "weapon" and "distance" arguments
function goAndAttack(weapon, distance) {
  // Добавь 2 инструкции в код этой функции
  // Используй аргументы weapon и distance
}

goAndAttack(perfectWeapon, distanceToEnemy);
`;

const solutionCode =
`// Multiple tests will be started
var perfectWeapon = getPerfectWeapon();
var distanceToEnemy = getDistanceToEnemy();

// Add 2 instructions into this function
// Use "weapon" and "distance" arguments
function goAndAttack(weapon, distance) {
  hero.go(distance);
  hero.attackWith(weapon);
}

goAndAttack(perfectWeapon, distanceToEnemy);
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
