const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add object text')
    }

    const goals = await Goal.create({text: req.body.text})

    res.status(200).json(goals)
})

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (! goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updateGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (! goal) {
        res.status(400)
        throw new Error('Goal not found')
    }


    await goal.remove

    res.status(200).json(goal)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
