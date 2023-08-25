import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/QuestionReducer";
import axios from "axios";

const initialState: any = {
  allquestions: [],
};

const Questioncontext = createContext(initialState);

const QuestionProvider = ({ children }: any) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const getallquestion = async () => {
    const response = await axios.get("https://gate-demo-api.vercel.app/allquestions");
    const data = await response.data;
    return data;
  };
  useEffect(() => {
    (async function(){
        const data = await getallquestion();
        dispatch({ type: "GET_ALL_QUESTIONS", payload: data });
    })()
  },[]);
  return (
    <Questioncontext.Provider value={{ ...state }}>
      {children}
    </Questioncontext.Provider>
  );
};

const useQuestionContext = () => {
  return useContext(Questioncontext);
};

export { QuestionProvider, useQuestionContext };
