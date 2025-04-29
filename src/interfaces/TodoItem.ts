export interface TodoItem {
  id: string;
  todo_id: string;
  content: string;
  is_done: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodoItemCreate {
  todo_id: number;
  content: string;
}
