import prepareQuestion from './question';

export default prepareQuestion({
  images: {
    'question': 'https://s3.amazonaws.com/alcourses.codeplay/question/question-chin.gif',
    'procrastination': 'https://s3.amazonaws.com/alcourses.codeplay/question/procrastinating.gif',
    'dancing': 'https://s3.amazonaws.com/alcourses.codeplay/question/club-dancing.gif',
    'computer': 'https://s3.amazonaws.com/alcourses.codeplay/question/work-hard.gif',
    'reading': 'https://s3.amazonaws.com/alcourses.codeplay/question/reading.gif'
  },

  startWithBg: 'question',

  size: {
    width: 600,
    height: 450
  },

  methods: {
    'readMoreBooks': {
      doc: 'Read more books and become smarter',
      bg: 'reading',
      log: 'Reading more books...'
    },
    'procrastinate': {
      doc: 'Do absolutely nothing (procrastinate)',
      bg: 'procrastination',
      log: 'Procrastinating...'
    },
    'goToClub': {
      doc: 'Go to club and have fun',
      bg: 'dancing',
      log: 'Dancing in a club...'
    },
    'playComputerGames': {
      doc: 'Play computer games',
      bg: 'computer',
      log: 'Playing computer games...'
    }
  },

  tickTime: 2000,

  taskDescription: `You have noticed that you don't have enough words to describe your thoughts. Select the right action to fix that problem`,

  rightChoice: 'readMoreBooks',

  startCodeVal:
`// You've noticed that usually you don't have
// enough words to describe your thoughts.
// What should you do solve this problem?

`,

});