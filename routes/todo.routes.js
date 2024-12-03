const router = require("express").Router()
const todoController = require("../controller/todo.controller")
router
    .post("/add", todoController.AddTodo)
    .get("/get", todoController.GetTodo)
    .put("/update/:id", todoController.updateTodo)
    .delete("/delete/:id", todoController.DeteleTodo)

module.exports = router