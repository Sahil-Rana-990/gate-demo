import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { CgProfile, CgNotes } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiStar, FiUsers } from "react-icons/fi";
import {
  MdUpdate,
  MdLogout,
  MdOutlineQuestionAnswer,
  MdOutlineTimelapse,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { VscServerProcess } from "react-icons/vsc";
import { BsFolder2, BsTag } from "react-icons/bs";
import { useRef } from 'react';


const Navbar = ({ref}:any) => {
  const navigate = useNavigate();
  let [userImage, setuserImage] = useState("profile.png");
  const { isLoggedIn, userDetailInfo } = useUserContext();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const intervalRef:any = useRef(null);
  
  const windowClick=(e:any)=>{

      if(e.target !== intervalRef.current && e.target.id!=="openmenuicon"){
        setOpenMenu(false)
      }
      
  }
  window.addEventListener("click", windowClick);


  useEffect(() => {
    if (userDetailInfo) {
      fetch(`https://gate-demo-api.vercel.app/singleuser/${userDetailInfo.username}`)
        .then((res) => res.json())
        .then(({ singleUser }) => {
          sessionStorage.setItem("isloggedIn", JSON.stringify(singleUser));
          setuserImage(singleUser.userimage);
        });
    }
  }, [userDetailInfo]);
  // console.log(data)

  const DOLOGOUT = async () => {
    console.log("object");

    navigate("/");
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 w-full bg-[#36393f] py-3 z-20 shadow-2xl ">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/">
            <img
              src="https://gateoverflow.in/logo1.png?v=0.1"
              className="w-[120px] h-[50px] mx-5 sm:w-[100px] sm:h-[30px] xs:w-[80px] xs:h-[25px]"
              alt=""
            />
          </Link>
        </div>

        <div className="search_bar xs:hidden">
          <div className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="w-[350px] sm:w-[250px]">
              <input
                type="text"
                id="simple-search"
                className="bg-[#25272A] text-white text-sm rounded-lg w-full p-2 outline-none"
                placeholder=""
                required
              />
            </div>
            <button
              type="submit"
              className="p-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            {sessionStorage.getItem("isloggedIn") !== null ? (
              <div className="flex justify-center mx-5">
                <img
                  src={userImage}
                  className="h-12 w-12 rounded-full cursor-pointer"
                  onClick={() => setOpenProfile(true)}
                  alt=""
                />
              </div>
            ) : (
              <div className="mx-2">
                <Link
                  to="/user-login"
                  className="text-base font-medium rounded-full bg-[#7c39ff] px-5 py-2 mr-2 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/user-register"
                  className="xs:hidden text-base font-medium mr-2"
                  style={{ color: "#1a73e8" }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div
            className="fixed p-5 top-0 right-0 w-[280px] bg-[#2f3136] duration-1000 shadow-2xl text-left rounded-md"
            style={{ display: openProfile ? "block" : "none" }}
         
          >
            <div className="">
              <div className="flex items-center justify-between">
                <img
                  src={userImage}
                  className="h-10 w-10 rounded-full"
                  alt=""
                />
                <p className="font-medium mx-2 text-white">
                  @{userDetailInfo.username}
                </p>
                <p
                  className="font-medium mx-2 text-2xl text-red-500 cursor-pointer"
                  onClick={() => setOpenProfile(false)}
                >
                  <AiOutlineCloseCircle />
                </p>
              </div>
              <hr className="my-2" />
            </div>

            <ul
              className="leading-8 cursor-pointer"
              onClick={() => setOpenProfile(false)}
            >
              <li>
                <Link
                  to={`/user/${userDetailInfo.username}`}
                  className="flex items-center hover:bg-[#7C39FF] p-1 rounded-md duration-200"
                >
                  <p className="text-[20px] ml-2 text-white">
                    <CgProfile />
                  </p>
                  <p className="mx-2 text-white">Profile</p>
                </Link>
              </li>
              <li >
                <Link to="/account" className="flex items-center hover:bg-[#7C39FF] p-1 rounded-md duration-200">
                  <p className="text-[20px] ml-2 text-white">
                    <BiEdit />
                  </p>
                  <p className="mx-2 text-white">Edit Profile</p>
                </Link>
              </li>
              <li className="flex items-center hover:bg-[#7C39FF] p-1 rounded-md duration-200">
                <p className="text-[20px] ml-2 text-white">
                  <MdOutlineMailOutline />
                </p>
                <p className="mx-2 text-white">Message</p>
              </li>
              <li className="flex items-center hover:bg-[#7C39FF] p-1 rounded-md duration-200">
                <p className="text-[20px] ml-2 text-white">
                  <FiStar />
                </p>
                <p className="mx-2 text-white">My Favorites</p>
              </li>
              <li className="flex items-center hover:bg-[#7C39FF] p-1 rounded-md duration-200">
                <p className="text-[20px] ml-2 text-white">
                  <MdUpdate />
                </p>
                <p className="mx-2 text-white">My Updates</p>
              </li>
              <hr className="my-1 mb-2" />
              <li className="flex items-center hover:bg-[#472D31] p-1 rounded-md duration-200">
                <p className="text-[20px] ml-2 text-red-500">
                  <MdLogout />
                </p>
                <p className="mx-2 text-red-500" onClick={() => DOLOGOUT()}>
                  Logout
                </p>
              </li>
            </ul>
          </div>

          <div className="basis-3/12 py-2">
            <FiMenu
              className="mr-2 block inline sm:mx-4 text-white cursor-pointer"
              size={30}
              id="openmenuicon"
              onClick={() => setOpenMenu(true)}
            ></FiMenu>
          </div>
          <div
            className="fixed h-full p-8 top-0 right-0 block w-[280px] bg-[#2f3136] duration-500 shadow-2xl"
            style={{
              transform:
                openMenu === true
                  ? `translate(0px, 0px)`
                  : `translate(280px, 0px)`,
            }}
            ref={intervalRef}
          >
            <ul>
              <div>
                <p
                  onClick={() => setOpenMenu(false)}
                  className="text-3xl text-red-500 cursor-pointer"
                >
                  <AiOutlineCloseCircle />
                </p>
              </div>
              <li className="my-3 py-2 px-2 hover:bg-[#7C39FF] rounded-md text-white font-medium bg-[#3F4146]">
                <Link to="/ask-query" className="flex items-center">
                  <p className="text-[20px] ml-2">
                    <AiOutlineQuestionCircle />
                  </p>
                  <p className="mx-2">Ask a query</p>
                </Link>
              </li>
              <li className="my-3 py-2 px-2 text-white hover:bg-[#7C39FF] rounded-md bg-[#3F4146]">
                <Link to="" className="flex items-center">
                  <p className="text-[20px] ml-2">
                    <VscServerProcess />
                  </p>
                  <p className="mx-2">Activity</p>
                </Link>
              </li>
              <li className="my-3 py-2 px-2 text-white hover:bg-[#7C39FF] rounded-md bg-[#3F4146]">
                <Link to="" className="flex items-center">
                  <p className="text-[20px] ml-2">
                    <MdOutlineQuestionAnswer />
                  </p>
                  <p className="mx-2">Q & A</p>
                </Link>
              </li>
              <li className="my-3 py-2 px-2 text-white hover:bg-[#7C39FF] rounded-md bg-[#3F4146]">
                <Link to="/questions" className="flex items-center">
                  <p className="text-[20px] ml-2">
                    <CgNotes />
                  </p>
                  <p className="mx-2">Question</p>
                </Link>
              </li>
              <li className="my-3 py-2 px-2 text-white hover:bg-[#7C39FF] rounded-md bg-[#3F4146]">
                <Link to="/unanswered" className="flex items-center">
                  <p className="text-[20px] ml-2">
                    <MdOutlineTimelapse />
                  </p>
                  <p className="mx-2">Unanswered</p>
                </Link>
              </li>
              <li className="my-3 py-2 px-2 text-white hover:bg-[#7C39FF] rounded-md bg-[#3F4146]">
                <Link to="/tags" className="flex items-center">
                  <p className="text-[20px] ml-2">
                    <BsTag />
                  </p>
                  <p className="mx-2">Tags</p>
                </Link>
              </li>
              <li className="my-3 py-2 px-2 text-white hover:bg-[#7C39FF] rounded-md bg-[#3F4146]">
                <Link to="" className="flex items-center">
                  <p className="text-[20px] ml-2">
                    <BsFolder2 />
                  </p>
                  <p className="mx-2">Subjects</p>
                </Link>
              </li>
              <li className="my-3 py-2 px-2 text-white hover:bg-[#7C39FF] rounded-md bg-[#3F4146]">
                <Link to="/users" className="flex items-center">
                  <p className="text-[20px] ml-2">
                    <FiUsers />
                  </p>
                  <p className="mx-2">Users</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
