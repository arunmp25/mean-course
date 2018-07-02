import { Posts } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {

  }

  private posts: Posts[] = [];
  private postsUpdated = new Subject<Posts[]>();

  getPosts() {
    this.http.get<{message: String, posts: Posts[]}>('http://localhost:3000/api/posts')
        .subscribe((postData) => {
          this.posts = postData.posts;
          this.postsUpdated.next([...this.posts]);
        });
  }

  getUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(post: Posts) {
     this.http.post<{message: String}>('http://localhost:3000/api/posts', post)
           .subscribe((responseData) => {
               console.log(responseData.message);
               // This will be updated only if server update
               // is succesfull, this method get exeuted only if
               // there is a succesfull response
               this.posts.push(post);
               this.postsUpdated.next([...this.posts]);
           });
  }


}

