import prepareBattle from './battle';

let conf = prepareBattle({
  enemies: {
    'Warrior': {
      action(tickNr) {
        if (tickNr == 0 || tickNr == 1) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
      location: 58
    }
  },

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 4,

  solutionCode:
`hero.defend();
hero.defend();
hero.go();
hero.attack();

`,

startCodeVal:
`// Defeat the warrior
`
});

conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;