import Logger from './logger';

export default {
  success: [
    'https://codenplay.io/img/tasks/Gifs/Success/barnie-success.gif',
    'https://codenplay.io/img/tasks/Gifs/Success/bear-success.gif',
    'https://codenplay.io/img/tasks/Gifs/Success/brad-pit-success.gif',
    'https://codenplay.io/img/tasks/Gifs/Success/fortnite-dance-1-success.gif',
    'https://codenplay.io/img/tasks/Gifs/Success/fortnite-dance-2-success.gif',
    'https://codenplay.io/img/tasks/Gifs/Success/friends-success.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Success/hangover-success.gif',
    'https://codenplay.io/img/tasks/Gifs/Success/jump-success.gif',
    'https://codenplay.io/img/tasks/Gifs/Success/tony-stark-success.gif'
  ],
  fail: [
    // 'https://codenplay.io/img/tasks/Gifs/Fail/incorrect.gif', // large
    'https://codenplay.io/img/tasks/Gifs/Fail/no-cock.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/no-duck.gif', // large
    // 'https://codenplay.io/img/tasks/Gifs/Fail/no-gray.gif', // large
    // 'https://codenplay.io/img/tasks/Gifs/Fail/no-guitar.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/no-indian.gif',
    'https://codenplay.io/img/tasks/Gifs/Fail/no-kid.gif',
    'https://codenplay.io/img/tasks/Gifs/Fail/no-minion.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/no-no-no.gif', // too large size
    // 'https://codenplay.io/img/tasks/Gifs/Fail/no-old-man.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/no-show.gif',
    'https://codenplay.io/img/tasks/Gifs/Fail/no-parrot.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/no-try-again.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/nope-commentator.gif', // large
    // 'https://codenplay.io/img/tasks/Gifs/Fail/wrong.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/giphy-tom-cat-no.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/giphy-iron-man-np.gif',
    'https://codenplay.io/img/tasks/Gifs/Fail/giphy-no-2.gif',
    'https://codenplay.io/img/tasks/Gifs/Fail/giphy-no-3.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/giphy-no.gif',
    // 'https://codenplay.io/img/tasks/Gifs/Fail/giphy-shrek-no.gif',
    'https://codenplay.io/img/tasks/Gifs/Fail/giphy-sonic-no.gif',
  ],
  thanks: [
    // Commented for now
    // 'https://media.giphy.com/media/WRcqyW4t75sTCMrMM0/giphy.gif',
    // 'https://media.giphy.com/media/QAsBwSjx9zVKoGp9nr/giphy.gif',
    // 'https://media.giphy.com/media/26gsjCZpPolPr3sBy/giphy.gif',
    // 'https://media.giphy.com/media/l3q2wJsC23ikJg9xe/giphy.gif',
    // 'https://media.giphy.com/media/3o6ozm2sJ102JdumVq/giphy.gif',
  ],

  getRandomImg(array) {
    return array[Math.min(Math.round(Math.random() * array.length), array.length - 1)];
  },

  getFailImg() {
    return this.getRandomImg(this.fail);
  },

  getSuccessImg() {
    return this.getRandomImg(this.success);
  },

  preLoad() {
    for (let type of ['fail', 'success']) {
      Logger.info(`Loading gifs for type: ${type}`);
      for (let imgUrl of this[type]) {
        const img = new Image();
        img.src = imgUrl;
        img.onload = function() {
          Logger.info(`Image loaded: ${imgUrl}`);
        };
      }
    }
  }
};
