import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Warrior': {
          action(tickNr) {
            // if (tickNr % 2 == 1) {
            //   return 'attack';
            // } else {
            //   return 'skip';
            // }
            return 'skip';
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 59
        },
        'Warrior2': {
          action(tickNr) {
            if (tickNr % 2 == 0) {
              return 'attack';
            } else {
              return 'skip';
            }
          },

          kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
          location: 69
        },
      }
    }
  ],

  startPosX: 40,
  shortDescription: true,
  stepsArgSupported: false,

});

const startCodeVal =
`// The first warrior is lazy
// and will not attack you.
// But the second warrior will
// attack in every second round
`;

const solutionCode =
`// The first warrior is lazy
// and will not attack you.
// But the second warrior will
// attack in every second round
hero.go();
hero.attack();
hero.skip();
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
