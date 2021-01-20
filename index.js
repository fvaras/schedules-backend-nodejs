// express
const express = require('express')
const app = express()
const cors = require('cors')

// socket.io
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

// dependency inversion
const { connection } = require('./services/socket.service')
const schedulesService = require('./services/schedules.service')

io.on('connection', socket => connection(socket, io)(schedulesService));

const port = process.env.PORT || 3001

// middlewares
app.use(cors())

// endpoints
app.get('/', (req, res) => {
    res.send('Hello Worlds!')
})


// listen
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})