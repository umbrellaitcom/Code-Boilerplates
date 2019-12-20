import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Post } from '../models/Post';
import { PostService } from '../post.service';

@Component({
    selector: 'app-home',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
    posts$: Observable<Post[]> = of([]);

    constructor(
        private postService: PostService
    ) {
    }

    ngOnInit() {
        this.posts$ = this.postService.getPosts();
    }

}
