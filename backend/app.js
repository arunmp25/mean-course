const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
       const post = request.body;
       response.status(201).json({
         message: 'Post Added successfully'
       });
});

app.get('/api/posts',(request,response,next) => {
  const posts =[
    {
      id: '1',
      title: 'First Server side post',
      content: 'This is comming from server'
    },
    {
      id: '2',
      title: 'Second Server side post',
      content: 'This is comming from server 2'
    },
    {
      id: '3',
      title: 'Third Server side post',
      content: 'This is comming from server 3'
    }
  ];

  response.status(200).json({
    message:'Posts fetched successfully from server',
    posts: posts
  });
 //response.send('Response from Express');
});


module.exports = app;

