import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private readonly httpClient: HttpClient) {
    }

    get<T>(uri: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
        return this.httpClient.get<T>(uri, {headers, observe: 'response'})
            .pipe(catchError(this.handleError));
    }

    post<T>(uri: string, body: any, headers?: HttpHeaders): Observable<HttpResponse<T>> {
        return this.httpClient.post<T>(uri, body, {headers, observe: 'response'})
            .pipe(catchError(this.handleError));
    }

    patch<T>(uri: string, body = {}, headers?: HttpHeaders): Observable<HttpResponse<T>> {
        return this.httpClient.patch<T>(uri, body, {headers, observe: 'response'})
            .pipe(catchError(this.handleError));
    }

    delete<T>(uri: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
        return this.httpClient.delete<T>(uri, {headers, observe: 'response'})
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Client Error: ${error.error.message}`;
        } else {
            // Server-side error
            switch (error.status) {
                case 400:
                    errorMessage = 'Bad Request - Please check your input';
                    break;
                case 401:
                    errorMessage = 'Unauthorized - Please log in';
                    break;
                case 403:
                    errorMessage = 'Forbidden - You don\'t have permission';
                    break;
                case 404:
                    errorMessage = 'Not Found - The requested resource doesn\'t exist';
                    break;
                case 500:
                    errorMessage = 'Internal Server Error - Please try again later';
                    break;
                default:
                    errorMessage = `Server Error: ${error.status} - ${error.message}`;
            }
        }

        console.error('API Error:', error);
        return throwError(() => new Error(errorMessage));
    }
}