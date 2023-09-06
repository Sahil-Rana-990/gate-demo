import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/QuestionReducer";
import axios from "axios";

const initialState: any = {
  allquestions: [],
  singlequery: {},
};

const Questioncontext = createContext(initialState);

const QuestionProvider = ({ children }: any) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const getallquestion = async () => {
    const response = await axios.get("http://localhost:5000/allquestions");
    const data = await response.data;
    return data;
  };
  useEffect(() => {
    (async function () {
      const data = await getallquestion();
      dispatch({ type: "GET_ALL_QUESTIONS", payload: data });
    })();
  }, []);

  const upload_query = (question: any) => {
    console.log(question);
    dispatch({ type: "UPLOAD_USER_QUERY", payload: question });
  };
  const get_single_query = async (id: String) => {
    const ResponsegetSingleQueryData = await fetch(
      `http://localhost:5000/query/singlequery/${id}`
    );
    const getSingleQueryData = await ResponsegetSingleQueryData.json();
    dispatch({ type: "GET_SINGLE_QUERY", payload: getSingleQueryData });
  };

  const set_up_vote = async (id: String, votes: any,userid:String,askusername:String) => {
    const Response = await fetch(`http://localhost:5000/useractivity`, {
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
  const set_down_vote = async (id: String, votes: any,userid:String,askusername:String) => {
    const Response = await fetch(`http://localhost:5000/useractivity`, {
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
    const response=await fetch('http://localhost:5000/useractivity',{
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
  };
  return (
    <Questioncontext.Provider
      value={{
        ...state,
        upload_query,
        get_single_query,
        set_up_vote,
        set_down_vote,
        set_question_views,
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
