import { Posts } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {

  }

  private posts: Posts[] = [];
  private postsUpdated = new Subject<Posts[]>();

  getPosts() {
    // WE had defined the post model in angular side fromt end
    // with an id , in the back end side mongo creates the document
    // with '_id' in such case we need to map teh back end object to
    // front end object as shown below

    this.http.get<{message: String, posts: any}>
    ('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
           return postData.posts.map(post => {
              return{
                title : post.title,
                content : post.content,
                id : post._id
              };
           });
        }))
        .subscribe((transformedPosts) => {
          this.posts = transformedPosts;
          this.postsUpdated.next([...this.posts]);
        });
  }

  getUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  /**
   * Method to retrive a single post given its id
   * method return copy of teh post so that
   * original object is not mpdified
   * @param postId
   */
  getPost(postId: string) {
    console.log(this.posts);
    return {...this.posts.find(post => post.id === postId)};

  }

  updatePost(post: Posts) {
    this.http.put('http://localhost:3000/api/posts/' + post.id, post )
    .subscribe(response => console.log(response));

  }

  addPosts(post: Posts) {
     this.http.post<{postId: string, message: string}>('http://localhost:3000/api/posts', post)
           .subscribe((responseData) => {
               console.log(responseData.message);
               // This will be updated only if server update
               // is succesfull, this method gets exeuted only if
               // there is a succesfull response
               console.log(responseData.postId);
               post.id = responseData.postId;
               this.posts.push(post);
               this.postsUpdated.next([...this.posts]);
           });
  }

  deletePost(postId: string) {
    console.log(postId);
      this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
         console.log(' post deleted ');
      });
  }


}

