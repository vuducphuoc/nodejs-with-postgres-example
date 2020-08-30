const Sequelize = require('sequelize');
const { sequelize, Op } = require('./../databases/database');

const Task = sequelize.define('tasks', // model's name
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        todoid: {
            type: Sequelize.INTEGER
        },
        isFinished: {
            type: Sequelize.BOOLEAN
        },
    },
    {
        // không thêm các trường timestamps (updateAt, createdAt)
        timestamps: false
    }
);

module.exports = Task;