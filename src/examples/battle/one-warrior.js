import prepareBattle from './battle';

let conf = prepareBattle({
  enemies: {
    'Warrior': {
      action(tickNr) {
        // if (tickNr == 0 || tickNr == 1) {
        //   return 'attack';
        // } else {
        //   return 'skip';
        // }
        return 'skip';
      },

      kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
      location: 58
    }
  },

  stepWidth: 10,
  startPosX: 40,
  maxTicksToWin: 12,

  solutionCode:
`// Defeat the warrior
// Come closer and attack using your sword
hero.go();
hero.attack();
`,

startCodeVal:
`// Defeat the warrior
// Come closer and attack using your sword
`
});

conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;