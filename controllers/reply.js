const Reply = require("../models/reply.js");
const Thread = require("../models/thread.js");

const getReply = async (filterParams) => { //done
    let reply = await Reply.find(filterParams).exec();
    return reply;
}

module.exports = {

    async get(req, res) { 
        const board = req.params.board;
        const thread_id = req.query.thread_id;

        let data;
        if (thread_id) {
            data = await Thread.find({ _id: thread_id }).exec();
            data = data.map(val => val._doc).map(reply => {
                delete reply.reported;
                delete reply.delete_password;
                return reply;
            })[0];
            for (let i = 0; i < data.length; i++) {
                const reply = data[i]; //refact, just 1 record
                const replies = await Reply.find({ thread_id: reply._id }).exec();
                reply.replies = replies;
            }
        }

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

        const replyFromDatabase = await getReply({ _id: id });

        if (replyFromDatabase[0].delete_password == delete_password) {
            await Reply.findByIdAndUpdate(id, { text: "[deleted]" });
            res.send('success');
        } else {
            res.send('incorrect password');
        }
    }
}