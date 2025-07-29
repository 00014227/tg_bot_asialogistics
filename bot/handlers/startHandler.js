const t = require('../utils/lang');

module.exports = (bot, userState) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    userState[chatId] = { lang: 'ru' }; // по умолчанию, потом менять после выбора

    bot.sendMessage(chatId, 'Добро пожаловать! Выберите язык 👇\n Xush kelibsiz! Tilni tanlang 👇', {
      reply_markup: {
        keyboard: [['Русский 🇷🇺', 'O‘zbek 🇺🇿']],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === 'Русский 🇷🇺') {
      userState[chatId].lang = 'ru';
      bot.sendMessage(chatId, t('ru', 'send_contact'), {
        reply_markup: {
          keyboard: [
            [{ text: 'Отправить контакт', request_contact: true }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    }

    if (text === 'O‘zbek 🇺🇿') {
      userState[chatId].lang = 'uz';
      bot.sendMessage(chatId, t('uz', 'send_contact'), {
        reply_markup: {
          keyboard: [
            [{ text: 'Kontakt yuborish', request_contact: true }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    }
  });
};
