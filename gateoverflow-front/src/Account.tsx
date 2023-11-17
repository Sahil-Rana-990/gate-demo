import React, { useState } from "react";
import axios from "axios";
import { useUserContext } from "./context/UserContext";
import Moment from "moment";
import { ToastContainer, toast } from "react-toastify";

type passwordType={
  password?:String
  newpassword?:String
  rwnewpassword?:String
}
const Account = () => {
  const [userediteddata, setuserediteddata] = useState({});
  const [usereditedpassword,setusereditedpassword]=useState<passwordType>({});
  const [userselectedimagetype, setuserselectedimagetype] = useState("default");
  const { userDetailInfo ,handleUpdateUserData,handleUpdatePassword} = useUserContext();


  function get_user_image_url(data64: any) {
    fetch("https://gate-demo-api.vercel.app/api/uploadimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData: data64 }),
    })
      .then((res) => res.json())
      .then((data) =>
        setuserediteddata({ ...userediteddata, userimage: data.imageURL })
      );
  }

  const change_user_data = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "userimage") {
      var base64Image: any = "";
      const filereader = new FileReader();
      filereader.onload = (file) => {
        base64Image = file.target?.result;
      };
      filereader.readAsDataURL(files[0]);
      setTimeout(() => {
        get_user_image_url(base64Image);
      }, 50);
    } else {
      setuserediteddata({ ...userediteddata, [name]: value.trim() });
    }
  };
  const updateData = () => {
    if (Object.keys(userediteddata).length === 0) {
      toast.warning('No Data Updated !!',{
        position:toast.POSITION.TOP_RIGHT,
      })
    } else {
      handleUpdateUserData(userDetailInfo.username,userediteddata)
    }
  };

  const change_user_passwrod=(e:any)=>{
    const {name,value}=e.target;
    setusereditedpassword({...usereditedpassword,[name]:value})
  }
  const updatePassword=()=>{
    if(usereditedpassword?.newpassword!==usereditedpassword?.rwnewpassword){
      toast.warning("New Password Doesn't Match",{
        position:toast.POSITION.TOP_RIGHT
      })
      return;
    }
    if(usereditedpassword?.password===usereditedpassword?.newpassword){
      toast.warning('Please, Type New Password',{
        position:toast.POSITION.TOP_RIGHT
      })
      return
    }
    handleUpdatePassword(usereditedpassword?.password,usereditedpassword?.newpassword)
  }

  return (
    <div className="max-w-[1320px] mx-auto">
      <ToastContainer />
      <div className="my-10">
        {/* account edit section */}
        <div className="">
          <div className="text-6xl text-gray-500 font-medium font-sans flex items-end">
            <p className="mx-5 flex items-end">
              E<p className="text-3xl">DIT</p>
            </p>{" "}
            A<p className="text-3xl">CCOUNT</p>
          </div>
          <div className="bg-[#36393F] mx-6 my-2 p-5 rounded text-gray-400">
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Joining Date</div>
              <div>{Moment(userDetailInfo.joindate).fromNow()}</div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">User Name</div>
              <div className="text-green-500">~{userDetailInfo.username}</div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Email</div>
              <div>
                <input
                  type="text"
                  name="email"
                  onChange={change_user_data}
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                  defaultValue={userDetailInfo.email}
                />
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Profile Image</div>
              <div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="userimage"
                    id=""
                    onClick={() => setuserselectedimagetype("default")}
                    className="w-5 h-5 mr-2"
                    defaultChecked
                  />
                  Default{" "}
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/user-profile-2871145-2384395.png"
                    className="w-7 ml-2"
                    alt=""
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="userimage"
                    onClick={() => setuserselectedimagetype("user")}
                    id=""
                    className="w-5 h-5 mr-2"
                  />
                  <p className="xs:hidden">My Image</p>
                  <input
                    type="file"
                    name="userimage"
                    disabled={
                      userselectedimagetype === "default" ? true : false
                    }
                    onChange={change_user_data}
                    id=""
                    className="ml-2 xs:w-[200px]"
                  />
                </div>
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Full Name</div>
              <div>
                <input
                  type="text"
                  name="userfullname"
                  onChange={change_user_data}
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                  defaultValue={
                    userDetailInfo.userfullname === "empty"
                      ? null
                      : userDetailInfo.userfullname
                  }
                />
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Whatsapp Number</div>
              <div>
                <input
                  type="text"
                  name="contactnumber"
                  onChange={change_user_data}
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                  defaultValue={userDetailInfo.contactnumber}
                />
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Gate Rank</div>
              <div>
                <input
                  type="text"
                  name="gaterank"
                  onChange={change_user_data}
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                  defaultValue={
                    userDetailInfo.gaterank === "empty"
                      ? null
                      : userDetailInfo.gaterank
                  }
                />
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Website Link</div>
              <div>
                <input
                  type="text"
                  name="website"
                  onChange={change_user_data}
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                  defaultValue={
                    userDetailInfo.website === "empty"
                      ? null
                      : userDetailInfo.website
                  }
                />
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Github Link</div>
              <div>
                <input
                  type="text"
                  name="githublink"
                  onChange={change_user_data}
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                  defaultValue={
                    userDetailInfo.githublink === "empty"
                      ? null
                      : userDetailInfo.githublink
                  }
                />
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Resume Link</div>
              <div>
                <input
                  type="text"
                  name="resume"
                  onChange={change_user_data}
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                  defaultValue={
                    userDetailInfo.resume === "empty"
                      ? null
                      : userDetailInfo.resume
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 items-start p-2 xs:grid-cols-1">
              <div className="text-1xl font-bold">About</div>
              <div>
                <textarea
                  rows={5}
                  name="About"
                  onChange={change_user_data}
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                  defaultValue={
                    userDetailInfo.About === "empty"
                      ? null
                      : userDetailInfo.About
                  }
                />
              </div>
            </div>
            {/* account edit save button0 */}
            <div className="mt-[40px]">
              <div
                className="bg-[#7C39FF] p-3 rounded-sm text-white font-medium text-[12px] float-right cursor-pointer"
                onClick={updateData}
              >
                SAVE CHANGES
              </div>
            </div>
          </div>
        </div>

        {/* change password section */}
        <div className="my-10">
          <div className="text-6xl text-gray-500 font-medium font-sans flex items-end xs:text-5xl">
            <p className="mx-5 flex items-end">
              C<p className="text-3xl xs:text-[24px]">HANGE</p>
            </p>{" "}
            P<p className="text-3xl xs:text-[24px]">ASSWORD</p>
          </div>

          <div className="bg-[#36393F] mx-6 my-2 p-5 rounded text-gray-400">
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Old Password</div>
              <div>
                <input
                  type="text"
                  name="password"
                  onChange={change_user_passwrod}
                  required
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                />
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">New Password</div>
              <div>
                <input
                  type="text"
                  name="newpassword"
                  onChange={change_user_passwrod}
                  required
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                />
              </div>
            </div>
            <div
              className="grid grid-cols-2 items-center p-2 xs:grid-cols-1"
              style={{ borderBottom: "1px solid black" }}
            >
              <div className="text-1xl font-bold">Rewrite New Password</div>
              <div>
                <input
                  type="text"
                  name="rwnewpassword"
                  onChange={change_user_passwrod}
                  required
                  className="block px-1 py-1.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-gray-400 dark:border-[#7C39FF] dark:focus:border-[#7C39FF] focus:outline-none focus:ring-0 focus:border-[#7C39FF] peer"
                />
              </div>
            </div>
            {/* change password edit save button */}
            <div className="mt-[40px]">
              <div className="bg-[#7C39FF] p-3 rounded-sm text-white font-medium text-[12px] float-right cursor-pointer" onClick={updatePassword}>
                CHANGE PASSWORD
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
