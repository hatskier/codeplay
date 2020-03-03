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
          location: 49
        }
      },
      funResults: {
        getEnemy: 'warrior',
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
        getEnemy: 'dragon',
      }
    }
  ],

  startPosX: 40,
  
  stepsArgSupported: true,
  shortDescription: true,

});

const startCodeVal =
`// Будет запущено несколько тестов
var enemy = getEnemy();

// Поправь код функции attack
function attack(currentEnemy) {
  if (currentEnemy == 'dragon') {
    // Добавь здесь инструкцию атаки копьём
  }
  if (currentEnemy == 'warrior') {
    // Добавь здесь инструкцию атаки мечом
  }
}

attack(enemy);
`;

const solutionCode =
`// Будет запущено несколько тестов
var enemy = getEnemy();

// Поправь код функции attack
function attack(currentEnemy) {
  if (currentEnemy == 'dragon') {
    hero.spearAttack();
  }
  if (currentEnemy == 'warrior') {
    hero.swordAttack();
  }
}

attack(enemy);
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
