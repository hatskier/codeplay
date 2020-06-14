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
`// Будет запущено несколько тестов
var perfectWeapon = getPerfectWeapon();
var distanceToEnemy = getDistanceToEnemy();

// Добавь 2 инструкции в код этой функции
// Используй аргументы weapon и distance
function goAndAttack(weapon, distance) {
  // Добавь 2 инструкции в код этой функции
  // Используй аргументы weapon и distance
}

goAndAttack(perfectWeapon, distanceToEnemy);
`;

const solutionCode =
`// Будет запущено несколько тестов
var perfectWeapon = getPerfectWeapon();
var distanceToEnemy = getDistanceToEnemy();

// Добавь 2 инструкции в код этой функции
// Используй аргументы weapon и distance
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
