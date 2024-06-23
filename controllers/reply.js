const Reply = require("../models/reply.js");
const Thread = require("../models/thread.js");

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

    async post(req, res) { 
        const board = req.params.board;
        const { thread_id, text, delete_password } = req.body;
        const created_on = new Date();
        const reported = false;

        const document = new Reply({ board, thread_id, text, delete_password, created_on, reported });
        await Thread.findByIdAndUpdate(thread_id, { bumped_on: created_on });
        await document.save().then(data => res.json(data));
    },

    async put(req, res) { 
        const board = req.params.board;
        const { reply_id: id, thread_id, text, content, delete_password } = req.body;
        const reported = true;

        await Reply.findByIdAndUpdate(id, { board, thread_id, text, content, delete_password, reported });        
        
        res.send('reported');
    },

    async delete(req, res) { //done
        const { reply_id: id, delete_password } = req.body;
        
        const replyFromDatabase = await getReply({_id:id});

        if (replyFromDatabase[0].delete_password == delete_password) {
            await Reply.findByIdAndDelete(id);
            res.send('success');
        } else {
            res.send('incorrect password');
        }
    }
}