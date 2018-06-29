import { Posts } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {

  private posts: Posts[] = [];
  private postsUpdated = new Subject<Posts[]>();

  getPosts() {
    return [...this.posts];
  }

  getUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(post: Posts) {
     this.posts.push(post);
     this.postsUpdated.next([...this.posts]);
  }


}

