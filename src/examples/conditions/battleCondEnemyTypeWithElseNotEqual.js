// TODO implement
import prepareBattle from '../variables/battleVar';

let conf = prepareBattle({
  iterations: [
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
    }
  ],

  stepWidth: 10,
  startPosX: 40,
  

  solutionCode:
`// Fix the code

var enemy = getEnemyType();

if (enemy == 'dragon') {
  hero.spearAttack();
} else {
  hero.swordAttack();
}
`,

startCodeVal:
`// Fix the code
// != means not equal

var enemy = getEnemyType();

if (enemy != 'dragon') {
  hero.swordAttack();
} else {
  hero.swordAttack();
}
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
// delete conf.methods["hero.swordAttack"];
// delete conf.methods['hero.spearAttack'];
delete conf.methods["hero.attackWith"];

export default conf;