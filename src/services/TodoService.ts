import { db } from "../config/db";
import { Todo } from "../interfaces/Todo";
import ApiError from "../utils/ApiError";

export default class TodoService {
  static async create(todo: Todo) {
    const [row] = await db.execute(
      `INSERT INTO todos(user_id, title) VALUES (?, ?)`,
      [todo.user_id, todo.title]
    );

    return row;
  }

  static async getAll(userId: number): Promise<Todo[]> {
    const [rows] = await db.execute(
      `SELECT id, title, created_at FROM todos WHERE user_id = ?`,
      [userId]
    );

    return rows as Todo[];
  }

  static async delete(id: number): Promise<boolean> {
    const [result]: any = await db.execute(`DELETE FROM todos WHERE id = ?`, [
      id,
    ]);
    if (result.affectedRows < 1) {
      throw new ApiError("todo not found", 404);
    }

    return result;
  }
}
