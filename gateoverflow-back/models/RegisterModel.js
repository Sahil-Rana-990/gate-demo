const mongoose=require('mongoose');
const moment=require('moment');
const RegisterUserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactnumber:{
        type:String,
        required:true,
        unique:true,
        max:10,
        min:10
    },
    termandcondition:{
        type:Boolean,
        required:true
    },
    joindate:{
        type:Date,
        required:true
    },
    userimage:{
        type:String,
        required:true
    },
    userfullname:{
        type:String,
        required:true
    },
    gaterank:{
        type:String,
        required:true
    },
    About:{
        type:String,
        required:true
    },
    githublink:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    profileviews:{
        type:Array,
        required:true,
        default:[]
    },
    lastseen:{
        type:Date,
        required:true
    },
    askquestion:{
        type:Number,
        required:true,
        default:0
    },
    noofanswer:{
        type:Number,
        required:true,
        default:0
    },
    noofcomment:{
        type:Number,
        required:true,
        default:0
    },
    gaveupvote:{
        type:Number,
        required:true,
        default:0,
    },
    gavedownvote:{
        type:Number,
        required:true,
        default:0,
    },
    receiveupvote:{
        type:Number,
        required:true,
        default:0,
    },
    receivedownvote:{
        type:Number,
        required:true,
        default:0,
    },
    arrayofupvote:{
        type:Array,
        required:true,
        default:[]
    },
    arrayofdownvote:{
        type:Array,
        required:true,
        default:[]
    }
})

const RegisterUserModel=new mongoose.model('register-users',RegisterUserSchema);

module.exports=RegisterUserModel;