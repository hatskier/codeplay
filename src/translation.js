// Translation module iterates over all html objects
// with notranslate class and if translation
// exists it replaces the element inner content

const translationsFromEnglish = {
  ru: {
    'Available instructions': 'Доступные инструкции',
    'Please note': 'Обрати внимание',
    'Each instruction should end with ();': 'Каждая инструкция должна заканчиваться ();',
    'Comments (lines with // at the beginning) are ignored by program executor': 'Комментарии (строки с // в начале) игнорируются при выполнении программы',
    'Task': 'Задание',

    // Tasks descriptions
    'Write the directions for the man to get through the labyrinth': 'Напиши алгоритм, по которому пещерный человек пройдет лабиринт',
    'Imagine you are iron man. Let’s get your outfit on to fly and save your friends.': 'Представь, что ты - железный человек. Тебе нужно надеть свой железный суперкостюм и полететь на помощь остальным мстителям'

  },
  pl: {
    'Available instructions': 'Dostępne instrukcje',
    'Please note': 'Zwróć uwagę',
    'Each instruction should end with ();': 'Każda instrukcja powinna się kończyć na ();',
    'Comments (lines with // at the beginning) are ignored by program executor': 'Komentarze (linijki z // na początku) są ignorowane podczas wykonywania programu',
    'Task': 'Zadanie',

    // Tasks descriptions
    'Write the directions for the man to get through the labyrinth': 'Napisz algorytm, według którego jaskiniowiec przejdzie przez labirynt',
  },
};

let commentsTranslationFromEnglish = {
  ru: {
    '// Write the directions for the man': '// Напиши как пещерному человеку идти',
    '// to get through the labyrinth': '// чтобы пройти лабиринт',

    '// Let’s get iron man into his outfit': '// Железный человек должен надеть суперкостюм',
    '// Then make him fly to save the world': '// И полететь на помощь остальным мстителям',
  },
  pl: {
    '// Write the directions for the man': '// Wskaż kierunki dla jaskiniowca',
    '// to get through the labyrinth': '// żeby przejść przez labirynt',
  },
};

function debugPrint(str) {
  // console.log('------ 0101001-------');
  // console.log('DEBUG PRINTING');

  let res = '';
  for (let c of str) {
    res += ('|' + c.charCodeAt(0) + '|');
  }
  console.log(res);

  // console.log('------ 0101001-------');
}

function translateElement(el, lang) {
  // We do this replace to avoid problem with non-breaking spaces
  let text = el.textContent.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
  let translation = translationsFromEnglish[lang][text];
  if (translation) {
    el.textContent = translation;
  }
}

function translateComments(lang) {
  // let comments = document.getElementsByClassName('mtk8');
  // for (let comment of comments) {
  //   console.warn('COMMECNT');
  //   console.warn(JSON.stringify(comment.textContent));
  //   translateElement(comment, lang);
  // }

  console.log('Comments translation started');
  let codeVal = window.editor.getValue();
  for (let comment in commentsTranslationFromEnglish[lang]) {
    codeVal = codeVal.replace(
      new RegExp(comment, 'g'),
      commentsTranslationFromEnglish[lang][comment]);
  }
  window.editor.setValue(codeVal);
}

function translatePage(lang) {
  console.log(`--- Translation to ${lang} started ---`);

  let translatableElements = document.getElementsByClassName('notranslate');
  console.log(`${translatableElements.length} translatable elements found. Translating...`);

  for (let i = 0; i < translatableElements.length; i++) {
    translateElement(translatableElements[i], lang);
  }

  // hacky comments translation
  setTimeout(() => {
    translateComments(lang);  
  }, 300);
}

// function translateLogs() {
//   let elements = document.getElementsByClassName('command');
//   for (let element of elements) {
//     translateElement(element, window.lang || 'en');
//   }
// }

export default {
  translatePage,
  // translateLogs,
};