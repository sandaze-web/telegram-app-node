const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// const User = sequelize.define('user', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true,},
// })

// const Basket = sequelize.define('basket', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

const Basket = sequelize.define('basket_clother', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    clother_id: {type: DataTypes.INTEGER},
    size: { type: DataTypes.STRING,}
})

const Clother = sequelize.define('clother', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    sizes: { type: DataTypes.JSON,  allowNull: false }
})

// Clother.hasMany(BasketDevice)
// BasketDevice.belongsTo(Clother)
// Basket.hasMany(Clother, { foreignKey: 'clother_id' });
// Clother.belongsTo(Basket, { foreignKey: 'clother_id' });
// Исправляем связь
Basket.belongsTo(Clother, {foreignKey: 'clother_id'});  // Корзина принадлежит товару
Clother.hasMany(Basket, {foreignKey: 'clother_id'});  // Товар может быть в нескольких корзинах

module.exports = {
    Basket,
    Clother,
}





