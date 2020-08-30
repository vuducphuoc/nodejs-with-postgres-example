const express = require('express');
const router = express.Router();

const Todo = require('./../models/Todo');
const Task = require('./../models/Task');

router.get('/', async (req, res) => {
    try {
        const tasks = Task.findAll({
            // attributes: [],
            order: [
                ['id', 'DESC']
            ]
        });

        res.json({
            result: 'ok',
            data: tasks,
            length: tasks ? tasks.length : 0,
            message: 'Query successfully'
        })

    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            message: `Query failed. ${error}`
        })
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tasks = await Task.findAll({
            // attributes: ["id", "name", "priority", "description", "duedate"],
            where: { id }
        });

        if (tasks && tasks.length > 0) {
            res.json({
                result: 'ok',
                data: tasks[0],
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
    let { name, todoid, isFinished } = req.body;
    try {
        let newTask = await Task.create({
            name, todoid, isFinished
        }, {
            fields: ["name", "todoid", "isFinished"]
        });

        if (newTask) {
            res.json({
                result: 'ok',
                data: newTask
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Insert to new Task failed'
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert to new Task failed. ${error}`
        });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, todoid, isFinished } = req.body;

    try {
        let tasks = await Todo.findAll({
            // attributes: ["name", "priority", "description", "duedate"],
            where: { id }
        });

        if (tasks && tasks.length > 0) {
            tasks.forEach(async task => {
                await task.update({
                    name: name ? name : task.name,
                    todoid: todoid ? todoid : task.todoid,
                    isFinished: isFinished ? isFinished : task.isFinished
                })
            });

            res.json({
                result: 'ok',
                data: tasks,
                message: 'Update a Task successfully'
            })
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Can not find Task to Update'
            })
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Update Task failed. ${error}`
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Task.destroy({
            where: { todoid: id }
        });

        res.json({
            result: 'ok',
            message: 'Delete a Task successfully',
            count
        })
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Delete a Task failed. ${error}`
        });
    }
})

module.exports = router;