import prepareQuestion from './question';

export default prepareQuestion({
  images: {
    'granny': 'https://codenplay.io/img/tasks/question/call-granny.gif',
    'question': 'https://codenplay.io/img/tasks/question/question.gif',
    'procrastination': 'https://codenplay.io/img/tasks/question/procrastinating.gif',
    'dancing': 'https://codenplay.io/img/tasks/question/club-dancing.gif'
  },

  startWithBg: 'question',

  size: {
    width: 600,
    height: 450
  },

  methods: {
    'callGranny': {
      doc: 'Call granny and ask how she is doing',
      bg: 'granny',
      log: 'Calling granny...'
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
    }
  },

  tickTime: 2000,

  taskDescription: 'You haven\'t spoken with your granny for a long time. She needs for attention. Please select the right action for this case',

  rightChoice: 'callGranny',

  startCodeVal:
`// You haven't spoken with your granny for a long time
// Choose the right action
`,

});