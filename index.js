const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your React app's URL
        methods: ['GET', 'POST'], // Specify the allowed HTTP methods
    },
});

const dotenv = require('dotenv');
const cors = require('cors')
const path = require('path')
const uploadDestination = path.join(__dirname, "uploads");


const Connection = require('./DataBase/Connection');
const SignupRoute = require("./Routes/Authentication/Signup");
const LoginRoute = require("./Routes/Authentication/Login");
const Verification = require("./Routes/Authentication/Verification");
const SearchRoute = require('./Routes/App/Search')
const ContactRoute = require('./Routes/App/Contact')
const ChatsRoute = require('./Routes/App/Chats');
const DecodeToken = require('./Utils/TokenDecoder');

app.use("/uploads", express.static(uploadDestination));
app.use(express.json())
dotenv.config();
app.use(cors());

//test api route
app.get('/', (req, res) => {
    console.log(req.body)
    res.json({
        message: "OK"
    })
})

app.get('/token-id/:token', async (req, res) => {
    const decodedToken = await DecodeToken(req.params.token);
    res.json({
        message: "OK",
        decodedToken: decodedToken
    })
})

//authentication routes
app.use("/authentication", SignupRoute);
app.use("/authentication", LoginRoute);
app.use("/authentication", Verification);

//api for search function
app.use("/app", SearchRoute);

//api for contacts feature
app.use('/app', ContactRoute)

//api for handling chats
app.use('/app/chat', ChatsRoute)

//handling socket events
const userMap = new Map();
io.on('connection', (socket) => {
    //adding user to userMap
    socket.on('add-user', (data) => {
        userMap.set(data.socketID, data.mongoID);
        console.log(userMap)
    })

    socket.on('connect-personal', (data) => {
        let searchedValue = null;
        userMap.forEach((value, key) => {
            if (value === data.mongoID) {
                searchedValue = key;
                console.log("found")
                socket.emit('connect-personal-callback', {
                    otherSocketID: searchedValue,
                    otherMongoID: data.mongoID
                })
            }
        });
    })
})

const PORT = process.env.PORT || 5500;
server.listen(PORT, async () => {
    console.log("Server is starting...");
    //connecting with DataBase
    await Connection();
    console.log("Server is up and running")
})