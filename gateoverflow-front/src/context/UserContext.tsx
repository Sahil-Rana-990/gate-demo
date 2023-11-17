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
      const res = await axios.get(`http://localhost:5000/singleuser/${username}`);
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
  return (
    <UserContext.Provider value={{ ...state, handleLogin,handleUpdateUserData,handleUpdatePassword,getUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
