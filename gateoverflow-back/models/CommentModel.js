const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({
    questionid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    userimage:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    vote:{
        type:Number,
        required:true,
        default:0
    }
})

const CommentModel=new mongoose.model('comments',CommentSchema);

module.exports=CommentModel;