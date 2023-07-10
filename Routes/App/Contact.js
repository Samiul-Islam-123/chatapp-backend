const UserModel = require('../../DataBase/Models/UserModel');
const DecodeToken = require('../../Utils/TokenDecoder')

const ContactRoute = require('express').Router();

ContactRoute.get('/get-contacts/:token', async (req, res) => {
    //this route will fetch all contacts of a gven userID
    const token = req.params.token;
    const decodedToken = await DecodeToken(token);
    const Contacts = await UserModel.findOne({ _id: decodedToken.id });
    res.json({
        message: "OK",
        data: Contacts,
        myID: decodedToken.id
    })

})

ContactRoute.post('/add-contact', async (req, res) => {
    //this route will add a new contacts inside user cluster
    const contactID = req.body.contactID;
    const token = req.body.token;
    const decodedToken = await DecodeToken(token);
    const UserData = await UserModel.findOne({
        _id: decodedToken.id
    })
    const targetContactData = await UserModel.findOne({
        _id: contactID
    });
    if (targetContactData) {
        UserData.contacts.push({
            username: targetContactData.username,
            userAvatarURL: targetContactData.avatarURL,
            contactID: contactID
        })

        await UserData.save();
        res.json({
            message: "OK",
            contactID: contactID
        })
    }
})

ContactRoute.post('/update-other-contact', async (req, res) => {
    try {
        //fetch other userData
        const otherUserData = await UserModel.findOne({
            _id: req.body.contactID
        })
        //fetch my data
        const token = req.body.token;
        const decodedToken = await DecodeToken(token);
        const MyData = await UserModel.findOne({
            _id: decodedToken.id
        })
        otherUserData.contacts.push({
            username: MyData.username,
            userAvatarURL: MyData.avatarURL,
            contactID: req.body.contactID
        })

        await otherUserData.save();

        res.json({
            message: "OK"
        })
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "error",
            error: error
        })
    }
})

module.exports = ContactRoute;