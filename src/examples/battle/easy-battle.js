import prepareBattle from './battle';

export default prepareBattle({
  enemies: {
    'warrior': {
      action(tickNr) {
        if (tickNr % 2 === 1) {
          return 'attack';
        } else {
          return 'defend';
        }
      },

      kind: 'warrior', // enum: ['archer', 'warrior', 'dragon']
      location: 80
    },

    'dragon': {
      action(tickNr) {
        if (tickNr === 2) {
          return 'attack';
        } else {
          return 'defend';
        }
        
      },

      kind: 'dragon',
      location: 80
    },

    'archer': {
      action(tickNr) {
        if (tickNr === 1) {
          return 'attack';
        } else {
          return 'defend';
        }
      },

      kind: 'archer',
      location: 70
    }
  },

  startPosX: 10,
  maxTicksToWin: 5,
});