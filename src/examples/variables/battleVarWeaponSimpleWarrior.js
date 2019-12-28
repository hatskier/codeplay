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
        // getPerfectWeapon: 'sword',
      }
    },

    // {
    //   enemies: {
    //     'Dragon': {
    //       action() {
    //         return 'skip';
    //       },

    //       kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
    //       location: 28
    //     }
    //   },
    //   funResults: {
    //     getPerfectWeapon: 'spear',
    //   }
    // }
  ],

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 12,

  solutionCode:
`// Defeat the warrior

var weapon = 'sword';

// Just uncomment any of lines below
hero.attackWith(weapon);
// hero.attackWith('sword');
`,

startCodeVal:
`// Defeat the warrior

var weapon = 'sword';

// Just uncomment any of lines below
// hero.attackWith(weapon);
// hero.attackWith('sword');
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;
