import { Todo } from "./todo.interface";

export type ThemeMode = 'light' | 'dark' | 'system';

// Dialog:
export type dialogMode = 'create' | 'view' | 'edit';
export type dialogAction = 'create' | 'save' | 'delete';
export type dialogResult = {action: dialogAction, todo: Todo};
