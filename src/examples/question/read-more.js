import prepareQuestion from './question';

export default prepareQuestion({
  images: {
    'question': 'https://codenplay.io/img/tasks/question/question-chin.gif',
    'procrastination': 'https://codenplay.io/img/tasks/question/procrastinating.gif',
    'dancing': 'https://codenplay.io/img/tasks/question/club-dancing.gif',
    'computer': 'https://codenplay.io/img/tasks/question/work-hard.gif',
    'reading': 'https://codenplay.io/img/tasks/question/reading.gif'
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