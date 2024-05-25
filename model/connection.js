const doConnection = () => {
    const mongoose = require('mongoose');
    const uri = process.env.MONGO_URI;
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    
    mongoose.connect(uri,clientOptions);
};

module.exports = doConnection;