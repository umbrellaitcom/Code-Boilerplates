import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

const REGEXP_VALID_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent {

    public loginForm: FormGroup;

    constructor(
        public authService: AuthService,
        @Inject(FormBuilder) fb: FormBuilder
    ) {
        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.pattern(REGEXP_VALID_EMAIL)]],
            password: ['', Validators.required]
        });
    }

    /** login */
    public login() {
        if (this.loginForm.valid) {
            const {email, password} = this.loginForm.value;
            this.authService.login({email, password: password.trim()});
        }
    }
}
