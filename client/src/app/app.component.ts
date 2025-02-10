import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from "./interfaces";
import { ApiService } from "./services/api.service";
import { Observable } from "rxjs";
import { baseUrl } from "./consts";
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService]
})
export class AppComponent implements OnInit {
    todos$: Observable<Todo[]> = new Observable<Todo[]>();

    constructor(private readonly apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getTodos();
    }

    getTodos(): void {
        this.todos$ = this.apiService.get(baseUrl + '\\todos') as Observable<Todo[]>;
        this.apiService.get(baseUrl + '\\todos').subscribe(d => {
            console.log(d);
        })
    }
}
