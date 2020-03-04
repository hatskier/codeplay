import Tour from 'tour';

const myTour = {
  config: {
    mask: {
     visible: true, // Shows the element mask
     clickThrough: false, // Allows the user to interact with elements beneath the mask
     clickExit: false, // Exit the tour when the user clicks on the mask
     scrollThrough: true, // Allows the user to scroll while hovered over the mask
     color: 'rgba(0,0,0,.7)' // The mask color
    },
    container: 'body', // The container to mask
    scrollBox: 'body', // The container to scroll when searching for elements
    previousText: 'Previous',
    nextText: 'Next',
    finishText: 'Finish',
    animationDuration: 400, // Animation Duration for the box and mask
    dark: false // Dark mode (Works great with `mask.visible = false`)
   },
  canExit: true,
  previousText: 'Назад',
  nextText: 'Дальше',
  finishText: 'Поехали!',
  steps: [
  {
    target: '.window',
    content: 'Сначала прочти описание задания и доступных инструкций',
  }, {
    target: '#code-editor',
    content: 'Затем напиши код решения здесь. Зеленые строки с // - это комментарии, они игнорируются компьютером',
  }, {
    target: '#run-button',
    content: 'Если код готов, нажми на эту кнопку',
  }, {
    target: '#screen-view',
    content: 'И смотри на экране как выполняется программа',
  }, {
    target: '.window',
    content: 'Здесь кстати будет выписываться вспомогательная информация (логи)',
  }
]
};


export default {
  async start() {
    await Tour.start(myTour);
  }
};