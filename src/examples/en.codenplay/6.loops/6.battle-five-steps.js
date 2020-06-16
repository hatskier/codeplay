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
          location: 78
        }
      },
    },
  ],

  startPosX: 20,
  shortDescription: true,
  
  requirements: {
    minInstructionsInWhileLoops: 3,
  },

  solutionCode:
`// Make 5 steps using loop
// Just replace one letter or digit
var counter = 0;
while (counter < 5) {
  counter++;
  hero.go();
}

hero.attack();
`,

  startCodeVal:
`// Make 5 steps using loop
// Just replace one letter or digit
var counter = 0;
while (counter < 3) {
  counter++;
  hero.go();
}

hero.attack();
`,
});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
