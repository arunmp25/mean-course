import { Component, Input } from '@angular/core';
import {Posts} from '../post.model';
import { PostService } from '../post.service';
@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']

})
export class PostListComponent {
  // posts = [
  //   {title : 'First Post', Content: 'Content of first post'},
  //   {title : 'Second Post', Content: 'Content of second post'},
  //   {title : 'Third Post', Content: 'Content of third post'}
  // ];

   constructor(public postService: PostService) {

   }
   @Input() posts: Posts[] = [];


}
