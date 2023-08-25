const mongoose=require('mongoose');
const moment=require("moment");
const QuerySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        required:true,
        default:0
    },
    userimage:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    vote:{
        type:Number,
        required:true,
        default:0
    },
    askdate:{
        type:Date,
        default:moment().toDate(),
        required:true
    }
})

const QueryModel=new mongoose.model('querys',QuerySchema);

module.exports=QueryModel;