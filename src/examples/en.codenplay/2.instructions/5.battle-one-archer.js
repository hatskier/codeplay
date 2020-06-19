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
    },
  ],

  startPosX: 34,
  shortDescription: true,
  stepsArgSupported: false,

});

const startCodeVal =
`// In this level your enemy (archer)
// can attack your from any distance

// The archer will attack only 2 times
// at the beginning

hero.defend();
`;

const solutionCode =
`// In this level your enemy (archer)
// can attack your from any distance

// The archer will attack only 2 times
// at the beginning

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
