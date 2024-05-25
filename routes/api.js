'use strict';

const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri,clientOptions);

const { Schema } = mongoose;

const threadSchema = new Schema({
  board: { type: String, required: true }, 
  text: String,
  delete_password: String
});

let Thread = mongoose.model('Thread', threadSchema);

module.exports = function (app) {

  app.route('/api/threads/:board')
    .get(async function (req, res) {
      const board = req.params.board;

      await Thread.find({ board }, data => res.json(data));
    });
 
  app.route('/api/threads/:board')
    .post(async function (req, res) {
      const { text, delete_password } = req.body;
      const board = req.params.board;

      const document = new Thread({ board, text, delete_password });
      await document.save().then(data => res.json(data));

    });

  // app.route('/api/replies/:board');

};
