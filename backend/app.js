const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const mongoose = require('mongoose');

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

app.use('/api/posts',postRoutes);

module.exports = app;

