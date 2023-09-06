import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuestionContext } from "./context/QuestionsContext";
import { BiTimeFive, BiUpArrow, BiDownArrow } from "react-icons/bi";
import "./SingleQue.css";
import Moment from "moment";
import { useUserContext } from "./context/UserContext";

export default function SingleQue() {
  const {
    get_single_query,
    singlequery,
    set_up_vote,
    set_down_vote,
    set_question_views,
  } = useQuestionContext();
  
  const { userDetailInfo ,getUser} = useUserContext();
  let [votes, setvotes] = useState(singlequery.vote);
  const { id } = useParams();

  const insertSingleQuestionText = (query: String) => {
    setTimeout(() => {
      const ele: any = document.getElementById("single-question-text");
      ele.innerHTML = query;
    }, 0);
  };
  useEffect(() => {
    get_single_query(id);
  }, []);
  useEffect(() => {
    if (userDetailInfo !== false) {
      set_question_views(id, userDetailInfo._id);
    }
    setvotes(singlequery.vote);
  }, [singlequery]);

  if (Object.keys(singlequery).length === 0 || userDetailInfo === false) {
    return <h1>Loading</h1>;
  }

  //  insert text
  insertSingleQuestionText(singlequery.query);

  // gave up vote
  const UpVote = async () => {
    const isupdated = await set_up_vote(
      id,
      votes,
      userDetailInfo._id,
      singlequery.username
    );
    if (isupdated === "OK") {
      getUser(userDetailInfo.username)
      setvotes(votes + 1);
    }
  };
  // gave down vote
  const DownVote = async () => {
    const isupdated = await set_down_vote(
      id,
      votes,
      userDetailInfo._id,
      singlequery.username
    );
    if (isupdated === "OK") {
      getUser(userDetailInfo.username)
      setvotes(votes - 1);
    }
  };
  return (
    <div className="my-10 xs:my-5">
      <div className="lg:max-w-[1820px] max-w-[1320px] md:mx-10 mx-auto sm:mx-5 xs:mx-2">
        {/* for title */}
        <div className="text-gray-400 text-[25px] sm:text-[22px] xs:text-[18px] leading-7 xs:leading-5 font-medium font-sans">
          {singlequery.title}
        </div>
        <div className="bg-[#36393F] my-5 rounded p-2">
          {/* user navbar for question */}
          <div
            className="flex p-2 px-3 justify-between"
            style={{ borderBottom: "1px solid black" }}
          >
            <div className="flex items-center cursor-pointerxs:block">
              <div className="flex items-center">
                <p className="text-white mr-1">
                  <BiTimeFive />
                </p>
                <p className="flex text-blue-500 xs:text-[12px]">
                  <p className="xs:hidden">Problem in</p>{" "}
                  <p className="text-blue-500 ml-1">{singlequery.category}</p>
                </p>
              </div>
              <p className="text-gray-300 ml-1 xs:text-[12px]">
                {Moment(singlequery.askdate).fromNow()}
              </p>
            </div>

            <div className="flex text-white xs:text-[12px] font-sans font-medium">
              <p>views</p> <p className="ml-1">{singlequery.views.length}</p>
            </div>
          </div>
          <div className="flex p-2">
            <div className="w-full">
              {/* main query section */}
              <div
                className="single-question-section"
                id="single-question-text"
              ></div>
              {/* tags section */}
              <div className="mt-2 flex flex-wrap">
                {singlequery.tags.split(",").map((val: String, i: any) => (
                  <div
                    key={i}
                    className="mx-1 bg-[#fff]/40 rounded-full px-2 pb-1 font-sans font-medium cursor-pointer hover:shadow-lg my-0.5 xs:text-[12px]"
                  >
                    {val}
                  </div>
                ))}
              </div>

              {/* answer & comment section */}
            </div>
            <div className="w-[100px] xs:w-[50px] flex justify-center">
              <div>
                <button
                  onClick={UpVote}
                  className="hover:bg-green-900 duration-200"
                  style={{
                    backgroundColor: userDetailInfo?.arrayofupvote.includes(id)
                      ? "#14532D"
                      : "null",
                  }}
                  disabled={
                    userDetailInfo.username === singlequery.username
                      ? true:userDetailInfo?.arrayofupvote.includes(id)?true
                      : false
                  }
                >
                  <BiUpArrow
                    className="text-green-500 text-[30px] cursor-pointer xs:text-[20px]"
                    style={{
                      cursor:
                        userDetailInfo.username === singlequery.username
                          ? "help"
                          : "pointer",
                    }}
                  />
                </button>
                <div
                  className="text-[30px] ml-1.5 mt-[-7px] text-gray-400 leading-8 xs:text-[20px] xs:ml-1"
                  style={{
                    color: userDetailInfo?.arrayofupvote.includes(id)
                      ? "green"
                      : "null",
                  }}
                >
                  {votes}
                </div>
                <button
                  onClick={DownVote}
                  disabled={
                    votes === 0
                      ? true
                      : userDetailInfo.username === singlequery.username
                      ? true
                      : false
                  }
                  className="hover:bg-[#472D31] duration-200"
                >
                  <BiDownArrow
                    className="text-red-500 text-[30px] xs:text-[20px]"
                    style={{
                      cursor:
                        votes === 0
                          ? "not-allowed"
                          : userDetailInfo.username === singlequery.username
                          ? "not-allowed"
                          : "pointer",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
