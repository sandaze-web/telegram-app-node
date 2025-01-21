const uuid = require('uuid')
const path = require('path');
const {Basket, Clother} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    async add(req, res) {
        let {userName, id_cloth, size} = req.body

        let clotherBasket = await Basket.create({name: userName, clother_id: id_cloth, size})

        return res.json(clotherBasket)
    }
    async delete (req, res) {
        let {userName, id_cloth, size} = req.body

        const basket = await Basket.destroy({
            where: {
                name: userName, // имя пользователя
                clother_id: id_cloth, // id товара
                size: size
            }
        });
        return res.json(basket)
    }

    async getAll(req, res, next) {
        let {userName} = req.query

        try {
            const basket = await Basket.findAll({
                where: { name: userName }, // фильтрация по имени пользователя
                include: [
                    {
                        model: Clother, // подключаем модель Clother для получения данных о товаре
                        // required: true, // Убедимся, что только те корзины, у которых есть связанные товары, будут возвращены
                    },
                ],
            });
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message));  // обработка ошибок
        }
    }
}

module.exports = new BasketController()
