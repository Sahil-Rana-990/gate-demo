import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuestionContext } from "./context/QuestionsContext";
import { BiTimeFive, BiUpArrow, BiDownArrow } from "react-icons/bi";
import { BsReplyAll } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import "./SingleQue.css";
import { Editor } from "@tinymce/tinymce-react";
import Moment from "moment";
import { useUserContext } from "./context/UserContext";

export default function SingleQue() {
  const { id } = useParams();
  let Alldata = JSON.parse(sessionStorage.getItem("isloggedIn") || "[]");

  let [editoropen, seteditoropen] = useState({
    open: false,
    for: "editor",
  });
  let [files, setfiles] = useState(0);
  let [answers, setanswers] = useState([]);
  let [comments, setcomments] = useState([]);
  let [section, setsection] = useState("answer");
  let [question, setquestion] = useState({
    query: "",
    userimage: Alldata.userimage,
    username: Alldata.username,
    questionid: id,
    noofanswer:Alldata.noofanswer,
    noofcomment:Alldata.noofcomment
  });
  const editorRef: any = useRef(null);
  const {
    get_single_query,
    singlequery,
    allanswers,
    allcomments,
    set_up_vote,
    set_down_vote,
    set_question_views,
    set_post_answer_or_comment,
    set_up_ANS_or_COMM,
    set_down_ANS_or_COMM
  } = useQuestionContext();

  const { userDetailInfo, getUser } = useUserContext();
  let [votes, setvotes] = useState(singlequery.vote);

  const insertSingleQuestionText = (query: String) => {
    setTimeout(() => {
      const ele: any = document.getElementById("single-question-text");
      ele.innerHTML = query;
    }, 0);
  };
  const setAnswerText = (query: String, id: Number) => {
    setTimeout(() => {
      const ele: any = document.getElementById(`answer${id}`);
      ele.innerHTML = query;
    }, 0);
  };
  const setCommentText = (query: String, id: Number) => {
    setTimeout(() => {
      const ele: any = document.getElementById(`comment${id}`);
      ele.innerHTML = query;
    }, 0);
  };

  useEffect(() => {
    get_single_query(id);
  }, []);
  useEffect(() => {
    // for answers
    let allanswersfilter = allanswers.filter(
      (val: any) => val.questionid === id
    );
    setanswers(allanswersfilter);
      // for comments
    let allcommentsfilter = allcomments.filter(
      (val: any) => val.questionid === id
    );
    setcomments(allcommentsfilter);
  }, [allanswers,allcomments]);
  useEffect(() => {
    if (userDetailInfo !== false) {
      set_question_views(id, userDetailInfo._id);
    }
    setvotes(singlequery.vote);
  }, [singlequery]);

  if (Object.keys(singlequery).length === 0 || userDetailInfo === false) {
    return <h1>Loading</h1>;
  }

  //  insert text
  insertSingleQuestionText(singlequery.query);

  // gave up vote
  const UpVote = async () => {
    const isupdated = await set_up_vote(
      id,
      votes,
      userDetailInfo._id,
      singlequery.username
    );
    if (isupdated === "OK") {
      getUser(userDetailInfo.username);
      setvotes(votes + 1);
    }
  };
  // gave down vote
  const DownVote = async () => {
    const isupdated = await set_down_vote(
      id,
      votes,
      userDetailInfo._id,
      singlequery.username
    );
    if (isupdated === "OK") {
      getUser(userDetailInfo.username);
      setvotes(votes - 1);
    }
  };
  const UP_A_OR_C=async(tag:String,id:String,vote:any,username:String)=>{
    const isupdated = await set_up_ANS_or_COMM(
      tag,
      id,
      vote,
      userDetailInfo._id,
      username
    );
    if (isupdated === "OK") {
      getUser(userDetailInfo.username);
      setvotes(votes + 1);
    }
  }
  const DOWN_A_OR_C=async(tag:String,id:String,vote:any,username:String)=>{
    const isupdated = await set_down_ANS_or_COMM(
      tag,
      id,
      vote,
      userDetailInfo._id,
      username
    );
    if (isupdated === "OK") {
      getUser(userDetailInfo.username);
      setvotes(votes + 1);
    }
  }

  async function POST_ANSWER(tag: String) {
    const isposted = await set_post_answer_or_comment(tag, question);
    if (isposted === "OK") {
      getUser(userDetailInfo.username);
      window.location.reload();
    }
  }
  
  return (
    <div className="my-10 xs:my-5">
      <div className="lg:max-w-[1820px] max-w-[1320px] md:mx-10 mx-auto sm:mx-5 xs:mx-2">
        {/* for title */}
        <div className="text-gray-400 text-[25px] sm:text-[22px] xs:text-[18px] leading-7 xs:leading-5 font-medium font-sans">
          {singlequery.title}
        </div>
        <div className="bg-[#36393F] my-5 rounded p-2">
          {/* user navbar for question */}
          <div
            className="flex p-2 px-3 justify-between"
            style={{ borderBottom: "1px solid black" }}
          >
            <div className="flex items-center cursor-pointerxs:block">
              <div className="flex items-center">
                <p className="text-white mr-1">
                  <BiTimeFive />
                </p>
                <p className="flex text-blue-500 xs:text-[12px]">
                  <p className="xs:hidden">Problem in</p>{" "}
                  <p className="text-blue-500 ml-1">{singlequery.category}</p>
                </p>
              </div>
              <p className="text-gray-300 ml-1 xs:text-[12px]">
                {Moment(singlequery.askdate).fromNow()}
              </p>
            </div>

            <div className="flex text-white xs:text-[12px] font-sans font-medium">
              <p>views</p> <p className="ml-1">{singlequery.views.length}</p>
            </div>
          </div>
          <div className="flex p-2">
            <div className="w-full">
              {/* main query section */}
              <div
                className="single-question-section"
                id="single-question-text"
              ></div>
              {/* tags section */}
              <div className="mt-2 flex flex-wrap items-center">
                {singlequery.tags.split(",").map((val: String, i: any) => (
                  <div
                    key={i}
                    className="mx-1 bg-[#fff]/40 rounded-full px-2 pb-1 font-sans font-medium cursor-pointer hover:shadow-lg my-0.5 xs:text-[12px]"
                  >
                    {val}
                  </div>
                ))}
                <div className="flex items-center mx-2">
                  <div className="w-8 h-8 mx-2">
                    <img src={singlequery.userimage} alt="" className="rounded-full"/>
                  </div>
                  <div className="text-gray-300 font-sans font-medium">
                    {singlequery.username}
                  </div>
                </div>
              </div>

              {/* answer & comment section */}
              <div className="my-2 mx-2 flex">
                <button
                  className="font-medium font-sans text-[18px] flex items-center bg-white/5 px-5 mr-2 px-2 pb-1 pt-1 text-gray-300 rounded-full cursor-pointer xs:text-[12px] xs:pt-1"
                  onClick={() =>
                    seteditoropen({ ...editoropen, open: true, for: "answer" })
                  }
                  disabled={
                    userDetailInfo.username === singlequery.username
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor:
                      editoropen.for == "answer" ? "green" : "#404349",
                  }}
                >
                  <BsReplyAll className="mr-2" />
                  <span>answer</span>
                </button>
                <button
                  className="font-medium font-sans text-[18px] flex items-center bg-white/5 px-5 mx-2 px-2 pb-1 pt-1 text-gray-300 rounded-full cursor-pointer xs:text-[12px] xs:pt-1"
                  onClick={() =>
                    seteditoropen({ ...editoropen, open: true, for: "comment" })
                  }
                  disabled={
                    userDetailInfo.username === singlequery.username
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor:
                      editoropen.for == "comment" ? "green" : "#404349",
                  }}
                >
                  <AiOutlineComment className="mr-2" />
                  <span>comment</span>
                </button>
              </div>
              <div
                style={{ display: editoropen.open ? "block" : "none" }}
                className="mb-[70px]"
              >
                <input
                  type="file"
                  id="my-file"
                  name="my-file"
                  style={{ display: "none" }}
                  onChange={(e: any) => setfiles(e.target.files[0])}
                />
                <Editor
                  id="data"
                  apiKey="vgqslsc9vjjerm2s36zxvqup8dzwlo0sreuw2g3uk1ypv24j"
                  // onChange={(e)=>console.log(e.target.getContent())}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onEditorChange={(e: any) => {
                    setquestion({ ...question, query: e });
                  }}
                  init={{
                    height: "350",
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "link",
                      "image",
                      "editimage",
                      "lists",
                      "charmap",
                      "preview",
                      "anchor",
                      "pagebreak",
                      "searchreplace",
                      "wordcount",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "mathquill",
                      "template",
                      "help",
                    ],
                    file_browser_callback_types: "image",
                    file_picker_callback: function (callback, value, meta) {
                      if (meta.filetype == "image") {
                        var input: any = document.getElementById("my-file");
                        input.click();
                        input.onchange = async function () {
                          async function readFileAsDataURL(file: any) {
                            let result_base64 = await new Promise((resolve) => {
                              let fileReader = new FileReader();
                              fileReader.onload = (e) =>
                                resolve(fileReader.result);
                              fileReader.readAsDataURL(file);
                            });
                            return result_base64;
                          }
                          var file = input.files[0];
                          let data64image = await readFileAsDataURL(file);

                          const res = await fetch(
                            "http://localhost:5000/api/uploadimage",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ imageData: data64image }),
                            }
                          );
                          const data = await res.json();
                          console.log(data);
                          callback(data.imageURL);
                        };
                      }
                    },
                    paste_data_images: true,
                    forced_root_block: "div",
                    forced_root_block_attrs: {
                      style: "color:#040304 ; font-family:sans-serif,Roboto",
                    },
                    toolbar:
                      "undo redo fontsizeinput fontfamilyinput | styles | bold italic underline | alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | link image | print preview media fullscreen | " +
                      "forecolor backcolor charmap blockquote lineheight code selectall strikethrough subscript superscript addcomment",
                    content_style:
                      "body {line-height:18px;font-family:Arial;color:#040304}",
                  }}
                />
                <button
                  className="float-right bg-[#7C39FF] p-2 rounded-sm mt-2 font-sans font-medium text-white px-5"
                  onClick={() => POST_ANSWER(editoropen.for)}
                >
                  POST
                </button>
                <button
                  className="mx-5 float-right bg-red-500 p-2 rounded-sm mt-2 font-sans font-medium text-white px-5"
                  onClick={() => seteditoropen({ open: false, for: "editor" })}
                >
                  CLOSE
                </button>
              </div>
              {/* answer ans comment*/}
              <div className="m-2 mt-5">
                <div className="flex">
                  <div
                    className="bg-gray-100/10 p-1 px-3 rounded-sm text-white font-sans font-bold cursor-pointer mx-1 xs:text-[10px] xs:font-medium"
                    onClick={() => setsection("answer")}
                    style={{
                      backgroundColor:
                        section == "answer" ? "green" : "#494C52",
                    }}
                  >
                    ANSWERS SECTION
                  </div>
                  <div
                    className="bg-gray-100/10 p-1 px-3 rounded-sm text-white font-sans font-bold cursor-pointer mx-1 xs:text-[10px]  xs:font-medium"
                    onClick={() => setsection("comment")}
                    style={{
                      backgroundColor:
                        section == "comment" ? "green" : "#494C52",
                    }}
                  >
                    COMMENTS SECTION
                  </div>
                </div>
                {section === "answer" ? (
                  <div>
                    {answers.map((data: any, i: any) => {
                      setAnswerText(data.answer, i);
                      return (
                        <div
                          className="flex p-3"
                          style={{ borderTop: "1px solid black" }}
                          key={i}
                        >
                          <div className="w-[50px] xs:w-[50px] flex justify-center">
                            <div>
                              <button onClick={()=>UP_A_OR_C("answer",data._id,data.vote,data.username)}
                                      disabled={userDetailInfo.username === data.username
                                        ? true
                                        : userDetailInfo?.arrayofupvote.includes(data._id)
                                        ? true
                                        : false}>
                                <BiUpArrow className="text-green-500 text-[20px] cursor-pointer xs:text-[15px]" />
                              </button>
                              <div className="text-[20px] ml-1 mt-[-7px] text-gray-400 leading-8 xs:text-[15px] xs:ml-1">
                                {data.vote}
                              </div>
                              <button onClick={()=>DOWN_A_OR_C("answer",data._id,data.vote,data.username)}
                                     disabled={
                                      data.vote === 0
                                        ? true
                                        : userDetailInfo.username === data.username
                                        ? true
                                        : false
                                    }>
                                <BiDownArrow className="text-red-500 text-[20px] xs:text-[15px]" />
                              </button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="w-[190px] p-2 flex items-center">
                              <div>
                                <img
                                  src={data.userimage}
                                  alt=""
                                  className="w-8 h-8 rounded-full"
                                />
                              </div>
                              <div className="mx-2 bg-[#7C39FF] font-medium font-medium font-sans px-2 text-white rounded-sm shadow-sm xs:text-[12px]">
                                ~{data.username}
                              </div>
                            </div>
                            <div id="answers-text" className="px-2">
                              <div id={`answer${i}`}></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {comments.map((data: any, i: any) => {
                      setCommentText(data.comment, i);
                      return (
                        <div
                          className="flex p-3"
                          style={{ borderTop: "1px solid black" }}
                          key={i}
                        >
                          <div className="w-[50px] xs:w-[50px] flex justify-center">
                            <div>
                              <button  onClick={()=>UP_A_OR_C("comment",data._id,data.vote,data.username)}>
                                <BiUpArrow className="text-green-500 text-[20px] cursor-pointer xs:text-[15px]" />
                              </button>
                              <div className="text-[20px] ml-1 mt-[-7px] text-gray-400 leading-8 xs:text-[15px] xs:ml-1">
                                {votes}
                              </div>
                              <button className="hover:bg-[#472D31] duration-200"  onClick={()=>UP_A_OR_C("comment",data._id,data.vote,data.username)}>
                                <BiDownArrow className="text-red-500 text-[20px] xs:text-[15px]" />
                              </button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="w-[190px] p-2 flex items-center">
                              <div>
                                <img
                                  src={data.userimage}
                                  alt=""
                                  className="w-8 h-8 rounded-full"
                                />
                              </div>
                              <div className="mx-2 bg-[#7C39FF] font-medium font-medium font-sans px-2 text-white rounded-sm shadow-sm xs:text-[12px]">
                                ~{data.username}
                              </div>
                            </div>
                            <div id="answers-text" className="px-2">
                              <div id={`comment${i}`}></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="w-[100px] xs:w-[50px] flex justify-center">
              <div>
                <button
                  onClick={UpVote}
                  className="hover:bg-green-900 duration-200"
                  style={{
                    backgroundColor: userDetailInfo?.arrayofupvote.includes(id)
                      ? "#14532D"
                      : "null",
                  }}
                  disabled={
                    userDetailInfo.username === singlequery.username
                      ? true
                      : userDetailInfo?.arrayofupvote.includes(id)
                      ? true
                      : false
                  }
                >
                  <BiUpArrow
                    className="text-green-500 text-[30px] cursor-pointer xs:text-[20px]"
                    style={{
                      cursor:
                        userDetailInfo.username === singlequery.username
                          ? "help"
                          : "pointer",
                    }}
                  />
                </button>
                <div
                  className="text-[30px] ml-1.5 mt-[-7px] text-gray-400 leading-8 xs:text-[20px] xs:ml-1"
                  style={{
                    color: userDetailInfo?.arrayofupvote.includes(id)
                      ? "green"
                      : "null",
                  }}
                >
                  {votes}
                </div>
                <button
                  onClick={DownVote}
                  disabled={
                    votes === 0
                      ? true
                      : userDetailInfo.username === singlequery.username
                      ? true
                      : false
                  }
                  className="hover:bg-[#472D31] duration-200"
                >
                  <BiDownArrow
                    className="text-red-500 text-[30px] xs:text-[20px]"
                    style={{
                      cursor:
                        votes === 0
                          ? "not-allowed"
                          : userDetailInfo.username === singlequery.username
                          ? "not-allowed"
                          : "pointer",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
