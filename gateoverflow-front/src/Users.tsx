import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

const Users = () => {
  const [allUsers, setallUsers]: any = useState([]);
  const [dataLoaded, setdataLoaded]: any = useState(false);

  let [tempUsers, setTempUsers]: any = useState([]);
  const navigate = useNavigate();

  const [selectedView, setselectedView] = useState("Top Views");

  const fetchUsers = async () => {
    try {
      const res: any = await axios.get("http://localhost:5000/allusers");
      const data: any = await res.data;
      setallUsers(res.data);
      setTempUsers(res.data);
      console.log("Res :", res);
      console.log("Data :", data);

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchUser = (e: any) => {
    console.log(e.target.value);
    setTempUsers([]);
    allUsers.filter((curUser: any) => {
      if (
        curUser.username.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        setTempUsers((prevState: any) => [...prevState, curUser]);
      }
    });

    console.log(tempUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (allUsers.length !== 0) {
      console.log(allUsers);
      setdataLoaded(true);
    }
  }, [allUsers]);

  console.log(selectedView);

  return dataLoaded ? (
    <div>
      <div className="p-5 grid grid-cols-12">
        <div className="w-full sm:w-auto col-span-12 sm:col-span-6 md:col-span-4">
          <h1 className="text-[#fff] text-2xl font-bold">Top scoring users</h1>

          <div className="mt-6">
            <p className="text-[#fff] inline-block text-base">
              Type to find users:
            </p>
            <input
              type="text"
              placeholder="Username"
              onChange={handleSearchUser}
              className="bg-transparent rounded-md mt-2 ml-1  px-2"
              style={{ border: "1px solid white", color: "white" }}
            />
          </div>
          <div className="my-2.5">
            <div className="select-dropdown block  md:hidden">
              <select>
                <option value="Option 1">Bronze</option>
                <option value="Option 2">Silver</option>
                <option value="Option 3">Golden</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className="mx-auto py-1 md:py-5 w-full sm:w-auto  col-span-12 sm:col-span-6 md:col-span-5 md:col-span-6"
          style={{ color: "white" }}
        >
          {/* <h2 className='font-bold text-2xl mb-4'>Filter By Views</h2> */}

          <button
            style={{ transition: "0.5s" }}
            className={`${"px-3 py-1 md:px-2 md:py-1.5 w-[134px] md:w-auto my-2 md:my-0 inline sm:block md:inline md:px-4  font-bold mx-1"} ${
              selectedView === "Top Views" ? "class1" : "class2"
            }`}
            onClick={() => setselectedView("Top Views")}
          >
            Top Views
          </button>
          <button
            style={{ transition: "0.5s" }}
            className={`${"px-3 py-1 md:px-2 md:py-1.5 w-[134px] md:w-auto my-2 md:my-0 inline sm:block md:inline md:px-4  font-bold mx-1"} ${
              selectedView === "Average Views" ? "class1" : "class2"
            }`}
            onClick={() => setselectedView("Average Views")}
          >
            Average Views
          </button>
          <button
            style={{ transition: "0.5s" }}
            className={`${"px-3 py-1 md:px-2 md:py-1.5 w-[134px] md:w-auto my-2 md:my-0 inline sm:block md:inline md:px-4  font-bold mx-1"} ${
              selectedView === "Least Views" ? "class1" : "class2"
            }`}
            onClick={() => setselectedView("Least Views")}
          >
            Least Views
          </button>
        </div>

        <div className="hidden md:block w-full sm:w-auto col-span-3 md:col-span-2 text-right py-5">
          <div className="select-dropdown">
            <select>
              <option value="Option 1">Bronze</option>
              <option value="Option 2">Silver</option>
              <option value="Option 3">Golden</option>
            </select>
          </div>
          {/* <select name="" id="" className='py-1.5 px-6 bg-[#fff]'>
                            <option value="" className='text-lg font-normal'>Bronze</option>
                            <option value="#" disabled></option>
                            <option value="" className='text-lg font-normal'>Silver</option>
                            <option value="#" disabled></option>    
                            <option value="" className='text-lg font-normal'>Golden</option>
                        </select> */}
        </div>
      </div>

      <section className="grid grid-cols-12">
        <div className="col-span-12 rounded-md py-5 px-2 sm:px-8 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
          <div className="flex flex-wrap justify-start gap-5 mx-5 xs:gap-2">
            {tempUsers.map((curElem: any) => {
              return (
                <div
                  className="col-span-6 md:col-span-3 rounded-lg shadow-md bg-[#414141] overflow-hidden xs:mx-auto"
                  onClick={() =>
                    navigate(`/user/${curElem.username}`, { replace: true })
                  }
                >
                  <div>
                    <img
                      src={curElem.userimage}
                      alt=""
                      style={{ width: "100%", objectFit: "cover" }}
                      className="h-[200px] sm:h-[100px] xs:h-[80px]"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-[#CB9114] text-[22px] xs:text-[10px]">♦</span>
                    <span
                      className="text-center text-white text-lg xs:text-[10px] font-medium my-2"
                      style={{ color: "7c39ff" }}
                    >
                      {curElem.username}
                    </span>
                    <span className="text-[#fff] block">380k</span>

                    <div className="pt-5 pb-2 xs:pt-0">
                      <span
                        style={{ color: "#ffcc01" }}
                        className="mx-0.5 text-xl xs:text-[10px]"
                      >
                        ●
                      </span>
                      <span className="text-[#fff] mx-0.5 text-base sm:text-xl xs:text-[10px]">
                        10
                      </span>

                      <span
                        style={{ color: "#cdcdcd" }}
                        className="mx-0.5 text-xl xs:text-[10px]"
                      >
                        ●
                      </span>
                      <span className="text-[#fff] mx-0.5 text-base sm:text-xl xs:text-[10px]">
                        20
                      </span>

                      <span
                        style={{ color: "#b3934e" }}
                        className="mx-0.5 text-xl xs:text-[10px]"
                      >
                        ●
                      </span>
                      <span className="text-[#fff] mx-0.5 text-base sm:text-xl xs:text-[10px]">
                        30
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div>
      <h1>No Data</h1>
    </div>
  );
};
export default Users;
