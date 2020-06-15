import prepareBattle from '../base-configs/battle';

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

  startPosX: 40,
  
  stepsArgSupported: true,
  shortDescription: true,
});

const startCodeVal =
`// Multiple tests will be started

// Variable distance will get distance
// to the enemy (number of steps)
var distance = getDistance();

hero.go(1); // Coming to dragon
// Replace this comment with some instruction
hero.go(distance - 1);
// Replace this comment as well :)
`;

const solutionCode =
`// Multiple tests will be started

// Variable distance will get distance
// to the enemy (number of steps)
var distance = getDistance();

hero.go(1); // Coming to dragon
hero.attackWith('spear');
hero.go(distance - 1);
hero.attackWith('sword');
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
