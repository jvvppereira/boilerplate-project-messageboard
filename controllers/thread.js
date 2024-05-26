const Thread = require("../models/thread.js");

module.exports = {

    async get(req, res) {
        const board = req.params.board;
        const { limit, orderBy, repliesCount } = req.body;

        const filter = { board };
        let data;

        if (limit && orderBy && repliesCount) {

            data = await Thread.find(filter).limit(limit).exec();
            //:'recentFirst'
        } else {
            data = await Thread.find(filter).exec();
        }
        res.json(data);
    },

    async post(req, res) {
        const board = req.params.board;
        const { text, delete_password } = req.body;

        const document = new Thread({ board, text, delete_password });
        await document.save().then(data => res.json(data));
    },

    async put(req, res) { //TODO
        // await document.save().then(data => res.json(data));
    },

    async delete(req, res) { //TODO
        // await document.save().then(data => res.json(data));
    }
}