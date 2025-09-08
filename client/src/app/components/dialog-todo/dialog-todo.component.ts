import { Component, computed, inject, model, signal } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule, NgForm } from "@angular/forms";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { TodoDialogData } from "@interfaces";
import { MatDivider } from "@angular/material/divider";

@Component({
    selector: 'app-dialog-todo',
    imports: [
        MatLabel,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        FormsModule,
        MatInputModule,
        MatDialogActions,
        MatInput,
        MatButton,
        MatDivider,
    ],
    templateUrl: './dialog-todo.component.html',
    styleUrl: './dialog-todo.component.scss'
})
export class DialogTodoComponent {
    readonly dialogRef = inject(MatDialogRef<DialogTodoComponent>);
    readonly data = inject<TodoDialogData>(MAT_DIALOG_DATA);
    readonly mode = signal(this.data.mode);
    title = model(this.data.todo?.title);
    description =  model(this.data.todo?.description ?? '');
    readonly dialogTitle = computed(() =>
        this.mode() === 'create'
            ? `Create Task ${this.title() ? `(${this.title()})` : ''}`
            : this.mode() === 'view'
                ? `'${this.title()}' Details`
                : `Edit '${this.title()}'`
    );

    onCancel(): void {
        this.dialogRef.close();
    }

    onCreate(): void {
        const todo = {title: this.title(), description: this.description()};
        this.dialogRef.close({action: 'create', todo});
    }

    onSave(): void {
        const todo = {...this.data.todo, title: this.title(), description: this.description()};
        this.dialogRef.close({action: 'save', todo});
    }

    onDelete(): void {
        const todo = this.data.todo;
        this.dialogRef.close({action: 'delete', todo});
    }

    switchToEdit(): void {
        this.mode.set('edit');
    }

    canSave(form: NgForm): boolean {
        const changed = this.title() !== this.data.todo?.title || this.description() !== this.data.todo?.description;
        return !!form.valid && changed;
    }
}
