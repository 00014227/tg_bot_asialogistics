const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const startHandler = require('./handlers/startHandler');
const contactHandler = require('./handlers/contactHandler');
const statusHandler = require('./handlers/statusHandler');
const infoHandler = require('./handlers/infoHandler');
const miniAppHandler = require('./handlers/miniAppHandler');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const userState = {}; // Хранилище состояний пользователей

// Регистрируем handlers
startHandler(bot, userState);
contactHandler(bot, userState);
statusHandler(bot, userState);
infoHandler(bot, userState);
miniAppHandler(bot, userState);

module.exports = bot;
