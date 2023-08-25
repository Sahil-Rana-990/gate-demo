const mongoose = require("mongoose");
const RegisterUserModel = require("../models/RegisterModel");
const uuid = require("uuid");
const ImageModel = require("../models/UploadImage");
const QueryModel = require("../models/QueryModel");
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
    userimage:
      "	https://cdn3d.iconscout.com/3d/premium/thumb/user-profile-2871145-2384395.png",
    userfullname: "empty",
    gaterank: "empty",
    About: "Hello, I am using Gateoverflow",
    githublink: "empty",
    website: "empty",
    resume: "empty",
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
  });
  await ImageDataStored.save().then((result) => {
    console.log("image stored!!");
    res.send({ imageURL: `https://gate-demo-api.vercel.app/api/getimage/${uuid4}` });
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
  const { title, category, query, tags, username, userimage } = req.body;
  const queryData = await QueryModel({
    title,
    category,
    query,
    tags,
    username,
    userimage,
  });
  await queryData
    .save()
    .then((result) => {
      console.log("Data Stored!!");
      res.send({ message: "OK" });
    })
    .catch((err) => console.log(err.message));
};

const user_activity = async (req, res) => {
  const task = req.body.task;
  if (task === "DoLastSeen") {
    const update_last_seen = await RegisterUserModel.updateOne(
      { email: req.body.useremail },
      { lastseen: moment().toDate() }
    );
    console.log("update_last_seen");
  }
  res.send({ message: "OK" });
};

const get_all_question = async (req, res) => {
    const allquestion=await QueryModel.find({});
    res.send(allquestion)
};

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
};
