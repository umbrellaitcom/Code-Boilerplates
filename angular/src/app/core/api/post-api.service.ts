import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from '../../post/models/Post';

@Injectable({
    providedIn: 'root'
})

export class PostApiService {
    private readonly url = 'http://jsonplaceholder.typicode.com/posts';
    public readonly PAGE_SIZE = 30;

    constructor(
        private http: HttpClient
    ) {
    }

    public getPostApi(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.url}/${id}`);
    }

    public getPostListApi(id: number): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.url}?_start=0&_limit=${this.PAGE_SIZE}&_page=${id}`).pipe(catchError(error => of([])));
    }
}
