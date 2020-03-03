// TODO implement
import prepareBattle from '../variables/battleVar';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
        'Warrior': {
          action(tickNr) {
            if (tickNr == 0) {
              return 'attack';
            }  else {
              return 'skip';
            }
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 59
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
            if (tickNr == 1) {
              return 'attack';
            }  else {
              return 'skip';
            }
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

if (enemy == 'dragon') {
  hero.spearAttack();
}

if (enemy == 'warrior') {
  hero.defend();
  hero.go();
  hero.swordAttack();
}
`,

startCodeVal:
`// Fix the code

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