import { Router } from "express";
import TodoController from "../controllers/TodoController";
import TodoItemController from "../controllers/TodoItemController";

const todoRoute = Router();

todoRoute.post("/", TodoController.create);
todoRoute.get("/", TodoController.getAll);
todoRoute.delete("/:todoId", TodoController.delete);

todoRoute.post("/:todoId/item", TodoItemController.create);
todoRoute.get("/:todoId/item", TodoItemController.getAll);
todoRoute.get("/:todoId/item/:todoItemId", TodoItemController.getById);
todoRoute.put("/:todoId/item/:todoItemId", TodoItemController.toggleStatus);
todoRoute.delete("/:todoId/item/:todoItemId", TodoItemController.delete);
todoRoute.put("/:todoId/item/rename/:todoItemId", TodoItemController.rename);

export default todoRoute;
