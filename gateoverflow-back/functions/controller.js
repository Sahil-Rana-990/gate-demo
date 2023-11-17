const mongoose = require("mongoose");
const RegisterUserModel = require("../models/RegisterModel");
const uuid = require("uuid");
const ImageModel = require("../models/UploadImage");
const QueryModel = require("../models/QueryModel");
const AnswerModel=require("../models/AnswerModel");
const CommentModel=require("../models/CommentModel");
const moment = require("moment");

const user_register = async (req, res) => {
  const { username, password, email, contactnumber, termandcondition } =
    req.body;
  const user_register_data = await RegisterUserModel({
    username,
    password,
    email,
    contactnumber,
    termandcondition,
    userimage:"https://cdn3d.iconscout.com/3d/premium/thumb/user-profile-2871145-2384395.png",
    userfullname: "empty",
    gaterank: "empty",
    About: "Hello, I am using Gateoverflow",
    githublink: "empty",
    website: "empty",
    resume: "empty",
    joindate:moment().toDate(),
    lastseen:moment().toDate(),
  });
  await user_register_data
    .save()
    .then((result) => {
      console.log("Data Stored !!");
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.send({ error: err.message });
    });
};
const user_login = async (req, res) => {
  const { email, password } = req.body;

  const login_user_data = await RegisterUserModel.findOne({ email, password });
  if (login_user_data === null) {
    res.send({ message: "please register" });
  } else {
    res.send(login_user_data);
  }
};

const single_user = async (req, res) => {
  const singleuserdata = await RegisterUserModel.findOne({
    username: req.params.username,
  });
  await res.send({ singleUser: singleuserdata });
};

const upload_image = async (req, res) => {
  const uuid4 = uuid.v4();
  const ImageDataStored = ImageModel({
    imgName: uuid4,
    imgData: req.body.imageData,
    joindate:moment().toDate()
  });
  await ImageDataStored.save().then((result) => {
    console.log("image stored!!");
    res.send({ imageURL: `http://gate-demo-api.vercel.app/api/getimage/${uuid4}` });
  });
};

const Display_Image = async (req, res) => {
  const ImageObj = await ImageModel.findOne({ imgName: req.params.imgname });
  const imgdata = ImageObj.imgData.split(",")[1]; // Extract the base64 data part
  const imageBuffer = Buffer.from(imgdata, "base64");

  res.setHeader("Content-Type", "image/png");
  res.end(imageBuffer);
};
const update_user = async (req, res) => {
  const updatedSingleData = await RegisterUserModel.updateOne(
    { username: req.body.username },
    req.body.newdata
  );
  
  if(req.body.newdata.userimage===undefined){
    console.log("NO Image")
  }else{
    const updatequeryimagedata=await QueryModel.updateMany({username:req.body.username},{userimage:req.body.newdata.userimage});
    const updatecommentimagedata=await CommentModel.updateMany({username:req.body.username},{userimage:req.body.newdata.userimage});
    const updateanswerimagedata=await AnswerModel.updateMany({username:req.body.username},{userimage:req.body.newdata.userimage});
  }

  res.send({ message: "OK" });
};
const update_password = async (req, res) => {
  const findPasswordEle = await RegisterUserModel.findOne({
    password: req.body.password,
  });
  if (findPasswordEle === null) {
    res.send({ message: "FAILED" });
  } else {
    const updatePassword = await RegisterUserModel.updateOne(
      { password: req.body.password },
      { password: req.body.newpassword }
    );
    if (updatePassword) {
      res.send({ message: "OK" });
    }
  }
};

const upload_query = async (req, res) => {
  const { title, category, query, tags, username, userimage,askquestion } = req.body;

  const queryData = await QueryModel({
    title,
    category,
    query,
    tags,
    username,
    userimage,
    askdate:moment().toDate()
  });
  await queryData
    .save()
    .then(async (result) => {
      const noofanswer=await RegisterUserModel.updateOne({username},{askquestion:askquestion+1});
      await res.send({ message: "OK" });
    })
    .catch((err) => res.send({message:err.message}));
};

