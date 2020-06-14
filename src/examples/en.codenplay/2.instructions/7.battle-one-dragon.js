import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
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
      }
    }
  ],

  startPosX: 44,
  shortDescription: true,
  stepsArgSupported: false,

});

const startCodeVal =
`// You should attack the dragon
// Note, sword is useless here ;)
// Dragon will attack in every second round
`;

const solutionCode =
`// You should attack the dragon
// Note, sword is useless here ;)
// Dragon will attack in every second round
hero.defend();
hero.go();
hero.defend();
hero.go();
hero.defend();
hero.spearAttack();
`;

delete conf.methods["hero.attackWith"];
delete conf.methods["hero.attack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
