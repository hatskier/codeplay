import prepareBattle from './battle';

export default prepareBattle({
  enemies: {
    'Dragon': {
      action(tickNr) {
        if (tickNr === 2 || tickNr == 4) {
          return 'attack';
        } else {
          // return 'attack';
          return 'skip';
        }
        
      },

      kind: 'dragon',
      location: 50
    },

    'Warrior': {
      action(tickNr) {
        if (tickNr % 2 === 1) {
          return 'attack';
        } else {
          return 'skip';
        }
      },

      kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
      location: 75
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
      location: 60
    }
  },

  startCodeVal:
`// You need to attack
hero.go();
hero.defend();
hero.defend();
hero.defend();
hero.defend();
hero.go();
hero.defend();
hero.swordAttack();
hero.go();
hero.spearAttack();
hero.go();
hero.defend();
hero.swordAttack();

`,

  stepWidth: 10,
  startPosX: 34,
  maxTicksToWin: 50,
});