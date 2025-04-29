import { db } from "../config/db";
import { TodoItemCreate, TodoItem } from "../interfaces/TodoItem";
import ApiError from "../utils/ApiError";

export default class TodoItemService {
  static async create(todoItem: TodoItemCreate) {
    const [rows]: any = await db.query(`SELECT id FROM todos WHERE id = ?`, [
      todoItem.todo_id,
    ]);

    if (rows.length === 0) {
      throw new ApiError("Todo not found", 400);
    }

    const [result] = await db.execute(
      `INSERT INTO todo_item(todo_id, content, is_done) VALUES (?, ?, ?)`,
      [todoItem.todo_id, todoItem.content, false]
    );

    if (!result) {
      throw new ApiError("Error creating todo item", 500);
    }

    return result;
  }

  static async getAll(todoId: number): Promise<TodoItem[]> {
    const [rows] = await db.execute(
      `SELECT id, todo_id, content, is_done, created_at, updated_at 
      FROM todo_item WHERE todo_id = ?`,
      [todoId]
    );

    return rows as TodoItem[];
  }

  static async getById(todoId: number, todoItemId: number) {
    const [rows]: any = await db.query(
      `SELECT * FROM todo_item WHERE id = ? AND todo_id = ?`,
      [todoItemId, todoId]
    );

    if (rows.length === 0) {
      throw new ApiError("Todo item not found", 404);
    }

    return rows[0];
  }

  static async toggleStatus(todoId: number, todoItemId: number) {
    const [rows]: any = await db.query(
      `SELECT is_done FROM todo_item WHERE id = ? AND todo_id = ?`,
      [todoItemId, todoId]
    );

    if (rows.length === 0) {
      throw new ApiError("Todo item not found", 404);
    }

    const currentStatus = rows[0].is_done;
    const newStatus = !currentStatus;

    const [result]: any = await db.execute(
      `UPDATE todo_item SET is_done = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND todo_id = ?`,
      [newStatus, todoItemId, todoId]
    );

    if (result.affectedRows === 0) {
      throw new ApiError("Failed to update todo item", 500);
    }

    return { todoItemId, is_done: newStatus };
  }

  static async delete(todoId: number, todoItemId: number) {
    const [rows]: any = await db.query(
      `SELECT id FROM todo_item WHERE id = ? AND todo_id = ?`,
      [todoItemId, todoId]
    );

    if (rows.length === 0) {
      throw new ApiError("Todo item not found", 404);
    }

    const [result]: any = await db.execute(
      `DELETE FROM todo_item WHERE id = ? AND todo_id = ?`,
      [todoItemId, todoId]
    );

    return { todoItemId, deleted: true };
  }

  static async rename(todoId: number, todoItemId: number, newContent: string) {
    if (!newContent || newContent.trim() === "") {
      throw new ApiError("New content must not be empty", 400);
    }

    const [rows]: any = await db.query(
      `SELECT id FROM todo_item WHERE id = ? AND todo_id = ?`,
      [todoItemId, todoId]
    );

    if (rows.length === 0) {
      throw new ApiError("Todo item not found", 404);
    }

    const [result]: any = await db.execute(
      `UPDATE todo_item SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND todo_id = ?`,
      [newContent, todoItemId, todoId]
    );

    return { todoItemId, updated: true, newContent };
  }
}
