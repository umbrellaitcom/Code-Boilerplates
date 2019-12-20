import { Component } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less']
})
export class MenuComponent {

    constructor(
        private auth: AuthService
    ) {
    }

    public logout() {
        return this.auth.logout();
    }

}
