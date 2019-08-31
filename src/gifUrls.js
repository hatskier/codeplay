import Logger from './logger';

export default {
  success: [
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/barnie-success.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/bear-success.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/brad-pit-success.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/fortnite-dance-1-success.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/fortnite-dance-2-success.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/friends-success.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/hangover-success.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/jump-success.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Success/tony-stark-success.gif'
  ],
  fail: [
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/incorrect.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-cock.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-duck.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-gray.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-guitar.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-indian.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-kid.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-minion.gif',
    // 'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-no-no.gif', // too large size
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-old-man.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-show.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-parrot.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/no-try-again.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/nope-commentator.gif',
    'https://s3.amazonaws.com/alcourses.codeplay/Gifs/Fail/wrong.gif'
  ],
  thanks: [
    'https://media.giphy.com/media/WRcqyW4t75sTCMrMM0/giphy.gif',
    'https://media.giphy.com/media/QAsBwSjx9zVKoGp9nr/giphy.gif',
    'https://media.giphy.com/media/26gsjCZpPolPr3sBy/giphy.gif',
    'https://media.giphy.com/media/l3q2wJsC23ikJg9xe/giphy.gif',
    'https://media.giphy.com/media/3o6ozm2sJ102JdumVq/giphy.gif',
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
    for (let type of ['success', 'fail', 'thanks']) {
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
