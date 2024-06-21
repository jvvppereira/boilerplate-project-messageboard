const doConnection = () => {
    const mongoose = require('mongoose');
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw 'connection with mongo is missing'
    } 
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    
    mongoose.connect(uri,clientOptions);
};

module.exports = doConnection;