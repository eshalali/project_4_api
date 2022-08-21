const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// pull in Mongoose model for todo
const ToDo = require ('../models/todo')

// GET
// Index
router.get('/todo', (req, res, next) => {
    console.log('route is hit')
        ToDo.find()
            .populate('owner')
            .then(todo => {
                return todo.map(todoitem => todoitem.toObject())
            })
            .then(todo => {
                res.status(200).json({ todo: todo })
            })
            .catch(next)
})

// POST
// Create a todo item
router.post('/todo', requireToken, (req, res, next) => {
	req.body.todo.owner = req.user.id

	ToDo.create(req.body.todo)
		.then((todoitem) => {
			res.status(201).json({ todoitem: todoitem.toObject() })
		})
		.catch(next)
})

// PATCH
// Update an item after edit
router.patch('/todo/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.todo.owner
    id = req.params.id

	ToDo.findById(id)
		.then(handle404)
		.then((todoitem) => {
			requireOwnership(req, todoitem)
			return todoitem.updateOne(req.body.todo)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// Delete a todo item
router.delete('/todo/:id', requireToken, (req, res, next) => {
    const id = req.params.id
	ToDo.findById(id)
		.then(handle404)
		.then((todoitem) => {
			requireOwnership(req, todoitem)
			todoitem.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


module.exports = router