// TODO implement
import prepareBattle from '../variables/battleVar';

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

  stepWidth: 10,
  startPosX: 40,
  

  solutionCode:
`// Fix the code

var enemy = getEnemyType();

if (enemy == 'warrior') {
  hero.swordAttack();
} else {
  if (enemy == 'dragon') {
    hero.spearAttack();
  } else {
    hero.go();
    hero.swordAttack();
  }
}
`,

startCodeVal:
`// Fix the code

var enemy = getEnemyType();

if (enemy == 'warrior') {
  hero.swordAttack();
} else {
  if (enemy == 'dragon') {
    hero.spearAttack();
  } else {
    hero.swordAttack();
  }
}
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
// delete conf.methods["hero.swordAttack"];
// delete conf.methods['hero.spearAttack'];
delete conf.methods["hero.attackWith"];

export default conf;