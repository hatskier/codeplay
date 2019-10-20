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
          location: 48
        }
      },
      funResults: {
        getDistance: 1
      }
    },

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
        getDistance: 2
      }
    },

    {
      enemies: {
        'Warrior': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 78
        }
      },
      funResults: {
        getDistance: 3
      }
    },
  ],

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 12,

  solutionCode:
`// Defeat the warrior
// Come closer and attack using your sword
// Distance to your enemy may differ
// Hint: you can use variable "distance"

var distance = getDistance();

// Write your code below
hero.move(distance);
hero.attack();
`,

startCodeVal:
`// Defeat the warrior
// Come closer and attack using your sword
// Distance to your enemy may differ
// Hint: you can use variable "distance"

var distance = getDistance();

// Write your code below
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
// delete conf.methods["hero.swordAttack"];
// delete conf.methods['hero.spearAttack'];
delete conf.methods['hero.attackWith'];

export default conf;