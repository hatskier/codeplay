import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
        'Warrior1': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        },
        'Warrior2': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 48
        },
        'Warrior3': {
          action() {
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 58
        }
      },
      // funResults: {
      //   getDistance: 1
      // }
    },
  ],

  startPosX: 20,
  shortDescription: true,
  
  requirements: {
    minInstructionsInWhileLoops: 6,
  },

  solutionCode:
`// Defeat all your enemies
var counter = 0;
// Uncomment one instruction
while (counter < 3) {
  counter = counter + 1;
  // counter = counter - 1;
  // counter = counter * 1;
  // counter = counter / 1;
  // counter = counter + 2;
  hero.go();
  hero.attack();
}
`,

  startCodeVal:
`// Defeat all your enemies
var counter = 0;
// Uncomment one instruction
while (counter < 3) {
  // counter = counter + 1;
  // counter = counter - 1;
  // counter = counter * 1;
  // counter = counter / 1;
  // counter = counter + 2;
  hero.go();
  hero.attack();
}
`,
});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
