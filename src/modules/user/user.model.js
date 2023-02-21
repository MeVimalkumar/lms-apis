const { genSaltSync, hashSync, compare } = require('bcrypt');
const { DataTypes, Model, Sequelize } = require('sequelize');
const { SALT_ROUNDS } = require('../../data/config');
const sequelize = require('../../lib/db.connection')

class UserModel extends Model {
    comparePassword(password) {
        return compare(password, this.password)
    }
}

UserModel.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
    },
    role: {
        type: Sequelize.ENUM('USER', 'ADMIN'),
        defaultValue: 'USER'
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'User',
    tableName: 'mstUsers',
    defaultScope: {
        attributes: {
            exclude: ["password"],
        }, order: [['userId', 'DESC']]
    },
    hooks: {
        afterCreate: record => {
            delete record.dataValues.password
        }, afterUpdate: record => {
            delete record.dataValues.password
        }, beforeCreate: user => {
            if (user.password) {
                const salt = genSaltSync(SALT_ROUNDS);
                user.password = hashSync(user.password, salt);
            }
        }, beforeUpdate: user => {
            if (user.password) {
                const salt = genSaltSync(SALT_ROUNDS);
                user.password = hashSync(user.password, salt);
            }
        }
    },
    scopes: {
        withPassword: {
            attributes: {
                include: ['password']
            }
        }
    }
})


module.exports = UserModel