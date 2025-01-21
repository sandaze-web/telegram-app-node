const uuid = require('uuid')
const path = require('path');
const {Clother} = require('../models/models')
const ApiError = require('../error/ApiError');
const bot = require("../botTelegram");

class BotController {
    async send(req, res, next) {
        const {query_id} = req.body;

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

module.exports = new BotController()
