const mongoose = require('mongoose');
const { Schema } = mongoose;

const replySchema = new Schema({
    board: { type: String, required: true }, 
    thread_id: Schema.Types.ObjectId, 
    text: String,
    delete_password: String
  });
  
let Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;