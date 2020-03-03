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
  

  solutionCode:
`// Defeat the warrior and the dragon

// Distance to warrior
var distance = getDistance();

// Add one instruction below
hero.go(1);
hero.attackWith('spear');
hero.go(distance - 1);
hero.attackWith('sword');
`,

startCodeVal:
`// Defeat the warrior and the dragon

// Distance to the warrior
var distance = getDistance();

// Add one instruction below
hero.go(1);
hero.attackWith('spear');
hero.go(distance - 1);
`
});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];
// delete conf.methods['hero.attackWith'];

export default conf;
