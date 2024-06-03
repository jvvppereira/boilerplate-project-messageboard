const Thread = require("../models/thread.js");

const getByBoard = async (board) => { //done
    let thread = await Thread.find({ board }).exec();
    return thread;
}

module.exports = {

    async get(req, res) { //TODO
        const board = req.params.board;
        const { limit, orderBy, repliesCount } = req.body;

        const filter = { board };
        let data;

        if (limit && orderBy && repliesCount) {

            data = await Thread.find(filter).limit(limit).exec();
            //:'recentFirst'
        } else {
            data = await getByBoard(board);
        }
        res.json(data);
    },

    async post(req, res) { //done
        const board = req.params.board;
        const { text, delete_password } = req.body;

        const document = new Thread({ board, text, delete_password });
        await document.save().then(data => res.json(data));
    },

    async put(req, res) { //TODO TEST
        const board = req.params.board;
        const { text, content, delete_password } = req.body;
        
        const thread = await getByBoard(board);
        const id = thread._id;

        const data = await Thread.findByIdAndUpdate(id, { board, text, content, delete_password });
        res.json(data);
    },

    async delete(req, res) { //TODO
        // await document.save().then(data => res.json(data));
    }
}