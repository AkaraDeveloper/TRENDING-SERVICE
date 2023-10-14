//==============================<<<--- CONNECTION TO MONGO DATABASE --->>>===========================
//--- Refactored at : 1 octuber 2023
//----------------------------------

const mongoose = require("mongoose");
module.exports = () => {
    // connect to the mongod instance to start the mongodb database server
    mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true });
    // if get the result object from the connection 
    const isConnected = mongoose.connection;
    isConnected.on("error", () => console.log("<< --- 🤢|= The connection to the mongo database has been raised error 💥"));
    isConnected.on("open", () => {
        console.log("<< ----👌|= Connection to database is completed ✔")
        console.log();
        console.log("<<_______________________________________________________________________________________________________________>>");
    }
    );

}