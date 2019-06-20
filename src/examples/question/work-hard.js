import prepareQuestion from './question';

export default prepareQuestion({
  images: {
    'question': 'https://s3.amazonaws.com/alcourses.codeplay/question/question-emoji.gif',
    'procrastination': 'https://s3.amazonaws.com/alcourses.codeplay/question/procrastinating.gif',
    'dancing': 'https://s3.amazonaws.com/alcourses.codeplay/question/club-dancing.gif',
    'computer': 'https://s3.amazonaws.com/alcourses.codeplay/question/work-hard.gif',
    'money': 'https://s3.amazonaws.com/alcourses.codeplay/question/spend-money.gif',
  },

  startWithBg: 'question',

  size: {
    width: 600,
    height: 450
  },

  methods: {
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
    'workHard': {
      doc: 'Work hard to chieve your dreams',
      bg: 'computer',
      log: 'Working hard...'
    },
    'spendMoreMoney': {
      doc: 'Spend  more money',
      bg: 'money',
      log: 'Spending more money...'
    }
  },

  tickTime: 2000,

  taskDescription: 'You have a goal and you want to achieve it. Pick the right action',

  rightChoice: 'workHard',

  startCodeVal:
`// You have a goal and you want to achieve it
// Pick the right action
`,

});