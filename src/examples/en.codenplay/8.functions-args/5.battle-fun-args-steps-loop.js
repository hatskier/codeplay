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
          location: 58
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
        }
      },
      funResults: {
        getDistance: 3
      }
    },
  ],

  startPosX: 40,
  shortDescription: true,
  stepsArgSupported: false,
  codeFontSize: 16,

  solutionCode:
`// Будет запущено несколько тестов
// В каждом тесте расстояние до
// врага будет отличаться
var distance = getDistance();

// В этот раз инструкция hero.go
// не принимает аргументы, поэтому
// нужно использовать цикл
function goAndAttack(distance) {
  // Добавь в цикле одну инструкцию
  while (distance > 0) {
    hero.go();
    distance--;
  }
  hero.attack();
}

goAndAttack(distance);
`,

  startCodeVal:
`// Будет запущено несколько тестов
// В каждом тесте расстояние до
// врага будет отличаться
var distance = getDistance();

// В этот раз инструкция hero.go
// не принимает аргументы, поэтому
// нужно использовать цикл
function goAndAttack(distance) {
  // Добавь в цикле одну инструкцию
  while (distance > 0) {
    hero.go();
  }
  hero.attack();
}

goAndAttack(distance);
`,
});

delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.attackWith"];

export default conf;
