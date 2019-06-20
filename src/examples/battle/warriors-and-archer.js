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
      location: 50
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
      location: 60
    },
    'Archer': {
      action(tickNr) {
        if (tickNr % 3 == 0) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'archer', // enum: ['archer', 'warrior', 'dragon']
      location: 83
    }
  },

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 14,

  solutionCode:
`hero.defend();
hero.defend();
hero.go();
hero.defend();
hero.attack();
hero.defend();
hero.defend();
hero.go();
hero.attack();
hero.defend();
hero.go();
hero.go();
hero.defend();
hero.attack();

`,

startCodeVal:
`// Defeat your enemies
`
});

conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;