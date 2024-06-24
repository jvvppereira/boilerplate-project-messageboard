const Reply = require("../models/reply.js");
const Thread = require("../models/thread.js");

const getReply = async (filterParams) => {
    const { reply_id, thread_id } = filterParams;
    const thread = await Thread.find({ _id: thread_id }).exec();
    const reply = thread[0].replies.find( reply => reply.id == reply_id);
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

            const reply = data;
            const replies = await Reply.find({ thread_id: reply._id }).exec();
            reply.replies = replies;
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

        await thread.save().then(data => res.json(data));
    },

    async put(req, res) {
        const board = req.params.board;
        const { reply_id: id, thread_id, text, content, delete_password } = req.body;
        const reported = true;

        //todo review
        await Reply.findByIdAndUpdate(id, { board, thread_id, text, content, delete_password, reported });

        res.send('reported');
    },

    async delete(req, res) { //done
        const { reply_id, thread_id, delete_password } = req.body;

        const replyFromDatabase = await getReply({ reply_id, thread_id });

        if (replyFromDatabase.delete_password == delete_password) {
            await Reply.findByIdAndUpdate(id, { text: "[deleted]" });
            res.send('success');
        } else {
            res.send('incorrect password');
        }
    }
}