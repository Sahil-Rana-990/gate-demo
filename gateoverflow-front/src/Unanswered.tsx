import React, { useEffect,useState } from 'react'
import axios from 'axios'
import UnanswerQuestion from './components/UnanswerQuestion'
import { useQuestionContext } from './context/QuestionsContext'


const Unanswered = () => {
    const {allanswers,allquestions} =useQuestionContext();
    
    const [unanswer,setunanswer]:any=useState([])
    const [dataLoaded, setdataLoaded] = useState(false)

    useEffect(() => {
      console.log(allanswers)
        if (allanswers.length !== 0) {
            if(allanswers.length!==0){
                let unanswered=true;
               var data:any
               data=allquestions.filter((curQuestion:any)=>{
                for(let i=0;i<allanswers.length;i++){
                    if(curQuestion._id===allanswers[i].questionid){
                        unanswered=false;
                        break;
                    }
                }
                if(unanswered){
                    return curQuestion
                }
                unanswered=true
               })
            }
            setdataLoaded(true)
            setunanswer(data)
        }
    }, [allanswers,allquestions])


    const DynamicApplyQuestion = (htmlStr: String, id: Number) => {
        setTimeout(() => {
          const questionbyIdEle: any = document.querySelector(`#question${id}`);
          questionbyIdEle.innerHTML = htmlStr.replaceAll(
            '<div style="color: #040304; font-family: sans-serif,Roboto;">&nbsp;</div>',
            ""
          );
          for (let i = 0; i < questionbyIdEle.childNodes.length; i++) {
            if (i <= 4) {
              if (questionbyIdEle.childNodes[i].nodeName !== "#text") {
                questionbyIdEle.childNodes[i].style.lineHeight = "20px";
                questionbyIdEle.childNodes[i].style.fontSize = "15px";
                questionbyIdEle.childNodes[i].style.color = "#959BA7";
              }
            }
          }
        }, 0);
      };

      
    if(!dataLoaded){
        return <div>Loading...</div>
    }
    if(dataLoaded===true && unanswer.length===0){
        return <div>There is no any unanswer question</div>
    }

  return (
    
    <div>
        <div className="my-10">
      <div className="max-w-[1320px] mx-auto sm:mx-5 xs:mx-2">
        <div className="text-2xl text-gray-400 font-sans font-medium">
          Todays Questions !!
        </div>
        <div className="bg-[#36393F] my-2 rounded">
          <div className="p-5 xs:p-2">
            {unanswer.map((val: any, i: any) => {
              DynamicApplyQuestion(val.query, i);
              return (
               <UnanswerQuestion i={i} val={val} key={i}></UnanswerQuestion>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Unanswered