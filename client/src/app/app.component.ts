import { Component, inject, OnInit } from '@angular/core';

import { dialogMode, dialogResult, Todo, TodoDialogData } from "@interfaces";
import { ApiService } from "@services/api.service";
import { baseUrl } from "@const";
import { HttpResponse } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { first, firstValueFrom } from "rxjs";
import { MatToolbar } from "@angular/material/toolbar";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton, MatIconButton } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ThemeService } from "@services/theme.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogTodoComponent } from "./components/dialog-todo/dialog-todo.component";

@Component({
    selector: 'app-root',
    imports: [FormsModule, MatToolbar, MatIconModule, MatCard, MatCardContent, MatCheckbox, MatFabButton, MatIconButton, MatTooltipModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService, ThemeService]
})
export class AppComponent implements OnInit {
    readonly dialog = inject(MatDialog);
    todos: Todo[] = [];

    constructor(public themeService: ThemeService, private readonly apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getTodos();
    }

    getTodos(): void {
        this.apiService.get<Todo[]>(baseUrl + '/todos').pipe(first()).subscribe((response: HttpResponse<Todo[]>) => {
            const {body: data} = response;
            this.todos = data || [];
        });
    }

    addTodo(title: string, description?: string) {
        if (!title.trim()) return;
        const todo: Partial<Todo> = {title, description};
        firstValueFrom(this.apiService.post(baseUrl + '/todos', todo)).then(() => {
            this.getTodos();
        });
    }

    updateTodo(todo: Todo) {
        this.apiService.patch(baseUrl + '/todos/' + todo.id, {
            title: todo.title,
            checked: todo.checked,
            description: todo.description
        }).pipe(first()).subscribe(() => {
            this.getTodos();
        });
    }

    toggleChecked(todo: Todo) {
        this.updateTodo(todo);
    }

    deleteTodo(id: number) {
        this.apiService.delete(baseUrl + '/todos/' + id).pipe(first()).subscribe(() => {
            this.getTodos();
        });
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    openTodoDialog(mode: dialogMode, todo?: Todo): void {
        const dialogRef = this.dialog.open<DialogTodoComponent, TodoDialogData>(DialogTodoComponent, {
            data: {mode, todo}
        });
        dialogRef.afterClosed().subscribe((result: dialogResult) => {
            if (!result || !result.todo) return;

            switch (result.action) {
                case 'create':
                    this.addTodo(result.todo.title, result.todo.description);
                    break;
                case 'save':
                    this.updateTodo(result.todo);
                    break;
                case 'delete':
                    if (todo?.id !== undefined) this.deleteTodo(todo.id);
                    break;
            }

            console.log(result);
        });
    }
}