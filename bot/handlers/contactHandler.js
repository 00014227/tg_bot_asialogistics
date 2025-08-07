const sheetsService = require('../../services/sheetsService');
const t = require('../utils/lang')

module.exports = (bot, userState) => {

    bot.on('contact', async (msg) => {
        const chatId = msg.chat.id;
        const contact = msg.contact;

        userState[chatId].contact = contact;

        await sheetsService.appendRow('Контакты!A2', [
            contact.user_id,
            contact.first_name,
            contact.phone_number,
            new Date().toLocaleString(),
        ]);
        const langCode = userState[chatId].lang || 'ru';

        bot.sendMessage(chatId, t(langCode, 'thank_you'), {
            
            reply_markup: {
                keyboard: [
                    [t(langCode, 'menu_check_status')],
                    [t(langCode, 'menu_calculator'), t(langCode, 'menu_order')],
                    [t(langCode, 'menu_info'), t(langCode, 'menu_pickup_points')]
                ],
                resize_keyboard: true,
            },
        });
    });
};
