const mongoose=require("mongoose");

async function connectMongoDb(url) {
    //connection
    return  mongoose.connect(url);
}

module.exports={
    connectMongoDb,
};