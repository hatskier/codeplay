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
`// Будет запущено несколько тестов
// В каждом тесте код запустится заново

// Переменная weapon получит строковое
// значение с самым подходящим оружием 
var weapon = getPerfectWeapon();

// Код пиши под этим комментарием
`;

const solutionCode =
`// Будет запущено несколько тестов
// В каждом тесте код запустится заново

// Переменная weapon получит строковое
// значение с самым подходящим оружием 
var weapon = getPerfectWeapon();

// Код пиши под этим комментарием
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
