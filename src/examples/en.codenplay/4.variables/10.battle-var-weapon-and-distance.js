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
`// Будет запущено несколько тестов
// В каждом тесте код запустится заново

// Используй переменные для решения
var distance = getDistance();
var weapon = getPerfectWeapon();

// Код пиши под этим комментарием
`;

const solutionCode =
`// Будет запущено несколько тестов
// В каждом тесте код запустится заново

// Используй переменные для решения
var distance = getDistance();
var weapon = getPerfectWeapon();

// Код пиши под этим комментарием
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
