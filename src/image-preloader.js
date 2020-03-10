import Logger from './logger';
import lessonConfigs from './lesson-configs';
import gifUrls from './gifUrls';

const START_PRELOADING_TIMEOUT = 7000; // ms (increased to 7'000)

window.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    startImagePreloading();
  }, START_PRELOADING_TIMEOUT);
});

async function startImagePreloading() {
  // Lessons images preloading
  // TODO uncomment to enable
  // for (let lessonConfigName in lessonConfigs) {
  //   Logger.info(`-------- PreLoading images for config: ${lessonConfigName} - started --------`);
  //   let config = lessonConfigs[lessonConfigName];
  //   await preLoadImagesForConfig(config);
  //   Logger.info(`-------- PreLoading images for config: ${lessonConfigName} - finished --------`);
  // }

  // Gifs preloading
  for (let gifType of ['success', 'fail']) {
    Logger.info(`-------- Preloading gifs for type: ${gifType} - started --------`);
    for (let gifUrl of gifUrls[gifType]) {
      Logger.info(`PreLoading image ${gifUrl} - started`);
      await preLoadImage(gifUrl);
      Logger.info(`PreLoading image ${gifUrl} - started`);
    }
    Logger.info(`-------- Preloading gifs for type: ${gifType} - finished --------`);
  }

  Logger.info(`--------------------------------------`);
  Logger.info(`-------- Preloading finished! --------`);
}

async function preLoadImagesForConfig(conf) {
  for (const imageKey in conf.images) {
    const url = conf.images[imageKey];
    Logger.info(`PreLoading image ${url} - started`);
    await preLoadImage(url);
    Logger.info(`PreLoading image ${url} - finished`);
  }
}

// TODO refactor
// this function is duplicated in lesson.js
function preLoadImage(url) {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    // resolve();
    img.onerror = function () {
      reject(`Failed to load image: ${url}`);
    };
  });
}
