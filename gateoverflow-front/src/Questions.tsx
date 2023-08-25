import React, { useEffect, useState } from "react";
import { useQuestionContext } from "./context/QuestionsContext";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import Moment from "moment";
import './Question.css';


export default function Questions() {
  let { allquestions } = useQuestionContext();
  console.log(allquestions);

  const DynamicApplyQuestion=(htmlStr:String,id:Number)=>{
    setTimeout(()=>{
      const questionbyIdEle:any=document.querySelector(`#question${id}`);
      questionbyIdEle.innerHTML=htmlStr;
      for (let i = 0; i < questionbyIdEle.childNodes.length; i++) {
        if (questionbyIdEle.childNodes[i].nodeName !== "#text") {
          questionbyIdEle.childNodes[i].style.lineHeight = "20px";
          questionbyIdEle.childNodes[i].style.fontSize = "18px";
          questionbyIdEle.childNodes[i].style.color = "#959BA7";
          questionbyIdEle.childNodes[i].style.fontWeight="600";
          questionbyIdEle.childNodes[i].style.fontFamily='ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
        }
      }
    },0)
  }
  return (
    <div className="my-10">
      <div className="max-w-[1320px] mx-auto sm:mx-5 xs:mx-2">
        <div className="text-2xl text-gray-400 font-sans font-medium">
          Todays Questions !!
        </div>
        <div className="bg-[#36393F] my-2 rounded">
          <div className="p-5 xs:p-2">
            {allquestions.map((val: any, i: any) => {
              DynamicApplyQuestion(val.query,i)
              return (
                <div
                  key={i}
                  className=""
                  style={{ borderBottom: "1px solid black" }}
                >
                  <div className="title-query-section flex justify-between p-3 xs:pb-1">
                    <div className="w-full xs:max-h-[65px] xs:overflow-hidden">
                      <div className="title-section cursor-pointer font-medium text-2xl text-gray-300 sm:text-[20px] sm:leading-5 xs:text-[15px] xs:leading-5">
                        {val.title.length <= 100
                          ? val.title
                          : val.title.slice(0, 100) + "..."}
                      </div>
                      {/* dynaic html string */}
                      <div className="dynamic-element-question py-1 cursor-pointer " id={`question${i}`}></div>
                    </div>
                    <div className="w-[100px] xs:w-[50px] flex justify-center items-center">
                      <div>
                        <div>
                          <BiUpArrow className="text-green-500 text-[30px] cursor-pointer xs:text-[20px]" />
                        </div>
                        <div className="text-[30px] ml-1.5 text-gray-400 leading-8 xs:text-[20px] xs:ml-1">
                          {val.vote}
                        </div>
                        <div>
                          <BiDownArrow className="text-red-500 text-[30px] cursor-pointer xs:text-[20px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1 xs:pt-0 flex items-center">
                    <div className="w-[50px] xs:w-[30px] mr-2">
                      <img
                        src={val.userimage}
                        alt=""
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex text-[15px] font-sans font-medium text-gray-400 xs:text-[10px]">
                      Problem in{" "}
                      <p className="mx-2 text-blue-500">{val.category}</p>
                    </div>
                    <div className="mx-2 text-white font-medium xs:text-[10px]">
                      {Moment(val.askdate).fromNow()}
                    </div>
                    <div className="scroll-tags flex sm:hidden xs:hidden mb-[-8px]">
                      {val.tags.split(",").map((tag:String,i:any)=>{
                        return(
                          <div key={i} className="mx-1 text-gray-400 font-sans font-medium text-[15px] bg-gray-800 px-5 pb-1 rounded-full ">{tag}</div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
