const Reply = require("../models/reply.js");
const Thread = require("../models/thread.js");

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
        }

        res.json(data);
    },

    async post(req, res) {
        const board = req.params.board;
        const { thread_id, text, delete_password } = req.body;
        const created_on = new Date();
        const reported = false;

        const document = new Reply({ board, thread_id, text, delete_password, created_on, reported });
        const thread = await Thread.findById(thread_id);

        thread.replies.push(document);
        thread.bumped_on = created_on;

        await thread.save().then(() => res.json(document));
    },

    async put(req, res) {
        const { reply_id: id, thread_id } = req.body;

        const thread = await Thread.findById(thread_id);

        for (let index = 0; index < thread.replies.length; index++) {
            const currentReply = thread.replies[index];

            if (currentReply.id == id) {
                thread.replies[index].reported = true;
            }
        }
        await thread.save();

        res.send('reported');
    },

    async delete(req, res) { 
        const { reply_id, thread_id, delete_password } = req.body;

        const thread = await Thread.findById(thread_id);

        for (let index = 0; index < thread.replies.length; index++) {
            const currentReply = thread.replies[index];

            if (currentReply.id == reply_id) {
                if (currentReply.delete_password == delete_password) {
                    thread.replies[index].text = "[deleted]";

                    await thread.save();
                    res.send('success');
                    break;
                } else {
                    res.send('incorrect password');
                }
            }
        }
    }
}