import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Warrior': {
          action(tickNr) {
            if (tickNr % 2 == 1) {
              return 'attack';
            } else {
              return 'skip';
            }
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
  maxTicksToWin: 30,

});

const startCodeVal =
`// Defeat all the enemies and don't let them
// kill you

`;

const solutionCode =
`// Defeat all the enemies and don't let them
// kill you
hero.go();
hero.attack();
hero.defend();
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
