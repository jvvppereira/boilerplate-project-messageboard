const Reply = require("../models/reply.js");

const getReply = async (filterParams) => { //done
    let reply = await Reply.find(filterParams).exec();
    return reply;
}

module.exports = {

    async get(req, res) { //TODO
        const board = req.params.board;
        const { limit, orderBy, repliesCount } = req.body;

        const filter = { board };
        const data = await getReply(filter);

        res.json(data);
    },

    async post(req, res) { //done
        const board = req.params.board;
        const { thread_id, text, delete_password } = req.body;

        const document = new Reply({ board, thread_id, text, delete_password });
        await document.save().then(data => res.json(data));
    },

    async put(req, res) { //TODO TEST
        const board = req.params.board;
        const { reply_id: id, thread_id, text, content, delete_password } = req.body;
        
        // let id = req.params.id;
        // if (!id) {
        //     const thread = await getByBoard(board);
        //     id = thread._id;
        // }

        const data = await Reply.findByIdAndUpdate(id, { board, thread_id, text, content, delete_password });
        res.json(data);
    },

    async delete(req, res) { //done
        const { reply_id: id, delete_password } = req.body;
        
        const threadFromDatabase = await getReply({_id:id});

        if (threadFromDatabase[0].delete_password == delete_password) {
            const data = await Reply.findByIdAndDelete(id);
            res.json(data);
        } else {
            res.json({});
        }
    }
}