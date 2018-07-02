import { Component } from '@angular/core';
import { Posts } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls: ['./post-create.comopnent.css']

})
export class PostCreateComponent {



 constructor(public postService: PostService) {

 }
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
   const post: Posts = {
     id: null,
     title : postForm.value.title,
     content : postForm.value.enteredValue
   };
   this.postService.addPosts(post);
   postForm.resetForm();
  }
}
