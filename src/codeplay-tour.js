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
  nextText: 'Proceed!',
  steps: [
  {
    target: '.window',
    content: 'Read the task description and documentation for all the commands you can use'
  }, {
    target: '#code-editor',
    content: 'Then type code here'
  }, {
    target: '#run-button',
    content: 'When you are sure that code is finished click the run button',
  }, {
    target: '#screen-view',
    content: 'And see your program running on the screen!'
  }, {
    target: '.window',
    content: 'Additional logs will be printed here'
  }, {
    target: '#toggle-terminal-mode-button',
    content: 'To toggle logs visibility click this button'
  }, {
    target: '#settings-button',
    content: 'To change program running speed click this button'
  }, {
    target: '#help-button',
    content: 'To see this tour again click this button'
  }
]
};


export default {
  async start() {
    await Tour.start(myTour);
  }
};