const  dbConnection = require('mongoose');

dbConnection.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:3001/NoSQL-Social-Network-API',
    {
        useNewUrlParser : true ,
        useUnifiedTopology  :true,
    });

    dbConnection.set("debug", true);

module.exports = dbConnection ;
