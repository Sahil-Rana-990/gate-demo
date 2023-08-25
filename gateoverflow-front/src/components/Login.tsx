import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const { handleLogin, userDetailInfo } = useUserContext();
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({ password: "", email: "" });

  const handleChange = (e: any) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validateUserInfo = () => {
    let validInfo = true;

    // validation for password

    if (/^[\w@#&]+$/.test(userInfo.password)) {
      validInfo = true;
    } else {
      alert("You have entered invalid password!");
      validInfo = false;
      return validInfo;
    }

    // validation for email

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email)) {
      validInfo = true;
    } else {
      alert("You have entered an invalid email address!");
      validInfo = false;
      return validInfo;
    }

    return validInfo;
  };

  const setUser = async () => {
    try {
      const res = await axios.post(
        "https://gate-demo-api.vercel.app/loginuser",
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      if (data.message === "please register") {
        alert("please, first complete Register !!");
      } else {
        handleLogin(data);
        fetch("https://gate-demo-api.vercel.app/useractivity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: "DoLastSeen",
            useremail: userInfo.email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
           
            if (data.message === "OK") {
              navigate("/ask-query");
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isValid = validateUserInfo();
    if (isValid) {
      setUser();
    } else {
      alert("You are invalid user.");
    }
  };

  return (
    <div>
      <section className="bg-[#25272A] dark:bg-gray-900 py-5">
        <div className="flex flex-col items-center px-6 mx-auto lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <div className="text-gray-300">
              <p className="text-5xl">GATE</p>
              <p className="text-[22px]">OVERFLOW</p>
            </div>
          </a>
          <div className="w-[320px] bg-[#36393F] shadow-2xl rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white ">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="outline-none text-[#ffffff] bg-[#36393F] border border-[#ffffff] sm:text-sm rounded-sm block w-full p-2 md:p-[6px] focus:border-[#CC39FF] focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    className="outline-none text-[#ffffff] bg-[#36393F] border border-[#ffffff] sm:text-sm rounded-sm block w-full p-2 md:p-[6px] focus:border-[#CC39FF] focus:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-[#CC39FF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2 md:p-[6px] text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log In
                </button>
                <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                  <Link
                    to="/user-register"
                    className="d-flex font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    <span className="inline">Register</span>{" "}
                    <FaArrowRight className="inline" />
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
