const Thread = require("../models/thread.js");

const getThread = async (filterParams) => { //done
    let thread = await Thread.find(filterParams).exec();
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
            data = await getThread(filter);
        }
        res.json(data);
    },

    async post(req, res) { //done
        const board = req.params.board;
        const { text, delete_password } = req.body;
        const created_on = new Date();
        const bumped_on = new Date();
        const reported = false;

        const document = new Thread({ board, text, delete_password, created_on, bumped_on, reported });
        await document.save().then(data => res.json({...data.toJSON(), replies: []}));
    },

    async put(req, res) { 
        const board = req.params.board;
        const { thread_id: id, text, content, delete_password } = req.body;
        const reported = true;

        await Thread.findByIdAndUpdate(id, { board, text, content, delete_password, reported });
        
        res.text('reported');
    },

    async delete(req, res) { //done
        const { thread_id: id, delete_password } = req.body;
        
        const threadFromDatabase = await getThread({_id:id});

        if (threadFromDatabase[0].delete_password == delete_password) {
            await Thread.findByIdAndDelete(id);
            res.text('success');
        } else {
            res.text('incorrect password');
        }
    }
}