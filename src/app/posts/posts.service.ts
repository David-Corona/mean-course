import { Injectable } from '@angular/core';

import { Post } from "./post.model";

@Injectable()
export class PostsService {

  private posts: Post[] = [];

  getPosts() {
    return [...this.posts]; //copies the array
  }

  addPosts(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
  }

}
