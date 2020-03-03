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
          location: 68
        }
      },
      funResults: {
        getPerfectWeapon: 'sword',
        getDistance: 2,
      }
    },

    {
      enemies: {
        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        }
      },
      funResults: {
        getPerfectWeapon: 'spear',
        getDistance: 1
      }
    }
  ],

  stepWidth: 10,
  startPosX: 40,
  

  solutionCode:
`// Defeat your enemy
// Come closer and attack
// Distance to your enemy may differ
// Enemy also may differ

var weapon = getPerfectWeapon();
var distance = getDistance();

// Write your code below
hero.go(distance);
hero.attackWith(weapon);
`,

startCodeVal:
`// Defeat your enemy
// Come closer and attack
// Distance to your enemy may differ
// Enemy also may differ

var weapon = getPerfectWeapon();
var distance = getDistance();

// Write your code below
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;