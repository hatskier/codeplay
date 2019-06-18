import prepareBattle from './battle';

export default prepareBattle({
  enemies: {
    'Warrior': {
      action(tickNr) {
        if (tickNr % 2 === 1) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
      location: 80
    },

    'Dragon': {
      action(tickNr) {
        if (tickNr === 2 || tickNr == 4) {
          return 'attack';
        } else {
          return 'skip';
        }
        
      },

      kind: 'dragon',
      location: 70
    },

    'Archer': {
      action(tickNr) {
        if (tickNr === 1 || tickNr === 3) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'archer',
      location: 70
    }
  },

  startCodeVal:
`// You need to attack
hero.spearAttack();
hero.defend();
hero.defend();
hero.defend();
hero.defend();
hero.defend();
hero.defend();
hero.defend();
hero.defend();
hero.defend();
`,

  stepWidth: 20,
  startPosX: 45,
  maxTicksToWin: 50,
});