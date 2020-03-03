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
          location: 58
        },

        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 28
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
        },

        'Dragon': {
          action() {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 28
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
          location: 28
        },
      },
      funResults: {
        getDistance: 3
      }
    },
  ],

  stepWidth: 10,
  startPosX: 40,
  

  solutionCode:
`// Defeat the warrior and the dragon
// Attack the dragon firstly
// Then come to the warrior and use
// your sword
// Distance to the warrior may differ
// Hint: you can use variable "distance"

var distance = getDistance();

// Write your code below
hero.attackWith('spear');
hero.go(distance);
hero.attackWith('sword');
`,

startCodeVal:
`// Defeat the warrior and the dragon
// Attack the dragon firstly
// Then come to the warrior and use
// your sword
// Distance to the warrior may differ
// Hint: you can use variable "distance"

var distance = getDistance();

// Write your code below
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;
