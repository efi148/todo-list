import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { CreateTodo, dialogMode, dialogResult, Todo, TodoDialogData, UpdateTodo } from "@interfaces";
import { ApiService } from "@services/api.service";
import { HttpResponse } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatToolbar } from "@angular/material/toolbar";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton, MatIconButton } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ThemeService } from "@services/theme.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogTodoComponent } from "./components/dialog-todo/dialog-todo.component";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { MatChip } from "@angular/material/chips";
import { MatBadge } from "@angular/material/badge";

@Component({
    selector: 'app-root',
    imports: [FormsModule, MatToolbar, MatIconModule, MatCard, MatCardContent, MatFabButton, MatIconButton, MatTooltipModule, TodoItemComponent, MatChip],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService, ThemeService]
})
export class AppComponent implements OnInit {
    readonly dialog = inject(MatDialog);
    todos = signal<Todo[]>([]);
    pendingItems = computed(() => this.todos().filter(t => !t.checked).length);
    totalItems   = computed(() => this.todos().length);

    displayChip = computed(() => {
        const total = this.totalItems();
        const pending = this.pendingItems();
        if (total === 0) return null;
        return { total, pending, showPending: pending > 0 };
    });



    protected readonly signal = signal;

    constructor(public themeService: ThemeService, private readonly apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getTodos();
    }

    getTodos(): void {
        this.apiService.get<Todo[]>('/todos').subscribe((response: HttpResponse<Todo[]>) => {
            const {body: data} = response;
            this.todos.set(data || []);
        });
    }

    onAddTodo(title: string, description = '') {
        if (!title.trim()) return;
        const todo: CreateTodo = {title, description};
        this.apiService.post('/todos', todo)
            .subscribe({
                next: (res) => {
                    this.todos.update(t => [...t, res.body as Todo]);
                },
                error: (err) => console.error('Failed to add todo', err)
            });
    }

    onUpdateTodo(updatedTodo: Todo) {
        const {id, ...updatedTodoToServer} = updatedTodo;

        this.apiService.patch('/todos/' + id, updatedTodoToServer as UpdateTodo)
            .subscribe({
                next: () => {
                    this.todos.update(t => t.map(x => x.id === id ? updatedTodo : x));
                },
                error: err => console.error('Update failed', err)
            });
    }

    onDeleteTodo(id: number) {
        this.apiService.delete('/todos/' + id).subscribe({
            next: () => {
                this.todos.update(t => t.filter(x => x.id !== id));
            },
            error: err => console.error('Delete failed', err)
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
                    this.onAddTodo(result.todo.title, result.todo.description);
                    break;
                case 'save':
                    this.onUpdateTodo(result.todo);
                    break;
                case 'delete':
                    if (todo?.id !== undefined) this.onDeleteTodo(todo.id);
                    break;
            }

            console.log(result);
        });
    }
}