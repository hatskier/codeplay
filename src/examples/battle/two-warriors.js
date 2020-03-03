import prepareBattle from './battle';

let conf = prepareBattle({
  enemies: {
    'Warrior': {
      action(tickNr) {
        if (tickNr % 2 == 1) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
      location: 59
    },
    'Warrior2': {
      action(tickNr) {
        if (tickNr % 2 == 0) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
      location: 69
    },
    // 'Archer': {
    //   action(tickNr) {
    //     if (tickNr % 3 == 0) {
    //       return 'attack';
    //     } else {
    //       return 'skip';
    //     }
    //   },

    //   kind: 'archer', // enum: ['archer', 'warrior', 'dragon']
    //   location: 85
    // }
  },

  stepWidth: 10,
  startPosX: 40,

  solutionCode:
`// Defeat all the enemies and don't let them
// kill you
hero.go();
hero.attack();
hero.defend();
hero.go();
hero.attack();
`,

startCodeVal:
`// Defeat all the enemies and don't let them
// kill you

`
});

conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;