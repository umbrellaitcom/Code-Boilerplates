import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { Post } from '../models/Post';
import { PostService } from '../post.service';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.less']
})
export class PostDetailsComponent implements OnInit {
    post$: Observable<Post>;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.getPost();
    }

    /** get post by id */
    getPost(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.post$ = this.postService.getPost(id);
    }

    /** go to back page */
    goBack(): void {
        this.location.back();
    }
}
