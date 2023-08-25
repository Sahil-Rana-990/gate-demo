import {FaArrowRight} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import React,{useState} from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

export default function Register() {
const {handleLogin}=useUserContext()
const usenavigate=useNavigate();
  const [userInfo, setuserInfo]:any = useState({username:"",password:"",email:"",contactnumber:"",termandcondition:false})
  
  const handleChange=(e:any)=>{

    if(e.target.name==="termandcondition"){
      setuserInfo({...userInfo,termandcondition:e.target.checked})
    }else{
    setuserInfo({...userInfo,[e.target.name]:e.target.value})

    }
  }

  const validateUserInfo=()=>{

    let validInfo=true

    // validation for user name


    var regexPattern = /^[^\s][a-zA-Z\s]+[^\s]$/;

if(regexPattern.test(userInfo.username))
  {
    validInfo=true;
  }
else
  {
  alert("Enter a Valid UserName");
  validInfo=false;
  return false
  }

  // validation for password

  if(/^[\w@#&]+$/.test(userInfo.password)){
    validInfo=true
  }else{
    alert("You have entered invalid password!")
    validInfo=false
    return validInfo
  }

    // validation for email

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email))
    {
      validInfo=true
    }else{
      alert("You have entered an invalid email address!")
      validInfo=false
      return validInfo
    }

    // validation for contact number

    if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g.test(userInfo.contactnumber)){
      validInfo=true
    }else{
      alert("You have entered invalid contact number!")
      validInfo=false
      return validInfo
    }
    

    return validInfo
    

}

    const setUser=async()=>{
      console.log(userInfo)
      try{
        const res=await axios.post("https://gate-demo-api.vercel.app/registeruser",userInfo,{
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data=res.data;
        console.log(data)
        handleLogin(data)
        usenavigate("/ask-query")
      }catch(e){
        console.log(e)
      }

     
    }

  const handleSubmit=(e:any)=>{
    e.preventDefault()
    const isValid=validateUserInfo()
    if(isValid){
      setUser()
    }else{
      alert("You are invalid user.")
    }
  }


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
              <p className="font-normal leading-tight tracking-tight text-gray-300 text-[12px] dark:text-white">
                I agree not to copy paste anything here from anywhere without giving proper reference and not to post any links except of standard resources.
              </p>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white " htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="outline-none text-[#ffffff] bg-[#36393F] border border-[#ffffff] sm:text-sm rounded-sm block w-full p-2 md:p-[6px] focus:border-[#CC39FF] focus:ring-0"
                    onChange={handleChange}
                    required
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
                    required
                    className="outline-none text-[#ffffff] bg-[#36393F] border border-[#ffffff] sm:text-sm rounded-sm block w-full p-2 md:p-[6px] focus:border-[#CC39FF] focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white ">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    required
                    className="outline-none text-[#ffffff] bg-[#36393F] border border-[#ffffff] sm:text-sm rounded-sm block w-full p-2 md:p-[6px] focus:border-[#CC39FF] focus:ring-0"
                  />
                  <p className="font-normal leading-tight tracking-tight text-gray-300 text-[12px] dark:text-white">Privacy: Your email address will not be shared or sold to third parties.</p>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
                    Contect Number
                  </label>
                  <input
                    type="text"
                    name="contactnumber"
                    id="contactnumber"
                    onChange={handleChange}
                    required
                    className="outline-none text-[#ffffff] bg-[#36393F] border border-[#ffffff] sm:text-sm rounded-sm block w-full p-2 md:p-[6px] focus:border-[#CC39FF] focus:ring-0"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="termandcondition"
                      aria-describedby="termandcondition"
                      type="checkbox"
                      name='termandcondition'
                      onChange={handleChange}
                      required
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-light text-gray-300 dark:text-gray-300">
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        termandcondition and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#CC39FF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2 md:p-[6px] text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                  <Link to="/user-login"
                    className="d-flex font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    <span className='inline'>Login</span> <FaArrowRight className='inline'/>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
