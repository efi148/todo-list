import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from "./interfaces";
import { ApiService } from "./services/api.service";
import { baseUrl } from "./consts";
import { HttpResponse } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { first, firstValueFrom } from "rxjs";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService]
})
export class AppComponent implements OnInit {

    todos: Todo[] = [];


    constructor(private readonly apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getTodos();
    }

    getTodos(): void {
        this.apiService.get<Todo[]>(baseUrl + '/todos').pipe(first()).subscribe((response: HttpResponse<Todo[]>) => {
            const {body: data} = response;
            this.todos = data || [];
            console.log(data);
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
}