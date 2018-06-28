import { Posts } from './post.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostService {

  private posts: Posts[] = [];

  getPosts() {
    return [...this.posts];
  }

  addPosts(post: Posts) {
     this.posts.push(post);
  }


}

