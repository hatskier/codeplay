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
`
`,

startCodeVal:
`
var counter = 0;

while (counter < 5) {
  counter++;
  hero.go();
}

hero.attack();
`
});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
