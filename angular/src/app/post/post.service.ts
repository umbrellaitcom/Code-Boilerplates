import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PostApiService } from '../core/api/post-api.service';
import { Post } from './models/Post';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private apiPost: PostApiService
    ) {
    }

    /** get post by id */
    getPost(id: number): Observable<Post> {
        return this.apiPost.getPostApi(id);
    }

    /** get posts list */
    getPosts(id: number): Observable<Post[]> {
        return this.apiPost.getPostListApi(id);
    }
}
