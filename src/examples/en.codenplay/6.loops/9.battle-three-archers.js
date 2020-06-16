import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    // Enemies in first iteration
    {
      enemies: {
        'Warrior1': {
          action(tickNr) {
            return 'skip';
          },

          kind: 'archer', // enum: ['archer', 'warrior', 'dragon']
          location: 38
        },
        'Warrior2': {
          action(tickNr) {
            return 'skip';
          },

          kind: 'archer', // enum: ['archer', 'warrior', 'dragon']
          location: 48
        },
        'Warrior3': {
          action(tickNr) {
            return 'skip';
          },

          kind: 'archer', // enum: ['archer', 'warrior', 'dragon']
          location: 58
        }
      },
      // funResults: {
      //   getDistance: 1
      // }
    },
  ],

  startPosX: 10,
  shortDescription: true,

  // 
  
  requirements: {
    minInstructionsInWhileLoops: 6,
  },

  solutionCode:
`// Defeat all your enemies
var counter = 0;
hero.go();
while (counter < 3) {
  counter++;
  hero.go();
  hero.attack();
}
`,

  startCodeVal:
`// Defeat all your enemies
var counter = 0;
hero.go();
while (counter < 3) {
  // Add some instructions here
}
`,
});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;