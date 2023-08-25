require("./db/conn");
const express = require("express");
const app = express();
const RegisterUserModel = require("./models/RegisterModel");
const {
  user_register,
  user_login,
  upload_image,
  Display_Image,
  update_user,
  single_user,
  upload_query,
  user_activity,
  update_password,
  get_all_question
} = require("./functions/controller");
const cors = require("cors");

// app use
app.use(express.json({ limit: "20mb" }));
app.use(
  express.urlencoded({ limit: "20mb", extended: true, parameterLimit: 50000 })
);
app.use(cors({
    origin:"http://localhost:3000",
    methods:["POST","GET"]
}));

app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/api/uploadimage", upload_image);
app.get("/singleuser/:username", single_user);
app.get("/api/getimage/:imgname", Display_Image);
app.post("/registeruser", user_register); //registeruser
app.post("/loginuser", user_login);
app.post("/updateuser", update_user);
app.post("/query/uploadquery",upload_query);
app.post("/useractivity",user_activity);
app.post("/updatepassword",update_password);
app.get("/allquestions",get_all_question)


app.listen(5000, () => {
  console.log("port 5000");
});
