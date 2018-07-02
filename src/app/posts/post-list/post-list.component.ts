import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Posts } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title : 'First Post', Content: 'Content of first post'},
  //   {title : 'Second Post', Content: 'Content of second post'},
  //   {title : 'Third Post', Content: 'Content of third post'}
  // ];

  posts: Posts[] = [];
  private postSub: Subscription;


  constructor(public postService: PostService) {

  }

   ngOnInit() {
     this.postService.getPosts();
     this.postSub = this.postService.getUpdateListener()
         .subscribe((posts: Posts[]) => {
           this.posts = posts;
         });
   }

   ngOnDestroy() {
      this.postSub.unsubscribe();
   }


}
