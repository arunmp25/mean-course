const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();
//Mongo Db Connection String
//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
mongoose.connect("mongodb://localhost:27017/meandb?retryWrites=true")
        .then(()=>{
          console.log("Connection established");
        })
        .catch((e)=>{
          console.log("Error while connecting");
        })

app.use(bodyParser.json({ type: 'application/json'}));
//app.use(bodyParser.urlencoded({encoded: false}));


app.use((request,response,next) =>{
  console.log('in first middleware');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Headers',
                         'Origin, X-Requested-With, Content-Type, Accept');
      response.setHeader('Access-Control-Allow-Methods',
                         'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      next();
});

app.post('/api/posts',(request,response,next) => {
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

app.put('/api/posts/:id',(request,response,next) =>{
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

app.get('/api/posts',(request,response,next) => {
  Post.find()
      .then(documents=>{
        response.status(200).json({
          message:'Posts fetched successfully from server',
          posts: documents
        });
      })
 //response.send('Response from Express');
});

app.get('/api/posts/:id',(request,response,next) => {
   Post.findById(request.params.id).then(post => {
     if(post){
       response.status(200).json(post);
     } else{
       response.status(400).json({message: "POST NOT FOUND"});
     }
   })
});

app.delete('/api/posts/:id',(request,response,next) => {
  console.log("id :" +request.params.id );
  Post.deleteOne({_id:request.params.id}).then(result => {
     console.log(result);
      response.status(200).json({message: "Post Deleted"});
  });
});


module.exports = app;

