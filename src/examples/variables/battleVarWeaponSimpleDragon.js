// TODO implement
import prepareBattle from './battleVar';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    // {
    //   enemies: {
    //     'Warrior': {
    //       action() {
    //         return 'skip';
    //       },

    //       kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
    //       location: 48
    //     }
    //   },
    //   funResults: {
    //     getPerfectWeapon: 'sword',
    //   }
    // },

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
        // getPerfectWeapon: 'spear',
      }
    }
  ],

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 12,

  solutionCode:
`// Defeat the dragon

// Select the correct option
// and uncomment it (remove //)
// hero.attackWith('sword');
hero.attackWith('spear');
`,

startCodeVal:
`// Defeat the dragon

// Select the correct option
// and uncomment it (remove //)
// hero.attackWith('sword');
// hero.attackWith('spear');
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;
