

const QuestionReducer=(state:any,action:any)=>{
    switch(action.type){
        case "GET_ALL_QUESTIONS":
            return {
                ...state,
                allquestions:[...action.payload]
            }
        default:
            return state;
    }
}
export default QuestionReducer;