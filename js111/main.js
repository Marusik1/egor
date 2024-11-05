const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Токен бота, полученный в @BotFather
const token = '6520991949:AAFlFvJ-MFi3bDl5ecJQa-qnaIg35V7XKx0';
const bot = new TelegramBot(token, { polling: true });

// Обработка команд
bot.on('message', (msg) => {
  // Проверка, является ли сообщение текстом
  if (msg.text) {
    // Обработка команды "/start"
    if (msg.text === '/start') {
      bot.sendMessage(msg.chat.id, 'Привет! Отправьте мне URL PDF-файла, и я пришлю его вам.');
    } else {
      // Обработка URL
      const url = msg.text;
      downloadPdf(url, msg.chat.id);
    }
  }
});

// Загрузка PDF-файла по URL
const downloadPdf = async (url, chatId) => {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const filename = url.split('/').pop();

    // Сохранение PDF-файла
    fs.writeFileSync(filename, buffer);

    // Отправка PDF-файла
    bot.sendDocument(chatId, { filename: filename, source: filename });

    // Удаление временного файла
    fs.unlinkSync(filename);
  } catch (error) {
    console.error('Ошибка загрузки PDF-файла:', error);
    bot.sendMessage(chatId, 'Произошла ошибка при загрузке файла.');
  }
};

// Запуск сервера
bot.on('polling_error', (error) => {
  console.error(error);
});

console.log('Бот запущен!');