import { Component, EventEmitter, Output } from '@angular/core';
import { Posts } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls: ['./post-create.comopnent.css']

})
export class PostCreateComponent {

  title = '';
  enteredValue = '';
  @Output() postCreated = new EventEmitter<Posts>();


  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
   const post: Posts = {
     title : postForm.value.title,
     content : postForm.value.enteredValue
   };
   this.postCreated.emit(post);
  }
}
