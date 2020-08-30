const Sequelize = require('sequelize');
const { sequelize, Op } = require('../databases/database');

const Task = require('./Task');

const Todo = sequelize.define('todos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    priority: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    duedate: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false
});

Todo.hasMany(Task, { foreinKey: 'todoid', sourceKey: 'id' });
Task.belongsTo(Todo, { foreinKey: 'todoid', targetKey: 'id' });

module.exports = Todo;