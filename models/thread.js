const mongoose = require('mongoose');
const { Schema } = mongoose;

const threadSchema = new Schema({
    board: { type: String, required: true }, 
    text: String,
    delete_password: String
  });
  
let Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;