import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsQuestionLg } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { CgTag } from "react-icons/cg";
import Moment from "moment";
import "./animation.css";
import { useUserContext } from "./context/UserContext";

const Profile = () => {
  const { username } = useParams();
  let [userdata, setuserdata]: any = useState("");
  let [userviews,setuserviews]=useState("");
  const {userDetailInfo,handleUserViewOperation}=useUserContext()

  async function getAllUserData() {
    let getAllData: any = await fetch(
      `https://gate-demo-api.vercel.app/singleuser/${username}`
    );
    let { singleUser } = await getAllData.json();
    setuserdata(singleUser);
    setuserviews(singleUser.profileviews.length)
    
  }

  useEffect(() => {
    getAllUserData();
  }, []);

  // handle user views
  async function handleuserviews(){
    if(userDetailInfo.username!==undefined && userdata.username!==undefined){
      if(userdata.username!==userDetailInfo.username){
        console.log(userdata.username,userDetailInfo.username)
        let flag=await handleUserViewOperation(userdata._id,userDetailInfo.username)
        getAllUserData()
      }else console.log("object")
    }
  }
  useEffect(()=>{
    handleuserviews()
  },[userDetailInfo])

  function openCity(evt: any, cityName: any) {
    var i, tabcontent: any, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var citynameele: any = document.getElementById(cityName);
    citynameele.style.display = "block";
    evt.currentTarget.className += " active";
  }

  return (
    <section className="dark:bg-gray-900 mb-[100px]">
      <div className="grid-section profile-back grid grid-cols-3 p-5 flex items-center gap-5">
        <div className="">
          <img
            src={userdata.userimage}
            alt="hello"
            className="w-[300px] h-[300px] sm:w-[200px] sm:h-[200px] xs:w-[100px] xs:h-[100px] mx-auto rounded-lg"
          />
        </div>
        <div className="my-5 xs:w-[180px]">
          <div className="text-2xl text-white flex xs:text-[15px]">
            About <p className="text-blue-500 mx-2">@{userdata.username}</p>
          </div>
          <div className="user-about-section leading-[20px] text-gray-400 my-2 w-[80%] font-sans font-medium h-[200px] overflow-auto">
            {userdata.About}
          </div>

          <div className="responsive-about-section hidden">
            <div className="text-gray-500 my-2 xs:my-1 xs:text-[10px]">
              Last Seen:-{Moment(userdata.joindate).fromNow()}
            </div>
            <div className="flex">
              <div className="bg-[#D4AF37]/80 text-[20px] mr-1 rounded-sm flex items-center p-1 w-[80px] bg-[#D4AF37]/80 xs:p-[2px] xs:text-[15px]">
                <CgTag />
                10
              </div>
              <div className="bg-[#CCCCCC]/50 text-[20px] mx-1 rounded-sm flex items-center p-1 w-[80px] bg-[#CCCCCC]/80 xs:p-[1px] xs:text-[15px]">
                <CgTag />
                100
              </div>
              <div className="bg-[#B87333]/50 text-[20px] mx-1 rounded-sm flex items-center p-1 w-[80px] bg-[#B87333]/80 xs:p-[1px] xs:text-[15px]">
                <CgTag />
                150
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bedge-section grid grid-cols-3 gap-3 flex items-center">
            <div className="text-[150px] sm:text-[100px] bg-white/5 rounded-lg box py-5">
              <div>
                <AiOutlineTrophy className="text-[#D4AF37] mx-auto icons  " />
              </div>
              <div className="text-2xl text-white text-center fonr-sans font-medium">
                10
              </div>
              <div className="bedge-name text-[15px] text-white text-center font-sans font-medium">
                Gold Bedges
              </div>
            </div>
            <div className="text-[150px] sm:text-[100px] bg-white/5 rounded-lg box py-5">
              <div>
                <AiOutlineTrophy className="text-[#CCCCCC] mx-auto icons " />
              </div>
              <div className="text-2xl text-white text-center fonr-sans font-medium">
                100
              </div>
              <div className="bedge-name text-[15px] text-white text-center font-sans font-medium">
                Silver Bedges
              </div>
            </div>
            <div className="text-[150px] sm:text-[100px] bg-white/5 rounded-lg box py-5">
              <div>
                <AiOutlineTrophy className="text-[#B87333] mx-auto icons " />
              </div>
              <div className="text-2xl text-white text-center fonr-sans font-medium">
                150
              </div>
              <div className="bedge-name text-[15px] text-white text-center font-sans font-medium">
                Silver Bedges
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="tab">
          <button
            className="tablinks active"
            onClick={(e: any) => openCity(e, "User Details")}
          >
            User Details
          </button>
          <button
            className="tablinks"
            onClick={(e: any) => openCity(e, "User Activity")}
          >
            User Activity
          </button>
          
        </div>

        <div
          id="User Details"
          className="tabcontent"
          style={{ display: "block" }}
        >
          <div className="mx-auto bg-[#36393F] w-[50%] sm:w-[90%] xs:w-full rounded-md p-3">
            <table className="table-auto w-[100%]">
              <tbody className="table-content">
                <tr>
                  <td>Joining Date</td>
                  <td>{Moment(userdata.joindate).fromNow()}</td>
                </tr>
                <tr>
                  <td>Profile Viwes</td>
                  <td>{userviews}</td>
                </tr>
                <tr>
                  <td>Last Seen</td>
                  <td>{Moment(userdata.lastseen).fromNow()}</td>
                </tr>
                {JSON.parse(sessionStorage.getItem("isloggedIn") || "[]")
                  .username === username ? (
                  <tr>
                    <td>Whatsapp Number</td>
                    <td>{userdata.contactnumber}</td>
                  </tr>
                ) : null}
                <tr>
                  <td>Full Name</td>
                  <td>
                    {userdata.userfullname === "empty" ? (
                      <BsQuestionLg></BsQuestionLg>
                    ) : (
                      userdata.userfullname
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Gate Rank</td>
                  <td>
                    {userdata.gaterank === "empty" ? (
                      <BsQuestionLg></BsQuestionLg>
                    ) : (
                      userdata.gaterank
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Resume</td>
                  <td>
                    {userdata.resume === "empty" ? (
                      <BsQuestionLg></BsQuestionLg>
                    ) : (
                      userdata.resume
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Github Link</td>
                  <td>
                    {userdata.githublink === "empty" ? (
                      <BsQuestionLg></BsQuestionLg>
                    ) : (
                      userdata.githublink
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Website Link</td>
                  <td>
                    {userdata.website === "empty" ? (
                      <BsQuestionLg></BsQuestionLg>
                    ) : (
                      userdata.website
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="User Activity" className="tabcontent">
        <div className="mx-auto bg-[#36393F] w-[50%] sm:w-[90%] xs:w-full rounded-md p-3">
            <table className="table-auto w-[120%]">
              <tbody className="table-content">
                <tr>
                  <td>Questions</td>
                  <td>{userdata.askquestion}</td>
                </tr>
                <tr>
                  <td>Answers</td>
                  <td>{userdata.noofanswer}</td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td>{userdata.noofcomment}</td>
                </tr>
                <tr>
                  <td>Gaved votes</td>
                  <td className="flex"><p className="text-green-500">{userdata.gaveupvote} up</p><p className="text-red-500 mx-2">{userdata.gavedownvote} down</p></td>
                </tr>
                <tr>
                  <td>Received votes</td>
                  <td className="flex"><p className="text-green-500">{userdata.receiveupvote} up</p><p className="text-red-500 mx-2">{userdata.receivedownvote} down</p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Profile;
