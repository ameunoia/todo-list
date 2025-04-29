export interface Todo {
  id?: string;
  user_id: string;
  title: string;
  created_at?: string;
}

export interface TodoCreate {
  user_id: string;
  title: string;
}
