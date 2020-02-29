import prepareBattle from '../base-configs/battle'

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
        }
      },
      funResults: {
        getDistance: 3
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
        getDistance: 5
      }
    },
  ],

  startPosX: 20,
  shortDescription: true,
  codeFontSize: 16,

  solutionCode:
`// Будет запущено несколько тестов
// В каждом из них расстояние до
// врага будет отличаться

// Добавь одну инструкцию внутри цикла
var distance = getDistance();
while (distance > 0) {
  hero.go();
  // Уменьши переменную distance на 1 (используй --)
  distance--;
}

hero.attack();
`,

  startCodeVal:
`// Будет запущено несколько тестов
// В каждом из них расстояние до
// врага будет отличаться

// Добавь одну инструкцию внутри цикла
var distance = getDistance();
while (distance > 0) {
  hero.go();
  // Уменьши переменную distance на 1 (используй --)
}

hero.attack();
`,

});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
