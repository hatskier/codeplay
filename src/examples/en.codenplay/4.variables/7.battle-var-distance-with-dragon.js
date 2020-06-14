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
          location: 58
        },

        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 28
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
        },

        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 28
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
          location: 28
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

});

const startCodeVal =
`// Будет запущено несколько тестов
// В каждом тесте код запустится заново

// Переменная distance получает расстояние
// до врага (число шагов)
var distance = getDistance();

// Код пиши под этим комментарием
`;

const solutionCode =
`// Будет запущено несколько тестов
// В каждом тесте код запустится заново

// Переменная distance получает расстояние
// до врага (число шагов)
var distance = getDistance();

// Код пиши под этим комментарием
hero.attackWith('spear');
hero.go(distance);
hero.attackWith('sword');
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
