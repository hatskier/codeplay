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
      doc: 'Железный человек надевает руки',
      examples: 'takeHands();',
      log: 'Железный человек надевает руки...',
    },
    'takeBody': {
      bg: 'body',
      doc: 'Железный человек надевает тело',
      examples: 'takeBody();',
      log: 'Железный человек надевает тело...',
    },
    'takeHead': {
      bg: 'head',
      doc: 'Железный человек надевает шлем ("head" от англ. "голова")',
      examples: 'takeHead();',
      log: 'Железный человек надевает шлем...',
    },
    'fly': {
      bg: 'flying',
      doc: 'Железный человек летит',
      examples: 'fly();',
      log: 'Железный человек летит...',
    }
  },
  size: {
    width: 550,
    height: 450
  },
  tickTime: 2500,
  startWithBg: 'start',
  order: ['takeHands', 'takeBody', 'takeHead', 'fly'],

  taskDescription: 'Представь, что ты железный человек. Напиши программу, которая оденет тебя в железный костюм и отправит в полёт на помощь друзьям.',

  startCodeVal: ``,
  solutionCode: ``,
});
