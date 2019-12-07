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

  stepWidth: 20,
  startPosX: 44,
  maxTicksToWin: 12,

  solutionCode:
`// Defeat the dragon
// You can't kill the dragon with a sword
hero.defend();
hero.go();
hero.defend();
hero.spearAttack();
`,

startCodeVal:
`// Defeat the dragon
// You can't kill the dragon with a sword
`

});

// conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];

export default conf;