const mongoose = require('mongoose');
const { Schema } = mongoose;
const Reply = require('./reply');

const threadSchema = new Schema({
    board: { type: String, required: true }, 
    created_on: Date,
    bumped_on: Date,
    text: String,
    reported: Boolean,
    delete_password: String,
    replies: [Reply.schema]
  });
  
let Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;