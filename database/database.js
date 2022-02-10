const mongoose = require('mongoose');
const DB_CONNECT_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

 const Database = {
    connect: () => {
        mongoose.connect(
            `mongodb+srv://data_connect:1qaz%40WSX@node-server.ucu5l.mongodb.net/node-server?retryWrites=true&w=majority`,
            DB_CONNECT_OPTIONS
        )
            .then(() => console.log('Database is connected.'))
            .catch(err => console.log(err));
    }
};

module.exports =Database