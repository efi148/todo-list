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
import { MatIconModule } from "@angular/material/icon";

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
        MatIconModule,
    ],
    templateUrl: './dialog-todo.component.html',
    styleUrl: './dialog-todo.component.scss'
})
export class DialogTodoComponent {
    readonly dialogRef = inject(MatDialogRef<DialogTodoComponent>);
    readonly data = inject<TodoDialogData>(MAT_DIALOG_DATA);
    readonly mode = signal(this.data.mode);
    title = model(this.data.todo?.title);
    description = model(this.data.todo?.description ?? '');
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

    generateNew() {
        const titles = [
            "Buy milk", "Walk the dog", "Read a book", "Call mom",
            "Do the laundry", "Clean the kitchen", "Write a journal entry", "Pay bills",
            "Check emails", "Water the plants", "Go for a run", "Plan weekly meals",
            "Book a dentist appointment", "Vacuum the house", "Organize closet", "Practice guitar",
            "Study JavaScript", "Meditate for 10 minutes", "Stretch before bed", "Feed the cat",
            "Update budget sheet", "Take out the trash", "Fix the leaky faucet", "Backup files",
            "Research vacation ideas", "Prepare presentation", "Read news articles", "Schedule car maintenance",
            "Write thank-you note", "Plan weekend activity"
        ];

        const descriptions = [
            "Remember to do this today", "Important!", "Optional task", "",
            "Don’t forget this one", "Try to finish by tonight", "Urgent!", "Can wait until tomorrow",
            "Low priority", "Nice to have done", "Essential", "Do before dinner",
            "Double-check when finished", "Fun activity", "Long-term goal", "Requires focus", "",
            "Quick and easy", "Might take time", "Relaxing", "Challenging", "",
            "Set aside focused time today to complete this task without distractions and unexpected interruptions.",
            "Break this task into smaller steps, tackle the first one now, and build steady momentum.",
            "Confirm any dependencies or blockers, then proceed confidently to finish before the end of day.",
            "Schedule a realistic deadline, notify stakeholders if needed, and deliver a clean, well-documented result.",
            "Allocate thirty minutes, silence notifications, and push this across the finish line with focused attention.",
            "Double-check acceptance criteria, test thoroughly for edge cases, and mark complete only after verification.",
            "Coordinate with teammates on responsibilities, confirm ownership, and avoid duplicated work or conflicting changes.",
            "Capture lessons learned when finished, update the task details, and improve the template for next time.",
            "If the scope grows unexpectedly, re-estimate effort, communicate timeline impacts, and renegotiate priorities transparently.",
            "Set a reminder", "Ask for help if needed", "Reward yourself after", "Postpone if busy",
            "Top priority", "Weekly routine", "Monthly task", "Can batch with others",
            "Good habit to build", "Optional but recommended", ""
        ];

        function getRandomItem(arr: string[]): string {
            const index = Math.floor(Math.random() * arr.length);
            return arr[index];
        }

        const randomTitle = getRandomItem(titles);
        const randomDescription = getRandomItem(descriptions);
        const todo = {title: randomTitle, description: randomDescription};
        this.dialogRef.close({action: 'create', todo});
    }
}
