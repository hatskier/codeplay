import prepareBattle from './battle';

let conf = prepareBattle({
  enemies: {
    'Archer': {
      action(tickNr) {
        if (tickNr == 0) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'archer', // enum: ['archer', 'warrior', 'dragon']
      location: 60
    }
  },

  stepWidth: 10,
  startPosX: 33,
  maxTicksToWin: 3,

  startCodeVal:
`hero.defend();
hero.go();
hero.go();
hero.attack();

`
});

conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;