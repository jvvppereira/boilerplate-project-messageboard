'use strict';

module.exports = function (app) {

  app.route('/api/threads/:board')
    .get(function (req, res) {
      const threads = [];
      res.json(threads);
    });
 
  app.route('/api/threads/:board')
    .post(function (req, res) {
      const { text, delete_password } = req.body;
      const board = req.params.board;
      res.json({board, text, delete_password});
    });

  app.route('/api/replies/:board');

};
