const uuid = require('uuid')
const path = require('path');
const {Clother} = require('../models/models')
const ApiError = require('../error/ApiError');

class ClotherController {
    async create(req, res, next) {
        try {
            let {name, price, sizes} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const cloth = await Clother.create({name, price, sizes, img: fileName});

            return res.json(cloth)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        // if (!brandId && !typeId) {
        //     devices = await Device.findAndCountAll({limit, offset})
        // }
        // if (brandId && !typeId) {
        //     devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        // }
        // if (!brandId && typeId) {
        //     devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        // }
        // if (brandId && typeId) {
        //     devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        // }
        devices = await Clother.findAndCountAll({limit, offset})
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const cloth = await Clother.findOne(
            {
                where: {id},
            },
        )
        return res.json(cloth)
    }
}

module.exports = new ClotherController()
