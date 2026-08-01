export type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoInput = {
  title: string;
};

export type UpdateTodoInput = {
  title?: string;
  isDone?: boolean;
};
