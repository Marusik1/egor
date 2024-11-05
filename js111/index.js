
TOKEN = 'YOUR_BOT_TOKEN'


def start(update, context):
  keyboard = InlineKeyboardMarkup([
    [InlineKeyboardButton("Скачать PDF", callback_data='download_pdf')]
  ])
  update.message.reply_text('Нажмите на кнопку, чтобы скачать PDF-файл', reply_markup=keyboard)


def download_pdf(update, context):
  query = update.callback_query
  query.answer()
  query.message.reply_document(open('path/to/your/pdf.pdf', 'rb'), filename='your_pdf.pdf')

# Запуск бота
updater = Updater(TOKEN)
dispatcher = updater.dispatcher

dispatcher.add_handler(CommandHandler('start', start))
dispatcher.add_handler(CallbackQueryHandler(download_pdf))

updater.start_polling()