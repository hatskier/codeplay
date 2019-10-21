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
        },

        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 38
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
        },

        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        },
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
`// Defeat the warrior and the dragon
// Make 1 step forward and
// attack the dragon
// Then come to the warrior and use
// your sword
// Hint: you can use variable "distance"
// Hint: you can use math operations (like -)

// Distance to warrior
var distance = getDistance();

// Write your code below
hero.go(1);
hero.attackWith('spear');
hero.go(distance - 1);
hero.attackWith('sword');
`,

startCodeVal:
`// Defeat the warrior and the dragon
// Make 1 step forward and
// attack the dragon
// Then come to the warrior and use
// your sword
// Hint: you can use variable "distance"
// Hint: you can use math operations (like -)

// Distance to warrior
var distance = getDistance();

// Write your code below
hero.go(1);
hero.attackWith('spear');
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];
// delete conf.methods['hero.attackWith'];

export default conf;
