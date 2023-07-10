const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    chatID: String,
    chatData: [{
        fromID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        content: String,
        toID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        timeStamp: Date
    }]
})

const ChatModel = new mongoose.model('Chats', ChatSchema);
module.exports = ChatModel;