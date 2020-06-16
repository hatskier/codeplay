import prepareBattle from '../base-configs/battle';

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

  startPosX: 40,
  
  shortDescription: true,
  codeFontSize: 15,

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

// Fix code below
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

// Fix code below
if (enemy == 'warrior') {
  attackDragon();
} else {
  attackWarrior();
}
`
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;
