require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const bot = require("./botTelegram");
const botController = require('controllers/botController')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.post('/api/bot/web-data', async (req, res, next) => {
    const {query_id} = req.body;
    console.log(query_id)
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
})

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
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

start()
