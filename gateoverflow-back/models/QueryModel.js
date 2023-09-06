const mongoose=require('mongoose');
const moment=require("moment");
const QuerySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
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
        type:Array,
        required:true,
        default:[]
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
        required:true
    }
})

const QueryModel=new mongoose.model('querys',QuerySchema);

module.exports=QueryModel;