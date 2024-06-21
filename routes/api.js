'use strict';

const doConnection = require("../models/connection.js");

doConnection();

const THREAD_PATH = '/api/threads/:board';
const thread = require('../controllers/thread.js');

const REPLY_PATH = '/api/replies/:board';
const reply = require('../controllers/reply.js');

module.exports = function (app) {

  app.get(THREAD_PATH, thread.get);
  app.post(THREAD_PATH, thread.post);
  app.put(THREAD_PATH, thread.put);
  app.delete(THREAD_PATH, thread.delete);

  app.get(REPLY_PATH, reply.get);
  app.post(REPLY_PATH, reply.post);
  app.put(REPLY_PATH, reply.put);
  app.delete(REPLY_PATH, reply.delete);

};
