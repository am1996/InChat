let nunjucks = require("nunjucks");
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const knex = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./db.sqlite",
  },
  useNullAsDefault: true
});
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use('/static', express.static('public'));

//routes
app.get("/",(req,res)=>{
  res.render("index.njk");
});

//sockets
io.on("connection",(socket)=>{
  socket.on("chat message",(rid,msg)=>{
    socket.broadcast.emit("chat message",rid,msg);
  });
});
server.listen(3000, () => {});