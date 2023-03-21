import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>(); // like an event emitter

  getPosts() {
    return [...this.posts]; //copies the array
  }

  // returns object which we can listen, but not emit. We can emit only from this file.
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]); // emits a new value, which is a copy of posts
  }

}
