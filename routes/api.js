'use strict';

const doConnection = require("../models/connection.js");

doConnection();

const THREAD_PATH = '/api/threads/:board';
const thread = require('../controllers/thread.js');

module.exports = function (app) {

  app.get(THREAD_PATH, thread.get);
  app.post(THREAD_PATH, thread.post);
  app.put(THREAD_PATH, thread.put);


};
