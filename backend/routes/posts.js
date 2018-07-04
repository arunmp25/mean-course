const express = require("express");

const Post = require("../models/post");

const router = express.Router();


router.post('',(request,response,next) => {
  // const post = request.body;
    const post = new Post({
       title: request.body.title,
       content: request.body.content
    });
    post.save().then((result) => {
      console.log("result " ,result);
      response.status(201).json({
        message: 'Post Added successfully',
        postId : result._id
      });
    });

});

router.put('/:id',(request,response,next) =>{
const post = new Post({
_id: request.body.id,
title: request.body.title,
content: request.body.content
});
Post.updateOne({_id: request.params.id}, post)
.then(result => {
   console.log('result');
   response.status('200').json({message: 'succefully updated record'});
});

});

router.get('',(request,response,next) => {
Post.find()
  .then(documents=>{
    response.status(200).json({
      message:'Posts fetched successfully from server',
      posts: documents
    });
  })
//response.send('Response from Express');
});

router.get('/:id',(request,response,next) => {
Post.findById(request.params.id).then(post => {
 if(post){
   response.status(200).json(post);
 } else{
   response.status(400).json({message: "POST NOT FOUND"});
 }
})
});

router.delete('/:id',(request,response,next) => {
console.log("id :" +request.params.id );
Post.deleteOne({_id:request.params.id}).then(result => {
 console.log(result);
  response.status(200).json({message: "Post Deleted"});
});
});

module.exports =router;
