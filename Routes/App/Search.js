const SearchRoute = require('express').Router();
const UserModel = require('../../DataBase/Models/UserModel')

SearchRoute.get('/search-user/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const regex = new RegExp(username, 'i'); // 'i' flag for case-insensitive search
        const Data = await UserModel.find({ username: regex });


        if (Data.length > 0) {
            res.json({
                message: 'OK',
                users: Data,
            });
        } else {
            res.json({
                message: 'No users found with this username :(',
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'error',
            error: error,
        });
    }
});


module.exports = SearchRoute;