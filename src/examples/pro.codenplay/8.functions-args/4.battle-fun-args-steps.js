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
  stepsArgSupported: true,

  solutionCode:
`// Будет запущено несколько тестов
var distance = getDistance();

// Откомментируй две инструкции
// в коде функции goAndAttack
function goAndAttack(distance) {
  hero.go(distance);
  hero.attack();
  // hero.spearAttack();
  // hero.attackWith('spear');
}

goAndAttack(distance);
`,

  startCodeVal:
`// Будет запущено несколько тестов
var distance = getDistance();

// Откомментируй две инструкции
// в коде функции goAndAttack
function goAndAttack(distance) {
  // hero.go(distance);
  // hero.attack();
  // hero.spearAttack();
  // hero.attackWith('spear');
}

goAndAttack(distance);
`,
});

delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.attackWith"];

export default conf;
