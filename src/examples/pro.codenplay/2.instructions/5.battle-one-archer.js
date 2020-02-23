import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Archer': {
          action(tickNr) {
            if (tickNr == 0 || tickNr == 1) {
              return 'attack';
            } else {
              return 'skip';
            }
          },
          kind: 'archer',
          location: 60
        }
      },
    }
  ],

  startPosX: 34,
  maxTicksToWin: 10,

});

const startCodeVal =
`// Defeat the archer and don't let him kill you
// Archer could attack you from any distance
// Use your shield to defend
hero.defend();
`;

const solutionCode =
`// Defeat the archer and don't let him kill you
// Archer could attack you from any distance
// Use your shield to defend
hero.defend();
hero.defend();
hero.go();
hero.go();
hero.attack();
`;

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.swordAttack"];
delete conf.methods['hero.spearAttack'];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
