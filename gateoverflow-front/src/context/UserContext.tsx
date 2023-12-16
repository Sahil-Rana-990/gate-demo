import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/UserReducer";
import axios from "axios";

const initialState: any = {
  isLoggedIn: false,
  userDetailInfo: false,
  userImage: "",
  imageLoaded: false,
};

const UserContext = createContext(initialState);

const UserProvider = ({ children }: any) => {
  const getUser = async (username: any) => {
    try {
      const res = await axios.get(`https://gate-demo-api.vercel.app/singleuser/${username}`);
      const data = await res.data;
      handleLogin(data.singleUser)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let a: any = sessionStorage.getItem("isloggedIn");
    let b: any = JSON.parse(a);

    if (b !== null) {
      getUser(b.username);
    }
  }, []);
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const handleLogin = (userData: any) => {

    dispatch({ type: "HANDLE_LOGIN", payload: userData });
  };
  

  const handleUpdateUserData=(username:String,newdata:any)=>{
    dispatch({type:"HANDLE_USER_UPDATE",payload:{username,newdata}})
  }
  const handleUpdatePassword=(password:String,newpassword:String)=>{
    dispatch({type:"HANDLE_USER_PASSWORD_UPDATE",payload:{password,newpassword}})
  }
  const handleUserViewOperation=async (profileID:String,username:String)=>{
    const Response = await fetch(`https://gate-demo-api.vercel.app/useractivity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "SET_USER_VIEW_TASK",
        username,
        profileID
      }),
    });
    const res = await Response.json();
    if(res.message==="OK"){
      return "OK"
    }else return "FAILED";
  }
  return (
    <UserContext.Provider value={{ ...state, handleLogin,handleUpdateUserData,handleUpdatePassword,getUser,handleUserViewOperation }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
