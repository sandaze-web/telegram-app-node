const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

class BotController {
    async send(req, res, next) {
        const {query_id} = req.body;
        console.log(query_id)
        console.log(111)
        try {
            await bot.answerWebAppQuery(query_id, {
                type: 'article',
                id: query_id,
                title: 'Успешная покупка',
                input_message_content: {
                    message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму`
                }
            })
            return res.status(200).json({});
        } catch (e) {
            return res.status(500).json({})
        }
    }
}

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Вы можете открыть каталог товаров по этой кнопке, или в пункте иеню', {
            reply_markup: {
                keyboard: [
                    [{text: 'Открыть каталог', web_app: {url: process.env.BOT_APP_URL}}]
                ]
            }
        });
    }
});

module.exports = new BotController()
