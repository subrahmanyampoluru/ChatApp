var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var shortid = require('shortid')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

var port = process.env.PORT || 9090

var router = express.Router()

// Unsafely enable cors
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// logging middleware
router.use(function(req, res, next) {
    next()
})

// Simple in memory database
const database = [{
    name: 'Tea Chats',
    id: 0,
    users: ['Ryan', 'Nick', 'Danielle'],
    messages: [{
        name: 'Ryan',
        message: 'ayyyyy',
        id: 'gg35545',
        reaction: null
    }, {
        name: 'Nick',
        message: 'lmao',
        id: 'yy35578',
        reaction: null
    }, {
        name: 'Danielle',
        message: 'leggooooo',
        id: 'hh9843',
        reaction: null
    }]
}, {
    name: 'Coffee Chats',
    id: 1,
    users: ['Jessye'],
    messages: [{
        name: 'Jessye',
        message: 'ayy',
        id: 'ff35278',
        reaction: null
    }]
}]


// Utility functions
const findRoom = (roomId) => {
    const room = database.find((room) => {
        return room.id === parseInt(roomId)
    })
    if (room === undefined) {
        return {
            error: `a room with id ${roomId} does not exist`
        }
    }
    return room
}

const findRoomIndex = (roomId) => {
    const roomIndex = database.findIndex((room) => {
        return room.id === parseInt(roomId)
    })
    return roomIndex
}

const findMessageIndex = (room, messageId) => {
    const messageIndex = room.messages.findIndex((message) => {
        return message.id === messageId
    })
    return messageIndex
}

const logUser = (room, username) => {
    const userNotLogged = !room.users.find((user) => {
        return user === username
    })

    if (userNotLogged) {
        room.users.push(username)
    }
}

// API Routes
router.get('/rooms', function(req, res) {
    const rooms = database.map((room) => {
        return {
            name: room.name,
            id: room.id
        }
    })
    res.json(rooms)
})

router.get('/rooms/:roomId', function(req, res) {
    room = findRoom(req.params.roomId)
    if (room.error) {
        res.json(room)
    } else {
        res.json({
            name: room.name,
            id: room.id,
            users: room.users
        })
    }
})

router.route('/rooms/:roomId/messages')
    .get(function(req, res) {
        room = findRoom(req.params.roomId)
        if (room.error) {
            res.json(room)
        } else {
            res.json(room.messages)
        }
    })
    .post(function(req, res) {
        room = findRoom(req.params.roomId)
        if (room.error) {
            res.json(room)
        } else if (!req.body.name || !req.body.message) {
            res.json({
                error: 'request missing name or message'
            })
        } else {
            logUser(room, req.body.name)
            const reaction = req.body.reaction || null
            const messageObj = {
                name: req.body.name,
                message: req.body.message,
                id: shortid.generate(),
                reaction
            }
            room.messages.push(messageObj)
            
            res.json(messageObj)
        }
    })



app.use('/api', router)
app.listen(port)

/* Socket IO Connection */
const server = require('http').createServer()
const io = require('socket.io')(server)
server.listen(3001);
io.on('connection', (socket) => {
    currRoom = '';
    console.log('Websocket Connection: ', socket.id);
    socket.on('chat', function(data) {
        let room = findRoom(data.room.id)
        socket.broadcast.to(room.id).emit('chat',{room:data.room.id,username:data.name,message:data.message});
    });
    socket.on('join room', function(data) {
        room = findRoom(data.room);
        if(room.id!==currRoom){
            socket.leave(currRoom);
        }
        logUser(room, data.name);
        socket.join(room.id);
        currRoom = room.id;
        
    });
});
console.log(`API running at localhost:${port}/api`)