const Thread = require("../models/thread.js");
const Reply = require("../models/reply.js");

const getThread = async (filterParams) => {
    let thread = await Thread.find(filterParams).exec();
    return thread;
}

module.exports = {

    async get(req, res) {
        const board = req.params.board;
        // const thread_id = req.params.thread_id;
        // const { limit, orderBy, repliesCount } = req.body;
        let data = await getThread({ board });
        data = data.map(val => val._doc).map(thread => {
            delete thread.reported;
            delete thread.delete_password;
            return thread;
        });
        // for (let i = 0; i < data.length; i++) {
        //     const thread = data[i];
        //     const replies = await Reply.find({ thread_id: thread._id }).exec();
        //     thread.replies = replies;
        // }
        res.json(data);
    },

    async post(req, res) { //done
        const board = req.params.board;
        const { text, delete_password } = req.body;
        const created_on = new Date();
        const bumped_on = new Date();
        const reported = false;

        const document = new Thread({ board, text, delete_password, created_on, bumped_on, reported });
        await document.save().then(data => res.json(data.toJSON()));
    },

    async put(req, res) {
        const board = req.params.board;
        const { report_id: id, text, content, delete_password } = req.body;
        const reported = true;

        await Thread.findByIdAndUpdate(id, { board, text, content, delete_password, reported });

        res.send('reported');
    },

    async delete(req, res) { //done
        const { thread_id: id, delete_password } = req.body;

        const threadFromDatabase = await getThread({ _id: id });

        if (threadFromDatabase[0].delete_password == delete_password) {
            await Thread.findByIdAndDelete(id);
            res.send('success');
        } else {
            res.send('incorrect password');
        }
    }
}