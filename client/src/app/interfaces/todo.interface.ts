import { dialogMode } from "./types";

export interface Todo {
    id: number;
    title: string;
    description: string;
    checked: boolean;
}

export type CreateTodo = Pick<Todo, 'title' | 'description'>;
export type UpdateTodo = Partial<Omit<Todo, 'id'>>;

export interface TodoDialogData {
    mode: dialogMode;
    todo?: Todo;
}