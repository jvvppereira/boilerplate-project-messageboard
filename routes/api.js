'use strict';

const doConnection = require("../model/connection.js");
const Thread = require("../model/thread.js");
const Reply = require("../model/reply.js");

doConnection();

module.exports = function (app) {

  app.route('/api/threads/:board')
    .get(async function (req, res) {
      const board = req.params.board;
      const { limit, orderBy, repliesCount } = req.body;

      const filter = { board };
      let data;

      if (limit && orderBy && repliesCount) {
        
        data = await Thread.find(filter).limit(limit).exec();
        //:'recentFirst'
      } else {
        data = await Thread.find(filter).exec();
      }
      res.json(data);
    });
 
  app.route('/api/threads/:board')
    .post(async function (req, res) {
      const board = req.params.board;
      const { text, delete_password } = req.body;

      const document = new Thread({ board, text, delete_password });
      await document.save().then(data => res.json(data));
    });
};
