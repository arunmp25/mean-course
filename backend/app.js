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
                         'GET, POST, PATCH, DELETE, OPTIONS');
      next();
});

app.post('/api/posts',(request,response,next) => {
      // const post = request.body;
        const post = new Post({
           title: request.body.title,
           content: request.body.content
        });
        post.save();
        console.log(post);
       response.status(201).json({
         message: 'Post Added successfully'
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


module.exports = app;

