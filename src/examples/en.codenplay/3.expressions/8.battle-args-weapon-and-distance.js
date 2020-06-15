import prepareBattle from '../base-configs/battle';

let conf = prepareBattle({
  iterations: [
    {
      enemies: {
        'Dragon': {
          action(tickNr) {
            return 'skip';
          },

          kind: 'dragon', // enum: ['archer', 'warrior', 'dragon']
          location: 50
        },

        'Warrior': {
          action(tickNr) {
            return 'skip';
          },
          kind: 'warrior',
          location: 82,
        }
      }
    }
  ],

  startPosX: 44,
  shortDescription: true,
  stepsArgSupported: true,
});

const startCodeVal =
`// Don't add new instructions to this code
// Add some arguments
hero.go();
hero.attackWith();
hero.go();
hero.attackWith();
`;

const solutionCode =
`// Don't add new instructions to this code
// Add some arguments
hero.go(2);
hero.attackWith('spear');
hero.go(1);
hero.attackWith('sword');
`;

delete conf.methods["hero.attack"];
delete conf.methods["hero.spearAttack"];
delete conf.methods["hero.swordAttack"];

export default {
  ...conf,
  startCodeVal,
  solutionCode,
};