const user_activity = async (req, res) => {
  const task = req.body.task;
  if (task === "DoLastSeen") {
    const update_last_seen = await RegisterUserModel.updateOne(
      { email: req.body.useremail },
      { lastseen: moment().toDate() }
    );
    if(update_last_seen.modifiedCount===1){
      res.send({ message: "OK" });
    }
  }else if(task==="SET_UP_VOTE"){
    //case1
    const set_up_vote_done=await QueryModel.updateOne({_id:req.body.questionID},{vote:Number(req.body.votes)+1});
    //case2
    const set_questionID_user=await RegisterUserModel.findById(req.body.userid);
    if(set_questionID_user.arrayofdownvote.includes(req.body.questionID)===true){
      set_questionID_user.arrayofdownvote=set_questionID_user.arrayofdownvote.filter(val=> val!==req.body.questionID);

      set_questionID_user.gavedownvote=set_questionID_user.gavedownvote-1;
      set_questionID_user.save();

      const set_ask_user_receive_vote=await RegisterUserModel.findOne({username:req.body.askusername});
      set_ask_user_receive_vote.receivedownvote=set_ask_user_receive_vote.receivedownvote-1;
      set_ask_user_receive_vote.save()
    }else{
      set_questionID_user.arrayofupvote.push(req.body.questionID);
      set_questionID_user.gaveupvote=set_questionID_user.gaveupvote+1; //case 3
      set_questionID_user.save();

      //case4
      const set_ask_user_receive_vote=await RegisterUserModel.findOne({username:req.body.askusername});
      set_ask_user_receive_vote.receiveupvote=set_ask_user_receive_vote.receiveupvote+1;
      set_ask_user_receive_vote.save()
    }

    if(set_up_vote_done.modifiedCount===1){
      res.send({ message: "OK" });
    }
  }else if(task==="SET_DOWN_VOTE"){
     //case1
     const set_up_vote_done=await QueryModel.updateOne({_id:req.body.questionID},{vote:Number(req.body.votes)-1});
     //case2
     const set_questionID_user=await RegisterUserModel.findById(req.body.userid);
     if(set_questionID_user.arrayofupvote.includes(req.body.questionID)===true){
       set_questionID_user.arrayofupvote=set_questionID_user.arrayofupvote.filter(val=> val!==req.body.questionID);
 
       set_questionID_user.gaveupvote=set_questionID_user.gaveupvote-1;
       set_questionID_user.save();

       const set_ask_user_receive_vote=await RegisterUserModel.findOne({username:req.body.askusername});
      set_ask_user_receive_vote.receiveupvote=set_ask_user_receive_vote.receiveupvote-1;
      set_ask_user_receive_vote.save()
     }else{
       set_questionID_user.arrayofdownvote.push(req.body.questionID);
       set_questionID_user.gavedownvote=set_questionID_user.gavedownvote+1; //case 3
       set_questionID_user.save();
 
       //case4
       const set_ask_user_receive_vote=await RegisterUserModel.findOne({username:req.body.askusername});
       set_ask_user_receive_vote.receivedownvote=set_ask_user_receive_vote.receivedownvote+1;
       set_ask_user_receive_vote.save()
     }
 
     if(set_up_vote_done.modifiedCount===1){
       res.send({ message: "OK" });
     }
 
  }else if(task==='UPDATE_VIEW_ON_QUESTIONS'){
    const findQuestionbyId=await QueryModel.findById(req.body.questionid);
    if(findQuestionbyId.views.includes(req.body.userid)===false){
      findQuestionbyId.views.push(req.body.userid);
    }
    findQuestionbyId.views=[...new Set(findQuestionbyId.views)]
    findQuestionbyId.save().then(rs=>{
      res.send({message:"OK"})
    })
  }else if(task==="SET_UP_VOTE_ANS_COMM"){
    if(req.body.tag==="answer"){
      //case1
      const set_up_vote_done=await AnswerModel.updateOne({_id:req.body.answerID},{vote:Number(req.body.votes)+1});
      if(set_up_vote_done.modifiedCount===1){
        res.send({ message: "OK" });
      }
      
    }else if(req.body.tag==="comment"){
      const set_up_vote_done=await CommentModel.updateOne({_id:req.body.answerID},{vote:Number(req.body.votes)+1})
      if(set_up_vote_done.modifiedCount===1){
        res.send({ message: "OK" });
      }
    }
      //case2
      const set_questionID_user=await RegisterUserModel.findById(req.body.userid);
      if(set_questionID_user.arrayofdownvote.includes(req.body.answerID)===true){
        set_questionID_user.arrayofdownvote=set_questionID_user.arrayofdownvote.filter(val=> val!==req.body.answerID);

        set_questionID_user.gavedownvote=set_questionID_user.gavedownvote-1;
        set_questionID_user.save();

        const set_ask_user_receive_vote=await RegisterUserModel.findOne({username:req.body.postusername});
        set_ask_user_receive_vote.receivedownvote=set_ask_user_receive_vote.receivedownvote-1;
        set_ask_user_receive_vote.save()
      }else{
        set_questionID_user.arrayofupvote.push(req.body.answerID);
        set_questionID_user.gaveupvote=set_questionID_user.gaveupvote+1; //case 3
        set_questionID_user.save();

        //case4
        const set_ask_user_receive_vote=await RegisterUserModel.findOne({username:req.body.postusername});
        set_ask_user_receive_vote.receiveupvote=set_ask_user_receive_vote.receiveupvote+1;
        set_ask_user_receive_vote.save()
      }
  }else if(task==="SET_DOWN_VOTE_ANS_COMM"){
    if(req.body.tag==="answer"){
      //case1
      const set_up_vote_done=await AnswerModel.updateOne({_id:req.body.answerID},{vote:Number(req.body.votes)-1});
      if(set_up_vote_done.modifiedCount===1){
        res.send({ message: "OK" });
      }
      
    }else if(req.body.tag==="comment"){
      const set_up_vote_done=await CommentModel.updateOne({_id:req.body.answerID},{vote:Number(req.body.votes)-1})
      if(set_up_vote_done.modifiedCount===1){
        res.send({ message: "OK" });
      }
    }
    //case2
    const set_questionID_user=await RegisterUserModel.findById(req.body.userid);
    if(set_questionID_user.arrayofupvote.includes(req.body.answerID)===true){
      set_questionID_user.arrayofupvote=set_questionID_user.arrayofupvote.filter(val=> val!==req.body.answerID);

      set_questionID_user.gaveupvote=set_questionID_user.gaveupvote-1;
      set_questionID_user.save();

      const set_ask_user_receive_vote=await RegisterUserModel.findOne({username:req.body.postusername});
     set_ask_user_receive_vote.receiveupvote=set_ask_user_receive_vote.receiveupvote-1;
     set_ask_user_receive_vote.save()
    }else{
      set_questionID_user.arrayofdownvote.push(req.body.answerID);
      set_questionID_user.gavedownvote=set_questionID_user.gavedownvote+1; //case 3
      set_questionID_user.save();

      //case4
      const set_ask_user_receive_vote=await RegisterUserModel.findOne({username:req.body.postusername});
      set_ask_user_receive_vote.receivedownvote=set_ask_user_receive_vote.receivedownvote+1;
      set_ask_user_receive_vote.save()
    }

    
  }
};

