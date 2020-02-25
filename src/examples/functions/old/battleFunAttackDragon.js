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
          location: 50
        }
      },
    },
  ],

  stepWidth: 10,
  startPosX: 44,
  maxTicksToWin: 12,

  solutionCode:
`
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

// Add only one instruction below
attackDragon();
`,

startCodeVal:
`
function attackDragon() {
  hero.go();
  hero.go();
  hero.spearAttack();
}

function attackWarrior() {
  hero.go();
  hero.swordAttack();
}

// Add only one instruction below
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
// delete conf.methods["hero.swordAttack"];
// delete conf.methods['hero.spearAttack'];
delete conf.methods['hero.attackWith'];

export default conf;