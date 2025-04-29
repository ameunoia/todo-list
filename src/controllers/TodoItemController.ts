import { Request, Response } from "express";
import TodoItemService from "../services/TodoItemService";
import ApiError from "../utils/ApiError";
import { TodoItem, TodoItemCreate } from "../interfaces/TodoItem";
import { errorResponse, successResponse } from "../utils/webResponse";

export default class TodoItemController {
  static async create(req: Request, res: Response) {
    try {
      const { todoId } = req.params;
      const { itemName } = req.body;

      if (!todoId || !itemName) {
        throw new ApiError("Missing required fields", 400);
      }

      const newItem = await TodoItemService.create({
        content: itemName,
        todo_id: Number(todoId),
      });

      successResponse(res, 201, { message: "successfull create todo item" });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const { todoId } = req.params;

      if (!todoId || isNaN(Number(todoId))) {
        throw new ApiError("Invalid todoId", 400);
      }

      const items = await TodoItemService.getAll(Number(todoId));

      successResponse(res, 200, {
        message: "Todo items fetched successfully",
        data: items,
      });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { todoId, todoItemId } = req.params;

      if (!todoId || !todoItemId || isNaN(+todoId) || isNaN(+todoItemId)) {
        throw new ApiError("Invalid todoId or todoItemId", 400);
      }

      const item = await TodoItemService.getById(+todoId, +todoItemId);

      successResponse(res, 200, {
        message: "Todo item retrieved successfully",
        data: item,
      });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }

  static async toggleStatus(req: Request, res: Response) {
    try {
      const { todoId, todoItemId } = req.params;

      if (!todoId || !todoItemId || isNaN(+todoId) || isNaN(+todoItemId)) {
        throw new ApiError("Invalid todoId or todoItemId", 400);
      }

      const updated = await TodoItemService.toggleStatus(+todoId, +todoItemId);

      successResponse(res, 200, {
        message: "Todo item status changed",
        data: updated,
      });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { todoId, todoItemId } = req.params;

      if (!todoId || !todoItemId || isNaN(+todoId) || isNaN(+todoItemId)) {
        throw new ApiError("Invalid todoId or todoItemId", 400);
      }

      const result = await TodoItemService.delete(+todoId, +todoItemId);

      successResponse(res, 200, {
        message: "Todo item deleted successfully",
        data: result,
      });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }

  static async rename(req: Request, res: Response) {
    try {
      const { todoId, todoItemId } = req.params;
      const { itemName } = req.body;

      if (!todoId || !todoItemId || isNaN(+todoId) || isNaN(+todoItemId)) {
        throw new ApiError("Invalid todoId or todoItemId", 400);
      }

      const result = await TodoItemService.rename(
        +todoId,
        +todoItemId,
        itemName
      );

      successResponse(res, 200, {
        message: "Todo item content updated successfully",
        data: result,
      });
    } catch (error: any) {
      console.error(error);
      errorResponse(res, error);
    }
  }
}
