import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../core/alert';
import { AuthApiService } from '../core/api/auth-api.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private alertService: AlertService,
        private apiAuth: AuthApiService,
        private router: Router
    ) {
    }

    /** navigate to login page */
    public goToLoginPage() {
        this.router.navigateByUrl('/login');
    }

    /** navigate to post page */
    public goToPostPage() {
        this.router.navigateByUrl('/posts');
    }

    /** get status authorised or not */
    public get authenticated() {
        return !!this.getToken();
    }

    /** get jwt token from localStorage */
    public getToken() {
        return localStorage.getItem('token');
    }

    public login({email, password}): void {
        this.alertService.clear();

        this.apiAuth.logInApi({email, password: password.trim()}).subscribe(
            (data) => {
                if (data.status === 200) {
                    localStorage.setItem('token', data.body.token);
                    this.goToPostPage();
                }
            },
            (error) => {
                this.alertService.error(error.body.message);
                this.alertService.clearByTime();
            }
        );
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.goToLoginPage();
    }
}
