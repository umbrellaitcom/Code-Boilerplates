import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthApiService {

    private mockHttpResponseOk = new HttpResponse({
        body: {token: 'token'},
        headers: undefined,
        status: 200,
        statusText: 'OK',
        url: 'http://angular-boilerplate.com'
    });

    private mockHttpResponseBad = new HttpResponse({
        body: {message: 'Email or password is incorrect'},
        headers: undefined,
        status: 400,
        statusText: 'BadRequest',
        url: 'http://angular-boilerplate.com'
    });

    constructor() {
    }

    public logInApi({email, password}): Observable<HttpResponse<any>> {
        if (email === 'admin@test.com' && password === 'admin') {
            return of(this.mockHttpResponseOk).pipe(delay(500));
        } else {
            return throwError(this.mockHttpResponseBad).pipe(delay(500));
        }
    }
}
