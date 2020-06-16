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
`// Multiple tests will be started
var enemy = getEnemy();

function attack(currentEnemy) {
  if (currentEnemy == 'dragon') {
    // Attack with spear
  }
  if (currentEnemy == 'warrior') {
    // Attack with sword
  }
}

attack(enemy);
`;

const solutionCode =
`// Multiple tests will be started
var enemy = getEnemy();

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
