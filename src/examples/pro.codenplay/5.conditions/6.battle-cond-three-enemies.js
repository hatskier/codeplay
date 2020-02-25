import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Archer': {
          action() {
            return 'skip';
          },

          kind: 'archer', // enum: ['archer', 'warrior', 'dragon']
          location: 59
        }
      },
      funResults: {
        getEnemyType: 'archer',
      }
    },
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
        getEnemyType: 'warrior',
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
        getEnemyType: 'dragon',
      }
    }
  ],

  startPosX: 40,
  maxTicksToWin: 12,
  shortDescription: true,
  codeFontSize: 16,
});

const solutionCode =
`// Будет запущено несколько тестов

// Переменная enemy будет хранить тип врага
var enemy = getEnemyType();

// Поправь код ниже
if (enemy == 'archer') {
  hero.go();
  hero.swordAttack();
}
if (enemy == 'dragon') {
  hero.spearAttack();
}
if (enemy == 'warrior') {
  hero.swordAttack();
}
`;

const startCodeVal =
`// Будет запущено несколько тестов

// Переменная enemy будет хранить тип врага
var enemy = getEnemyType();

// Поправь код ниже
if (enemy == 'archer') {
  hero.swordAttack();
}
if (enemy == 'dragon') {
  hero.spearAttack();
}
if (enemy == 'warrior') {
  hero.swordAttack();
}
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
