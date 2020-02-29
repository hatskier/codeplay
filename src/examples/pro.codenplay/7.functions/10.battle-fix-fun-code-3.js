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
  maxTicksToWin: 12,
  shortDescription: true,
  codeFontSize: 15,

  solutionCode:
`// Найди баг и исправь
var enemy = getEnemyType();
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}
function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

if (enemy == 'warrior') {
  attackWarrior();
} else {
  attackDragon();
}
`,

  startCodeVal:
`// Найди баг и исправь
var enemy = getEnemyType();
function attackDragon() {
  hero.go();
  hero.spearAttack();
}
function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

if (enemy == 'warrior') {
  attackWarrior();
} else {
  attackDragon();
}
`,
});

delete conf.methods["hero.attack"];
delete conf.methods["hero.attackWith"];

export default conf;
