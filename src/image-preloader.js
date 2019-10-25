import Logger from './logger';
import lessonConfigs from './lesson-configs';

const START_PRELOADING_TIMEOUT = 3000;

window.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    startImagePreloading();
  }, START_PRELOADING_TIMEOUT);
});

async function startImagePreloading() {
  for (let lessonConfigName in lessonConfigs) {
    Logger.info(`-------- PreLoading images for config: ${lessonConfigName} - started --------`);
    let config = lessonConfigs[lessonConfigName];
    await preLoadImagesForConfig(config);
    Logger.info(`-------- PreLoading images for config: ${lessonConfigName} - finished --------`);
  }
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
