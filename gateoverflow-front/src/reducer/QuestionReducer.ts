import { toast } from "react-toastify";
const QuestionReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_ALL_QUESTIONS":
      return {
        ...state,
        allquestions: [...action.payload],
      };
    case "GET_SINGLE_QUERY":
      
      return {
        ...state,
        singlequery:action.payload
      };
    case "UPLOAD_USER_QUERY":
      fetch("https://gate-demo-api.vercel.app/query/uploadquery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "OK") {
            toast.success("Question Stored !!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }else{
            toast.warning("Please, Change Title",{
              position:toast.POSITION.TOP_RIGHT
            })
          }
        })
        .catch((err) => console.log(err.message));
      return state;
      
    default:
      return state;
  }
};
export default QuestionReducer;
