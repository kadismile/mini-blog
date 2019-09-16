const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const cors = require('cors');
const io = socketIo(server);
const mongoose = require('mongoose');

require('dotenv').config();
app.use(express.json());
app.use(cors());
//conect to tje database
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },
  ()=> console.log("Connected to the data Base"));


app.use('/', require('./routes/index'));
app.use('/customers', require('./routes/customers'));
app.use('/posts', require('./routes/posts'));
app.use('/blogs', require('./routes/blogs'));


io.on('connection', (socket) => {
  socket.on('greet', greeting => {
    console.log(greeting)
  })
});


const port = 5000;
server.listen(port, () => console.log(`server started on port ${port}`));


