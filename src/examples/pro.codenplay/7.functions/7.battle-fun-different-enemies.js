// TODO alex finish this task implementation
import prepareBattle from '../variables/battleVar';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 48
        }
      },
      funResults: {
        getEnemyType: 'dragon',
      }
    },
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
        getEnemyType: 'warrior',
      }
    },
  ],

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 12,

  solutionCode:
`var enemy = getEnemyType();

function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}
function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

// Fix the code below
if (enemy == 'warrior') {
  attackWarrior();
} else {
  attackDragon();
}
`,

startCodeVal:
`var enemy = getEnemyType();

function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}
function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

// Fix the code below
if (enemy == 'warrior') {
  attackDragon();
} else {
  attackWarrior();
}
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
// delete conf.methods["hero.swordAttack"];
// delete conf.methods['hero.spearAttack'];
delete conf.methods['hero.attackWith'];

export default conf;
