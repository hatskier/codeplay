import prepareQuestion from './question';

export default prepareQuestion({
  images: {
    'question': 'https://codenplay.io/img/tasks/question/question-emoji.gif',
    'procrastination': 'https://codenplay.io/img/tasks/question/procrastinating.gif',
    'dancing': 'https://codenplay.io/img/tasks/question/club-dancing.gif',
    'computer': 'https://codenplay.io/img/tasks/question/work-hard.gif',
    'money': 'https://codenplay.io/img/tasks/question/spend-money.gif',
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