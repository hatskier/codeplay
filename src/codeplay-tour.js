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
  steps: [{
      target: '#screen-view',
      content: 'This is the screen view!',
  }, {
      target: '#code-editor',
      content: 'Type your code here.'
  }]
};


export default {
  async start() {
    await Tour.start(myTour);
  }
};