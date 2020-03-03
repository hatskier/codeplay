import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Archer': {
          action(tickNr) {
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
          action(tickNr) {
            if (tickNr == 0) {
              return 'attack';
            } else {
              return 'skip';
            }
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
          action(tickNr) {
            if (tickNr == 0) {
              return 'attack';
            } else {
              return 'skip';
            }
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        }
      },
      funResults: {
        getEnemyType: 'dragon',
      }
    }
  ],

  startPosX: 40,
  
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
} else {
  if (enemy == 'warrior') {
    hero.swordAttack();
  } else {
    hero.spearAttack();
  }
}
`;

const startCodeVal =
`// Будет запущено несколько тестов

// Переменная enemy будет хранить тип врага
var enemy = getEnemyType();

// Поправь код ниже
if (enemy == 'archer') {
  hero.swordAttack();
} else {
  if (enemy == 'warrior') {
    hero.swordAttack();
  } else {
    hero.spearAttack();
  }
}
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
