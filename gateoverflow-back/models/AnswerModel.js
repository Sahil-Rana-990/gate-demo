const mongoose=require('mongoose');

const AnswerSchema=new mongoose.Schema({
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
    answer:{
        type:String,
        required:true
    },
    vote:{
        type:Number,
        required:true,
        default:0
    }
})

const AnswerModel=new mongoose.model('answers',AnswerSchema);

module.exports=AnswerModel;