const mongoose=require('mongoose');

const ImageSchema=new mongoose.Schema({
    imgName:{
        type:String,
        required:true,
        unique:true
    },
    imgData:{
        type:String,
        required:true,
        unique:true
    },
    joindate:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

const ImageModel=new mongoose.model('images',ImageSchema);

module.exports=ImageModel;