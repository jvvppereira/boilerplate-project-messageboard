const Thread = require("../models/thread.js");

const getThread = async (filterParams) => {
    let thread = await Thread.find(filterParams).exec();
    return thread;
}

module.exports = {

    async get(req, res) {
        const board = req.params.board;
        let threads = await getThread({ board });
        threads = threads.map(val => val._doc).map(thread => {
            delete thread.reported;
            delete thread.delete_password;
            thread.replies = thread.replies.map(reply => {
                const newReply = reply._doc;
                delete newReply.reported;
                delete newReply.delete_password;
                return newReply;
            })
            return thread;
        })
        res.json(threads);
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