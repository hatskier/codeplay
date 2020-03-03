import prepareBattle from './battle';

let conf = prepareBattle({
  enemies: {
    'Archer': {
      action(tickNr) {
        if (tickNr == 0 || tickNr == 1) {
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
  startPosX: 34,

  solutionCode:
`// Defeat the archer and don't let him kill you
// Archer could attack you from any distance
// Use your shield to defend
hero.defend();
hero.defend();
hero.go();
hero.go();
hero.attack();
`,
  startCodeVal:
`// Defeat the archer and don't let him kill you
// Archer could attack you from any distance
// Use your shield to defend
hero.defend();
`
});

conf.methods["hero.attack"] = conf.methods["hero.swordAttack"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default conf;