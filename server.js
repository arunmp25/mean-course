const http = require('http');

const server = http.createServer((request,response) =>{
          response.end("This is my first response");
});
// if there is a port set in the environment variable use that
// else default to port 3000
server.listen(process.env.PORT || 3000);
