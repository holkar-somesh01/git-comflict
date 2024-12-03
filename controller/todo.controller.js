const expressAsyncHandler = require("express-async-handler")
const Todo = require("../models/Todo")
exports.AddTodo = expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const { task, desc } = req.body

    await Todo.create({ task, desc })
    return res.json({ message: "TODO Create Suucess" })
})
exports.GetTodo = expressAsyncHandler(async (req, res) => {
    const result = await Todo.find()
    return res.json({ message: "TODO Fetch Suucess", result })
})
exports.updateTodo = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { task, desc } = req.body
    await Todo.findByIdAndUpdate(id, { task, desc })
    return res.json({ message: "TODO Update Suucess" })
})
exports.DeteleTodo = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    await Todo.findByIdAndDelete(id)
    return res.json({ message: "TODO Delete Suucess" })
})
//  main branch code 