const get_all_question = async (req, res) => {
    const allquestion=await QueryModel.find({});
    res.send(allquestion)
};

const get_single_question=async (req,res)=>{
  const singlequery=await QueryModel.findOne({_id:req.params.queryid});
  if(singlequery!=null){
    res.send(singlequery)
  }
}
const upload_answer=async (req,res)=>{
  const {query,userimage,username,questionid,noofcomment,noofanswer} =req.body.question;
  if(req.body.tag==="answer"){
    const answer_data=await AnswerModel({
      questionid,
      username,
      userimage,
      answer:query,
      date:moment().toDate()
    })
    await answer_data.save().then(async (rs)=>{
      const noofanswerupdated=await RegisterUserModel.updateOne({username},{noofanswer:noofanswer+1});
      res.send({message:"OK"});
    }).catch(er=>{
      console.log(er.message);
    })
  }else{
    const comment_data=await CommentModel({
      questionid,
      username,
      userimage,
      comment:query,
      date:moment().toDate()
    })
    await comment_data.save().then(async(rs)=>{
      const noofcommentupdated=await RegisterUserModel.updateOne({username},{noofcomment:noofcomment+1});
      res.send({message:"OK"});
    }).catch(er=>{
      console.log(er.message);
    })
  }
}
const get_all_answer=async (req,res)=>{
  const allanswers=await AnswerModel.find({});
    res.send(allanswers)
}
const get_all_comment=async (req,res)=>{
  const allcomments=await CommentModel.find({});
    res.send(allcomments)
}

module.exports = {
  user_register,
  user_login,
  upload_image,
  Display_Image,
  update_user,
  single_user,
  upload_query,
  user_activity,
  update_password,
  get_all_question,
  get_single_question,
  upload_answer,
  get_all_answer,
  get_all_comment
};
