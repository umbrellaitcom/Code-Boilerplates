import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
    { path: 'post/:id', component: PostDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: false})],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
