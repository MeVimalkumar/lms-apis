const { Sequelize } = require('sequelize')
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER } = require('../data/config')

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to ' + DB_NAME);
        await sequelize.sync()
        // console.log('Sequelize synchronised');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()


module.exports = sequelize