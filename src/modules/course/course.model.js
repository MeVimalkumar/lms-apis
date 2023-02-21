const { Model, DataTypes } = require("sequelize");
const sequelize = require('../../lib/db.connection')
const UserModel = require('../user/user.model')

class CourseModel extends Model { }

CourseModel.init({
    courseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
    },
    createdById: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'userId'
        },
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'Course',
    tableName: 'mstCourses',
    defaultScope: {
        attributes: {
        }, order: [['courseId', 'DESC']]
    },
})

module.exports = CourseModel