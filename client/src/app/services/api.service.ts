import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private readonly httpClient: HttpClient) {
    }

    get(uri: string, header: any = {}): Observable<Object> {
        return this.httpClient.get(uri, {headers: header});
    }

    post(uri: string, body: any, header: any = {}): Observable<HttpResponse<Object>> {
        return this.httpClient.post(uri, body, {headers: header, observe: 'response'});
    }

    patch(uri: string, body = {}, header: any = {}): Observable<Object> {
        return this.httpClient.put(uri, body, {headers: header});
    }

    delete(uri: string, header: any = {}): Observable<HttpResponse<Object>> {
        return this.httpClient.delete(uri, {headers: header, observe: 'response'});
    }
}
