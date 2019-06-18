import prepareBattle from './battle';

let conf = prepareBattle({
  enemies: {
    'Warrior': {
      action() {
        return 'skip';
      },

      kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
      location: 50
    }
  },

  stepWidth: 10,
  startPosX: 34,
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