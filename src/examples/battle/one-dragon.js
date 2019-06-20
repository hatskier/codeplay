import prepareBattle from './battle';

let conf = prepareBattle({
  enemies: {
    'Dragon': {
      action(tickNr) {
        if (tickNr % 2 == 0) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
      location: 50
    }
  },

  stepWidth: 10,
  startPosX: 14,
  // TODO minimize maxTicksToWin
  maxTicksToWin: 12,

  solutionCode:
`// Defeat the dragon
hero.defend();
hero.go();
hero.defend();
hero.go();
hero.defend();
hero.go();
hero.defend();
hero.go();
hero.defend();
hero.go();
hero.defend();
hero.spearAttack();

`,

startCodeVal:
`// Defeat the dragon
`

});

conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];

export default conf;