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
});

const startCodeVal =
`// Будет запущено несколько тестов
// В каждом тесте код запустится заново

// Переменная distance получает расстояние
// до дальнего врага (число шагов)
var distance = getDistance();

hero.go(1); // Подходим к дракону
// Замени этот коммент какой-то инструкцией
hero.go(distance - 1); // Так можно :)
// Этот коммент тоже замени
`;

const solutionCode =
`// Будет запущено несколько тестов
// В каждом тесте код запустится заново

// Переменная distance получает расстояние
// до дальнего врага (число шагов)
var distance = getDistance();

hero.go(1); // Подходим к дракону
hero.attackWith('spear');
hero.go(distance - 1); // <- Передаем результат выражения как аргумент
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
