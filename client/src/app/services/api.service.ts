import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private readonly httpClient: HttpClient) {
    }

    get<T>(uri: string, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.get<T>(uri, {headers});
    }

    post<T>(uri: string, body: any, headers?: HttpHeaders): Observable<HttpResponse<T>> {
        return this.httpClient.post<T>(uri, body, {headers, observe: 'response'});
    }

    patch<T>(uri: string, body = {}, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.patch<T>(uri, body, {headers});
    }

    delete<T>(uri: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
        return this.httpClient.delete<T>(uri, {headers, observe: 'response'});
    }
}