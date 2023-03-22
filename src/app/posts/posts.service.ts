import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>(); // like an event emitter

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  // returns object which we can listen, but not emit. We can emit only from this file.
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]); // emits a new value, which is a copy of posts
      });
  }
}
