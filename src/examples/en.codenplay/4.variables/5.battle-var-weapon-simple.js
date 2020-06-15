import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Dragon': {
          action(tickNr) {
            if (tickNr == 0) {
              return 'attack';
            } else {
              return 'skip';
            }
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 28
        }
      },
    }
  ],

  startPosX: 40,
  
  stepsArgSupported: true,
  shortDescription: true,

});

const startCodeVal =
`// Change value of weapon variable
var weapon = 'sword';
hero.defend();
hero.attackWith(weapon);
`;

const solutionCode =
`// Change value of weapon variable
var weapon = 'spear';
hero.defend();
hero.attackWith(weapon);
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
