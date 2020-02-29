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
          location: 58
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
`// Сделай 3 шага с помощью цикла
var counter = 0;

// Откомментируй одну из инструкций
while (counter < 3) {
  counter++;
  // counter--;
  // counter = counter - 1;
  // counter = 100500;
  hero.go();
}

hero.attack();
`,

  startCodeVal:
`// Сделай 3 шага с помощью цикла
var counter = 0;

// Откомментируй одну из инструкций
while (counter < 3) {
  // counter++;
  // counter--;
  // counter = counter - 1;
  // counter = 100500;
  hero.go();
}

hero.attack();
`
});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
