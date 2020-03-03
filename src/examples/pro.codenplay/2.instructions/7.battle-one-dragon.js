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
  
  stepsArgSupported: false,

});

const startCodeVal =
`// Одолей дракона
// Меч против него бессилен
`;

const solutionCode =
`// Одолей дракона
// Меч против него бессилен
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
