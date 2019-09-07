<<<<<<< Updated upstream
// const url = 'https://codenplay.io';
const url = 'file:///Users/alex/Alcourses/codeplay/dist/index.html';
=======
const url = 'https://codenplay.io';
// const url = 'file:///Users/alex/Alcourses/codeplay/dist/index.html';
>>>>>>> Stashed changes


module.exports = {
  'Open codenplay.io' : function (browser) {
    browser
      .url(url)
      .assert.title('Codenplay - main')
      .click('a[href="lesson.html?config=ironMan&nextPage=index.html"]')
      .waitForElementVisible('#Tour-close', 30000)
      .click('#Tour-close')
      .waitForElementVisible('div#code-editor', 1000)
      .execute(function () {
        window.editor.setValue(`
// Solution
takeHands();
takeBody();
takeHead();
fly();`);
      })
      .click('#run-button')
      .waitForElementVisible('#next-lesson-button', 10000)
      .click('#next-lesson-button')
      .end();
  }
};