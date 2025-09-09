import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIconButton } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { Todo } from "@interfaces";

@Component({
  selector: 'app-todo-item',
  imports: [
    MatCard,
    MatCardContent,
    MatCheckbox,
    MatIconButton,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input({ required: true }) todo = signal<Todo>(null!);

  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<{ todo: Todo, isEditable: boolean }>();

  toggleChecked() {
    const updated = { ...this.todo(), checked: !this.todo().checked };
    this.update.emit(updated);
  }
}
