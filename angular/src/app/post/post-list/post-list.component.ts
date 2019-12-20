import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { mergeMap, scan, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { Post } from '../models/Post';
import { PostService } from '../post.service';

@Component({
    selector: 'app-home',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.less']
})
export class PostListComponent {
    @ViewChild(CdkVirtualScrollViewport, {static: false})
    viewport: CdkVirtualScrollViewport;

    lastVirtualScrollCallbackCalledOn = -1;
    page = 1;
    page$ = new BehaviorSubject(this.page);
    infinite$: Observable<Post[]>;

    constructor(
        private postService: PostService
    ) {
        this.infinite$ = this.page$.asObservable().pipe(
            mergeMap(n => this.getPosts()),
            scan((acc: Post[], batch) => {
                return acc.concat(batch);
            }, []),
        );
    }

    getPosts() {
        return this.postService.getPosts(this.page)
            .pipe(
                tap(posts => {
                    if (posts.length !== 0) {
                        this.page++;
                    }
                })
            );
    }

    handleVirtualScrolledIndexChange(e) {
        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();

        if (end === total && this.lastVirtualScrollCallbackCalledOn !== end) {
            this.page$.next(this.page);
            this.lastVirtualScrollCallbackCalledOn = end;
        }
    }
}
