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
`// Fix the function winDragon
// and add function winWarrior
function winDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}
function winWarrior() {
  hero.go();
  hero.swordAttack();
}

var enemy = getEnemyType();
if (enemy == 'warrior') {
  winWarrior();
} else {
  winDragon();
}
`,

  startCodeVal:
`// Fix the function winDragon
// and add function winWarrior
function winDragon() {
  hero.go();
  hero.spearAttack();
}

var enemy = getEnemyType();
if (enemy == 'warrior') {
  winWarrior();
} else {
  winDragon();
}
`,
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;