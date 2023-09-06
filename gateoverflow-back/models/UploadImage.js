const mongoose=require('mongoose');

const ImageSchema=new mongoose.Schema({
    imgName:{
        type:String,
        required:true,
    },
    imgData:{
        type:String,
        required:true
    },
    joindate:{
        type:Date,
        required:true
    }
})

const ImageModel=new mongoose.model('images',ImageSchema);

module.exports=ImageModel;