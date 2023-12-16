import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/QuestionReducer";
import axios from "axios";

const initialState: any = {
  allquestions: [],
  singlequery: {},
  allanswers:[],
  allcomments:[]
};

const Questioncontext = createContext(initialState);

const QuestionProvider = ({ children }: any) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const getallquestion = async () => {
    const response = await axios.get("https://gate-demo-api.vercel.app/allquestions");
    const data = await response.data;
    return data;
  };
  const getallanswers= async ()=>{
    const response=await axios.get("https://gate-demo-api.vercel.app/allanswers");
    const data=await response.data;
    return data;
  }
  const getallcomments= async ()=>{
    const response=await axios.get("https://gate-demo-api.vercel.app/allcomments");
    const data=await response.data;
    return data;
  }
  useEffect(() => {
    (async function () {
      const data = await getallquestion();
      dispatch({ type: "GET_ALL_QUESTIONS", payload: data });
      const data2=await getallanswers();
      dispatch({type:"GET_ALL_ANSWERS",payload:data2});
      const data3=await getallcomments();
      dispatch({type:"GET_ALL_COMMENTS",payload:data3})
    })();
  }, []);

  const upload_query = (question: any) => {
    console.log(question);
    dispatch({ type: "UPLOAD_USER_QUERY", payload: question });
  };
  const get_single_query = async (id: String) => {
    const ResponsegetSingleQueryData = await fetch(
      `https://gate-demo-api.vercel.app/query/singlequery/${id}`
    );
    const getSingleQueryData = await ResponsegetSingleQueryData.json();
    dispatch({ type: "GET_SINGLE_QUERY", payload: getSingleQueryData });
  };

  const set_up_vote = async (id: String, votes: any,userid:String,askusername:String) => {
    const Response = await fetch(`https://gate-demo-api.vercel.app/useractivity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "SET_UP_VOTE",
        questionID: id,
        votes: votes,
        userid,
        askusername
      }),
    });
    const res = await Response.json();
    return res.message;
  };
  const set_up_ANS_or_COMM=async (tag:String,id: String, votes: any,userid:String,postusername:String)=>{
    const Response = await fetch(`https://gate-demo-api.vercel.app/useractivity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "SET_UP_VOTE_ANS_COMM",
        tag,
        answerID: id,
        votes: votes,
        userid,
        postusername
      }),
    });
    const res = await Response.json();
    return res.message;
  }
  const set_down_ANS_or_COMM=async(tag:String,id: String, votes: any,userid:String,postusername:String)=>{
    const Response = await fetch(`https://gate-demo-api.vercel.app/useractivity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "SET_DOWN_VOTE_ANS_COMM",
        tag,
        answerID: id,
        votes: votes,
        userid,
        postusername
      }),
    });
    const res = await Response.json();
    return res.message;
  }

  const set_down_vote = async (id: String, votes: any,userid:String,askusername:String) => {
    const Response = await fetch(`https://gate-demo-api.vercel.app/useractivity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "SET_DOWN_VOTE",
        questionID: id,
        votes: votes,
        userid,
        askusername
      }),
    });
    const res = await Response.json();
    return res.message;
  };
  const set_question_views = async (questionid:String,userid: String) => {
    const response=await fetch('https://gate-demo-api.vercel.app/useractivity',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        task:"UPDATE_VIEW_ON_QUESTIONS",
        questionid,
        userid
      })
    })
    const flagviews=await response.json();
    return flagviews;
  };

  const set_post_answer_or_comment=async(tag:String,question:any)=>{
    const response=await fetch('https://gate-demo-api.vercel.app/query/uploadanswer',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        tag,
        question
      })
    })
    const res = await response.json();
    return res.message;
  }
  
  return (
    <Questioncontext.Provider
      value={{
        ...state,
        upload_query,
        get_single_query,
        set_up_vote,
        set_down_vote,
        set_question_views,
        set_post_answer_or_comment,
        set_up_ANS_or_COMM,
        set_down_ANS_or_COMM
      }}
    >
      {children}
    </Questioncontext.Provider>
  );
};

const useQuestionContext = () => {
  return useContext(Questioncontext);
};

export { QuestionProvider, useQuestionContext };
