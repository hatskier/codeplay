// TODO implement
import prepareBattle from './battleVar';

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
          location: 48
        }
      },
      funResults: {
        getPerfectWeapon: 'sword',
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
        getPerfectWeapon: 'spear',
      }
    }
  ],

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 12,

  solutionCode:
`// Defeat your enemies

// Note, that there are multiple
// testing iterations
// and your enemies will change

// Fortunately, you have information
// about the most fitting weapon for each
// testing iteration
var weapon = getPerfectWeapon();

// Type your code below
hero.attackWith(weapon);
`,

startCodeVal:
`// Defeat your enemies

// Note, that there are multiple
// testing iterations
// and your enemies will change

// Fortunately, you have information
// about the most fitting weapon for each
// testing iteration
var weapon = getPerfectWeapon();

// Type your code below
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
conf.methods["hero.attackWith"].examples += " <br /> hero.attackWith(weapon);";
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;