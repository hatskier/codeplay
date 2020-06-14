import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
        'Warrior': {
          action(tickNr) {
            if (tickNr == 0) {
              return 'attack';
            }  else {
              return 'skip';
            }
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 59
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
            if (tickNr == 1) {
              return 'attack';
            }  else {
              return 'skip';
            }
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
  
  shortDescription: true,
});

const solutionCode =
`// Будет запущено несколько тестов

// Переменная enemy будет хранить тип врага
var enemy = getEnemyType();

// Поправь код ниже
if (enemy == 'dragon') {
  hero.spearAttack();
}
if (enemy == 'warrior') {
  hero.skip();
  hero.go();
  hero.swordAttack();
}
`;

const startCodeVal =
`// Будет запущено несколько тестов

// Переменная enemy будет хранить тип врага
var enemy = getEnemyType();

// Поправь код ниже
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
