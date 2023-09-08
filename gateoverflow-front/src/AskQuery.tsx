import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast, ToastContainer } from "react-toastify";
import { useQuestionContext } from "./context/QuestionsContext";

const AskQuery = () => {
  let { upload_query } = useQuestionContext();

  let [files, setfiles] = useState(0);
  const editorRef: any = useRef(null);

  let Alldata = JSON.parse(sessionStorage.getItem("isloggedIn") || "[]");
  let [question, setquestion] = useState({
    title: "",
    category: "",
    query: "",
    tags: "",
    userimage: Alldata.userimage,
    username: Alldata.username,
    askquestion:Alldata.askquestion
  });

  const changeQuestionData = (e: any) => {
    const { name, value } = e.target;
    setquestion({ ...question, [name]: value });
  };

  const FinalSubmit = () => {
    if (
      question.title === "" ||
      question.category == "" ||
      question.tags === ""
    ) {
      toast.warning("Please, Fill Data", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      // -----------------------   for upload query
      upload_query(question);
    }
  };

  if (sessionStorage.getItem("isloggedIn") === null) {
    return (
      <section className="container mx-auto">
        <div className="" style={{ color: "#fff" }}>
          Please login...
        </div>
      </section>
    );
  }
  return (
    <section className="bg-[#25272A] dark:bg-gray-900 mt-[20px] mb-[100px]">
      <ToastContainer />
      <div className="flex flex-col items-center px-6 mx-auto lg:py-0">
        <div className="w-[70%] sm:w-[100%] xs:w-[110%] my-3">
          <span className="text-4xl text-white font-medium">
            Ask a question
          </span>
        </div>
        <div className="w-[70%] sm:w-[100%] xs:w-[110%] bg-[#36393F] rounded-md p-5">
          {/* Awareness section */}
          <div className="">
            <p className="text-[14px] xs:text-[10px] text-gray-300 leading-4 font-sans font-medium">
              × All previous year questions are stored under the "Previous" TAB.
              Please select a year and choose a question number. Please try to
              add question source (e.g. Cormen 3rd edition 2.5, ISRO 2015 33
              etc.) as Question Title. Use the Question Description part for the
              question text.
            </p>
            <p className="text-[14px] xs:text-[10px] text-gray-300 leading-4 font-sans font-medium my-1">
              Also please refrain from posting any copy righted or coaching
              material here. If you do so, you risk being banned from here. You
              can see more posting guidelines here.
            </p>
            <p className="text-[14px] xs:text-[10px] text-gray-300 leading-4 font-sans font-medium my-1">
              Space is a tag separator here; so please use '-' to combine words
              in tag filed. Most of the tags will be auto-completed when you
              type a few letters.
            </p>
          </div>

          {/* title section */}
          <div className="mt-[60px]">
            <div className="relative">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                placeholder=" "
                name="title"
                onChange={changeQuestionData}
              />
              <label className="absolute text-lg text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#36393F] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-[#7C39FF]peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Title of Question
              </label>
            </div>
          </div>

          {/* category section */}
          <div className="mt-[40px] flex items-center">
            <div className="text-white text-[15px] font-medium">Category :</div>
            <div>
              <select
                name="category"
                onChange={changeQuestionData}
                id=""
                className="rounded-sm w-[200px] xs:w-[150px] mx-2 bg-[#4D515A] text-white"
              >
                <option value="" defaultValue={""}></option>
                <option value="General Aptitude">General Aptitude</option>
                <option value="Engineering Mathematics">
                  Engineering Mathematics
                </option>
                <option value="Digital Logic">Digital Logic</option>
                <option value="Programming and DS">Programming and DS</option>
                <option value="Algorithms">Algorithms</option>
                <option value="Theory of Computation">
                  Theory of Computation
                </option>
                <option value="Compiler Design">Compiler Design</option>
                <option value="Operating System">Operating System</option>
                <option value="Databases">Databases</option>
                <option value="CO and Architecture">CO and Architecture</option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Non GATE">Non GATE</option>
                <option value="Others">Others</option>
                <option value="Admissions">Admissions</option>
                <option value="Unknown Category">Unknown Category</option>
              </select>
            </div>
          </div>

          {/* editor section */}
          <div className="mt-[30px]">
            <input
              type="file"
              id="my-file"
              name="my-file"
              style={{ display: "none" }}
              onChange={(e: any) => setfiles(e.target.files[0])}
            />
            <span className="text-white text-[15px] font-medium">
              Question text in full:
            </span>
            <div className="my-1">
              <Editor
                id="data"
                apiKey="vgqslsc9vjjerm2s36zxvqup8dzwlo0sreuw2g3uk1ypv24j"
                // onChange={(e)=>console.log(e.target.getContent())}
                onInit={(evt, editor) => (editorRef.current = editor)}
                onEditorChange={(e) => {
                  var outele: any = document.querySelector(".outputofeditor");
                  outele.innerHTML = e;
                  for (let i = 0; i < outele.childNodes.length; i++) {
                    if (outele.childNodes[i].nodeName !== "#text") {
                      outele.childNodes[i].style.lineHeight = "20px";
                      outele.childNodes[i].style.color = "white";
                    }
                  }
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
            </div>
            <div className="mt-2">
              <div>
                <hr className="w-full mb-2" />
              </div>
              <div>
                <div className="outputofeditor text-[#fff]"></div>
              </div>
              <div>
                <hr className="w-full mt-2" />
              </div>
            </div>
          </div>

          {/* tags section */}
          <div className="mt-[30px]">
            <div className="relative">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                placeholder=" "
                name="tags"
                onChange={changeQuestionData}
              />
              <label className="absolute text-lg text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#36393F] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-[#7C39FF]peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Tags-use comma to combine words
              </label>
            </div>
          </div>

          {/* final button */}
          <div className="mt-[40px]">
            <div
              className="bg-[#7C39FF] p-3 rounded-sm text-white font-medium text-[12px] float-right cursor-pointer"
              onClick={() => FinalSubmit()}
            >
              ASK THE QUESTION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskQuery;
