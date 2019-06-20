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
      location: 50
    }
  },

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 5,

  startCodeVal:
`hero.defend();
hero.defend();
hero.go();
hero.attack();

`
});

conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;