import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/webResponse";
import TodoService from "../services/TodoService";
import { Todo, TodoCreate } from "../interfaces/Todo";

export default class TodoController {
  static async create(req: Request, res: Response) {
    try {
      const requestBody = req.body;
      const userId = String(req.user?.id);

      const todo: TodoCreate = {
        user_id: userId,
        title: requestBody.name,
      };

      await TodoService.create(todo);

      successResponse(res, 201, { message: "Todo created successfully" });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const userId = Number(req.user?.id);

      const todos = await TodoService.getAll(userId);

      successResponse(res, 200, { todos });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { todoId } = req.params;

      const result = await TodoService.delete(Number(todoId));

      successResponse(res, 200, { message: "Todo deleted successfully" });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }
}
