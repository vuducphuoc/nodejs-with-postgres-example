const express = require("express");
const router = express.Router();

// Models
const Task = require('./../models/Task');
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll({
            attributes: ["id", "name", "priority", "description", "duedate"],
            order: [
                ['name', 'ASC']
            ]
        });

        res.json({
            result: 'ok',
            data: todos,
            length: todos.length,
            message: 'Query successfully'
        })
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            message: `Query failed. ${error}`
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todos = await Todo.findAll({
            attributes: ["id", "name", "priority", "description", "duedate"],
            where: { id },
            includes: {
                model: Task,
                as: 'tasks',
                required: false
            }
        });

        if (todos && todos.length > 0) {
            res.json({
                result: 'ok',
                data: todos[0],
                message: 'Query successfully'
            })
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Query failed'
            })
        }


    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            message: `Query failed. ${error}`
        });
    }
});

router.post('/', async (req, res) => {
    let { name, priority, description, duedate } = req.body;
    try {
        let newTodo = await Todo.create({
            name,
            priority: parseInt(priority),
            description,
            duedate
        }, {
            fields: ["name", "priority", "description", "duedate"]
        });

        if (newTodo) {
            res.json({
                result: 'ok',
                data: newTodo
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Insert to new Todo failed'
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert to new Todo failed. ${error}`
        });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, priority, description, duedate } = req.body;

    try {
        let todos = await Todo.findAll({
            attributes: ["name", "priority", "description", "duedate"],
            where: { id }
        });

        if (todos && todos.length > 0) {
            todos.forEach(async todo => {
                await todo.update({
                    name: name ? name : todo.name,
                    priority: priority ? priority : todo.priority,
                    description: description ? description : todo.description,
                    duedate: duedate ? duedate : todo.duedate,
                })
            });

            res.json({
                result: 'ok',
                data: todos,
                message: 'Update a Todo successfully'
            })
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Can not find Todo to Update'
            })
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Update Todo failed. ${error}`
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Task.destroy({
            where: { todoid: id }
        });

        const count = await Todo.destroy({
            where: { id }
        });

        res.json({
            result: 'ok',
            message: 'Delete a Todo successfully',
            count
        })
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Delete a Todo failed. ${error}`
        });
    }
})

module.exports = router;