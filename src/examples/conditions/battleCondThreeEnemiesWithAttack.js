// TODO implement
import prepareBattle from '../variables/battleVar';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Archer': {
          action(tickNr) {
            return 'skip';
            // if (tickNr == 0) {
            //   return 'attack';
            // } else {
            //   return 'skip';
            // }
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
          action(tickNr) {
            if (tickNr == 0) {
              return 'attack';
            } else {
              return 'skip';
            }
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
          action(tickNr) {
            if (tickNr == 0) {
              return 'attack';
            } else {
              return 'skip';
            }
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 38
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
`// Fix the code

var enemy = getEnemyType();

if (enemy == 'archer') {
  hero.go();
  hero.swordAttack();
}
if (enemy == 'dragon') {
  hero.defend();
  hero.go();
  hero.spearAttack();
}
if (enemy == 'warrior') {
  hero.swordAttack();
}
`,

startCodeVal:
`// Fix the code

var enemy = getEnemyType();

if (enemy == 'archer') {
  hero.go();
  hero.swordAttack();
}
if (enemy == 'dragon') {
  hero.go();
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