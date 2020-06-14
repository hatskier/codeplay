// TODO update this file to enable support of commands removal

import createOrderTask from './order-task';

export default () => createOrderTask({
  images: {
    'body': 'https://codenplay.io/img/tasks/avengers/iron-man/iron-man-body.gif', 
    'flying': 'https://codenplay.io/img/tasks/avengers/iron-man/iron-man-flying.gif',
    'hands': 'https://codenplay.io/img/tasks/avengers/iron-man/iron-man-hands.gif',
    'head': 'https://codenplay.io/img/tasks/avengers/iron-man/iron-man-head.gif',
    'start': 'https://codenplay.io/img/tasks/avengers/iron-man/iron-man-start.png',
  },
  methods: {
    'takeHands': {
      bg: 'hands',
      doc: 'Iron man takes iron hands',
      log: 'Iron man is taking his iron hands...',
      examples: 'takeHands();',
    },
    'takeBody': {
      bg: 'body',
      doc: 'Iron man takes iron body',
      examples: 'takeBody();',
      log: 'Iron man is taking his iron body...',
    },
    'takeHead': {
      bg: 'head',
      doc: 'Iron man takes iron helmet',
      examples: 'takeHead();',
      log: 'Iron man is taking his iron head...',
    },
    'fly': {
      bg: 'flying',
      doc: 'Iron man flies',
      examples: 'fly();',
      log: 'Iron man is flying...',
    }
  },
  docTableExtended: true,
  size: {
    width: 550,
    height: 450
  },
  tickTime: 2500,
  startWithBg: 'start',
  
  order: ['hands', 'body', 'head', 'flying'],

  taskDescription: 'Imagine you are Iron Man. Let’s get your outfit on to fly and save your friends.',

  startCodeVal: ``,
  solutionCode: ``,
});
