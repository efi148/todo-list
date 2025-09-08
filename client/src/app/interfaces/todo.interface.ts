import { dialogMode } from "./types";

export interface Todo {
    id: number;
    title: string;
    description: string;
    checked: boolean;
}

export interface TodoDialogData {
    mode: dialogMode;
    todo?: Todo;
}