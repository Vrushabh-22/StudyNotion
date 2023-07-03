const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        require:true,
    },
    description: {
        type:String,
        trim:true,
        require:true,
    },
    courses: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],

});


module.exports = mongoose.model("Category", categorySchema);