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

@Component({
    selector: 'app-root',
    imports: [FormsModule, MatToolbar, MatIconModule, MatCard, MatCardContent, MatCheckbox, MatFabButton, MatIconButton, MatTooltipModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService]
})
export class AppComponent implements OnInit {
    themeMode: 'light' | 'dark' | 'system' = 'system';
    todos: Todo[] = [];

    constructor(private readonly apiService: ApiService) {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
        this.themeMode = savedTheme || 'system';

        this.applyTheme();
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
        switch (this.themeMode) {
            case 'system':
                this.themeMode = 'light';
                break;
            case 'light':
                this.themeMode = 'dark';
                break;
            case 'dark':
                this.themeMode = 'system';
                break;
        }

        this.applyTheme();
        localStorage.setItem('theme', this.themeMode);
    }

    editTodo(todo: Todo): void {
        // TODO: Implement in next step
        console.log('Edit todo:', todo);
    }

    openCreateDialog(): void {
        // TODO: Implement in next step
        console.log('Open create dialog');
    }

    private applyTheme(): void {
        const body = document.body;

        body.classList.remove('light-theme', 'dark-theme');

        switch (this.themeMode) {
            case 'light':
                body.classList.add('light-theme');
                break;
            case 'dark':
                body.classList.add('dark-theme');
                break;
            case 'system':
                break;
        }
    }
}