// TODO implement
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
  maxTicksToWin: 12,

  solutionCode:
`// Defeat the warrior
// Come closer and attack using your sword
// Distance to your enemy may differ
// Hint: you can use variable "distance"

var enemy = getEnemyType();

if (enemy == 'dragon') {
  hero.spearAttack();
}

if (enemy == 'warrior') {
  hero.swordAttack();
}
`,

startCodeVal:
`// Defeat the warrior
// Come closer and attack using your sword
// Distance to your enemy may differ
// Hint: you can use variable "distance"

var enemy = getEnemyType();

if (enemy == 'dragon') {
  hero.spearAttack();
}

if (enemy == 'warrior') {
  hero.swordAttack();
}

`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
// delete conf.methods["hero.swordAttack"];
// delete conf.methods['hero.spearAttack'];
delete conf.methods["hero.attackWith"];

export default conf;