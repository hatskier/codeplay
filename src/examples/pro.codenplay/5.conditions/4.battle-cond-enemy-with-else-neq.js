// TODO replace configuration

import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Archer': {
          action(tickNr) {
            return 'skip';
            // if (tickNr == 0) {
            //   return 'attack';
            // } else {
            //   return 'skip';
            // }
          },

          kind: 'archer', // enum: ['archer', 'warrior', 'dragon']
          location: 49
        }
      },
      funResults: {
        getEnemyType: 'archer',
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
          location: 28
        }
      },
      funResults: {
        getEnemyType: 'dragon',
      }
    },
    {
      enemies: {
        'Warrior': {
          action(tickNr) {
            return 'skip';
            // if (tickNr == 0) {
            //   return 'attack';
            // } else {
            //   return 'skip';
            // }
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 49
        }
      },
      funResults: {
        getEnemyType: 'warrior',
      }
    },
  ],

  startPosX: 40,
  shortDescription: true,

});

const solutionCode =
`// Будет запущено несколько тестов
// Поправь код ниже

var enemy = getEnemyType();

// != значит "не равно"
if (enemy != 'dragon') {
  hero.swordAttack();
} else {
  hero.spearAttack();
}
`;

const startCodeVal =
`// Будет запущено несколько тестов
// Поправь код ниже

var enemy = getEnemyType();

// != значит "не равно"
if (enemy != 'dragon') {
  hero.swordAttack();
} else {
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
