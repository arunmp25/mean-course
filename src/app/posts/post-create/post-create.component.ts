import { Component, OnInit } from '@angular/core';
import { Posts } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls: ['./post-create.comopnent.css']

})
export class PostCreateComponent implements OnInit {

 private mode = 'crceate';
 private postId: string;
 post: Posts;

 constructor(public postService: PostService, public route: ActivatedRoute) {

 }

 ngOnInit() {
  this.route.paramMap.subscribe((paramMap) => {
     if (paramMap.has('postId')) {
       this.mode = 'edit';
       this.postId = paramMap.get('postId');
       this.postService.getPostfromDB(this.postId).subscribe(( postData) => {
           this.post = {id: postData._id, title: postData.title, content: postData.content};
       });
       console.log(this.post);
     } else {
       this.mode = 'create';
       this.postId = null;
     }
  });
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

   if ( this.mode === 'create') {
    this.postService.addPosts(post);
   } else if ( this.mode === 'edit') {
      post.id = this.postId;
      this.postService.updatePost( post);
   }

   postForm.resetForm();
  }
}
