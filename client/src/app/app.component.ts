import { Component, OnInit } from '@angular/core';

import { Todo } from "./interfaces";
import { ApiService } from "./services/api.service";
import { baseUrl } from "./consts";
import { HttpResponse } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { first, firstValueFrom } from "rxjs";
import { MatToolbar } from "@angular/material/toolbar";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton, MatIconButton } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ThemeService } from "./services/theme.service";

@Component({
    selector: 'app-root',
    imports: [FormsModule, MatToolbar, MatIconModule, MatCard, MatCardContent, MatCheckbox, MatFabButton, MatIconButton, MatTooltipModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService, ThemeService]
})
export class AppComponent implements OnInit {
    todos: Todo[] = [];

    constructor(public themeService: ThemeService, private readonly apiService: ApiService) {}

    ngOnInit(): void {
        this.getTodos();
    }

    getTodos(): void {
        this.apiService.get<Todo[]>(baseUrl + '/todos').pipe(first()).subscribe((response: HttpResponse<Todo[]>) => {
            const {body: data} = response;
            this.todos = data || [];
        });
    }

    addTodo(title: string) {
        if (!title.trim()) return;
        const todo: Partial<Todo> = {title, description: ''};
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

    editTodo(todo: Todo): void {
        // TODO: Implement in next step
        console.log('Edit todo:', todo);
    }

    openCreateDialog(): void {
        // TODO: Implement in next step
        console.log('Open create dialog');
    }
}