// TODO alex finish this task implementation
import prepareBattle from '../variables/battleVar';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
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
    },
  ],

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 12,

  solutionCode:
`
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

attackWarrior();
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
// delete conf.methods["hero.swordAttack"];
// delete conf.methods['hero.spearAttack'];
delete conf.methods['hero.attackWith'];

export default conf;