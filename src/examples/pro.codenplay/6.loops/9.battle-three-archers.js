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

  // maxTicksToWin: 6,
  
  requirements: {
    minInstructionsInWhileLoops: 6,
  },

  solutionCode:
`// Одолей всех врагов
var counter = 0;
hero.go();
while (counter < 3) {
  counter++;
  hero.go();
  hero.attack();
}
`,

  startCodeVal:
`// Одолей всех врагов
var counter = 0;
hero.go();
while (counter < 3) {
  // Добавь здесь код
}
`,
});

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods["hero.spearAttack"];

export default conf;
