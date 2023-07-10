const ChatModel = require('../../DataBase/Models/ChatModel');
const DecodeToken = require('../../Utils/TokenDecoder');

const ChatsRoute = require('express').Router();

ChatsRoute.post('/create-new-chat', async (req, res) => {
    try {
        const decodedToken = await DecodeToken(req.body.token);
        const fromID = decodedToken.id;
        const toID = req.body.toID;
        const chatID = fromID + toID;
        const NewChat = new ChatModel({
            chatID: chatID
        })
        await NewChat.save();
        res.json({
            message: "OK"
        })
    }
    catch (error) {
        console.log(error);
        res.json({
            error: error,
            message: "error"
        })
    }
})

ChatsRoute.post("/add-chat", async (req, res) => {
    //this route will add a new chat to database
    const decodedToken = await DecodeToken(req.body.token);
    const fromID = decodedToken.id;
    const toID = req.body.id;
    const content = req.body.content;

})

ChatsRoute.get("/get-chats/:chatID", async (req, res) => {
    //this route will fetch all chats from a given chatID

})

module.exports = ChatsRoute