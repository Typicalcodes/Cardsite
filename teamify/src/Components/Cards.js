import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/actioncreators";
import { toogledialog } from "../redux/actioncreators";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbUserEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { CgChevronRight } from "react-icons/cg";
import { CgChevronLeft } from "react-icons/cg";
import { BsCheck2Square } from "react-icons/bs";
import { PiSquareLight } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Cards = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const cardopen = useSelector((state) => state.cardopen);
  const pageno = useSelector((state) => state.pageno);
  const pagenumbers = useSelector((state) => state.pagenumbers);
  const [toggle, setToggle] = useState(false);
  const [errort, setErrort] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({
    name: null,
    domains: [],
    ids: [],
  });
  const [togleteam, setTogleteam] = useState(false);
  //fitler use state
  const [filters, setFilters] = useState({
    domain: null,
    gender: null,
    available: null,
    searchterm: null,
  });

  const [userdata, setUserdata] = useState({
    first_name: "Rohit",
    last_name: "Singh",
    gender: "Male",
    available: false,
    domain: "Sales",
    email: "teamify@gmail.com",
    id: 5,
    type: "update",
  });
  useEffect(() => {
    dispatch(
      fetchData({
        pageno: 1,
        ...filters,
      })
    );
  }, [dispatch, filters]);

  const handleedit = (
    id,
    first_name,
    last_name,
    available,
    gender,
    email,
    domain,
    type
  ) => {
    dispatch(toogledialog());
    const newuser = {
      id,
      first_name,
      last_name,
      available,
      gender,
      email,
      domain,
      type: type,
    };
    setUserdata(newuser);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  //updateing profile or creating new profile
  const updateprofile = async () => {
    const datato = userdata;
    try {
      const response = await fetch(
        `https://cardsite-black.vercel.app/api/updateuser/${datato.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datato),
        }
      );
      const datares = await response.json();
      dispatch(fetchData({ pageno, ...filters }));
      if (datares) {
        dispatch(toogledialog());
      }
      toast.success('Profile Updated Created.',{position: "bottom-center"})
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  const createuser = async () => {
    try {
      const response = await fetch(`https://localhost:3000/api/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });
      const datares = await response.json();
      dispatch(fetchData({ pageno, ...filters }));
      toast.success('Profile Succesfully Created.',{position: "bottom-center"})
      if (datares) {
        dispatch(toogledialog());
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await fetch(
        `https://cardsite-black.vercel.app/api/deleteusers/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const datares = await response.json();
      dispatch(fetchData({ pageno, ...filters }));
      toast.success('Profile Deleted Successfulyy',{position: "bottom-center"})
      setSelectedProfile({
        ...selectedProfile,
        name: null,
        domains: [],
        ids: [],
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  //team creation
  const createTeam = async () => {
    const uniqueSet = new Set(selectedProfile.domains);

    if (uniqueSet.size === selectedProfile.domains.length) {
      try {
        const sendata = {
          name: selectedProfile.name,
          members: selectedProfile.ids,
        };
        const response = await fetch(
          `https://cardsite-black.vercel.app/teamapi/createteam`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendata),
          }
        );
        const datares = await response.json();
        setTogleteam((prevState) => !prevState);
        dispatch(fetchData({ pageno, ...filters }));
        toast.success('Team Succesfully Created.',{position: "bottom-center"})
      } catch (error) {
        console.log({ error: error.message });
      }
    } else {
      setErrort((prev) => !prev);
    }
  };
  useEffect(() => {
    console.log(" am a error".errort);
  }, [errort]);
  return (
    <div className="md:w-[60rem] pt-3 md:mx-auto">
      <Toaster/>
      <div
        className={` ${
          !toggle && "p-4"
        } z-[1000] fixed flex items-center bg-white  md:top-1/2 left-0 bottom-1/3 border-t-2 border-r-2 border-b-2 border-green-950   rounded-r-md pl-1 py-2 pr-2`}
      >
        <div
          className={`${
            toggle
              ? "transition delay-75 duration-100 ease-out "
              : "-translate-x-full hidden"
          }`}
        >
          <div
            onClick={() => {
              const newdata = {
                ...userdata,
                email: null,
                gender: "Male",
                first_name: null,
                last_name: null,
                available: true,
                domain: "IT",
                type: "new",
              };
              setUserdata(newdata);
              dispatch(toogledialog());
              const t = !toggle;
              setToggle(t);
            }}
          >
            <div className="flex flex-col items-center">
              <BsFillPersonPlusFill className="text-green-500 " size="30" />
              <span>Add</span>
            </div>
          </div>
          <Link to="/team">
            <div className="flex flex-col items-center">
              <BsPeopleFill className="text-green-500 " size="30" />
              <span>Teams</span>
            </div>
          </Link>
        </div>
        <div
          className="font-bold md:py-6 py-4 md:text-3xl text-xl w-auto h-auto"
          onClick={() => {
            const t = !toggle;
            setToggle(t);
          }}
        >
          {toggle ? (
            <>
              <CgChevronRight />
            </>
          ) : (
            <>
              <CgChevronLeft />
            </>
          )}
        </div>
      </div>
      <span className="text-lg font-extrabold mx-2 my-2 pb-2 text-black">
        Teamify
      </span>
      <div className="">
        <div className="flex px-2 ">
          <div className="relative w-full">
            <input
              type="text"
              onChange={(e) => {
                setFilters({ ...filters, searchterm: e.target.value });
              }}
              placeholder="Search First Name"
              className="px-4 py-2 w-full bg-green-100 text-green-500 placeholder-green-500 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              disabled
              className="absolute inset-y-0 right-0 px-4 bg-green-400  text-white font-semibold rounded-r-md focus:outline-none focus:ring-2 "
            >
              <svg
                className="w-full h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold text-green-900 mx-2 pt-4 ">Filters</p>
          <div className="px-2 flex md:flex-row md:items-center md:space-x-3 flex-col md:space-y-0 space-y-1">
            <select
              id="select"
              value={filters.domain}
              onChange={(e) => {
                if (e.target.value === "") {
                  // If "Select Availability" is chosen
                  setFilters({ ...filters, domain: null }); // Set availability filter to null
                } else {
                  setFilters({ ...filters, domain: e.target.value }); // Set availability filter to selected value
                }
              }}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            >
              <option value="">Select Domain</option>
              {[
                {
                  value: "Business Development",
                  label: "Business Development",
                },
                { value: "Finance", label: "Finance" },
                { value: "IT", label: "IT" },
                { value: "Management", label: "Management" },
                { value: "Marketing", label: "Marketing" },
                { value: "Sales", label: "Sales" },
                { value: "UI Designing", label: "UI Designing" },
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              id="select"
              value={filters.gender}
              onChange={(e) => {
                if (e.target.value === "") {
                  // If "Select Availability" is chosen
                  setFilters({ ...filters, gender: null }); // Set availability filter to null
                } else {
                  setFilters({ ...filters, gender: e.target.value }); // Set availability filter to selected value
                }
              }}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              id="select"
              value={filters.available}
              onChange={(e) => {
                if (e.target.value === "") {
                  // If "Select Availability" is chosen
                  setFilters({ ...filters, available: null }); // Set availability filter to null
                } else {
                  setFilters({ ...filters, available: e.target.value }); // Set availability filter to selected value
                }
              }}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            >
              <option value="">Select Availability</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <div
          className={`flex ${
            pageno === 1 ? "justify-end" : "justify-between"
          } px-2  py-2`}
        >
          <button
            onClick={() => {
              dispatch(fetchData({ pageno: pageno - 1, ...filters }));
            }}
            className={` ${
              pageno === 1 && "hidden"
            } relative px-4 py-2 bg-green-400 hover:bg-green-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
          >
            &lt; Backward
          </button>
          <button
            onClick={() => {
              dispatch(fetchData({ pageno: pageno + 1, ...filters }));
            }}
            className={`relative px-4 py-2 ${
              pagenumbers < 20 ? "hidden" : ""
            } bg-green-400 hover:bg-green-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-4`}
          >
            Forward &gt;
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 mx-auto">
        {isLoading && (
          <span className="text-green-300 text-lg p-4 font-semibold">
            ....Loading
          </span>
        )}
      </div>
      <div className="md:grid md:grid-cols-4 md:gap-2">
        {!isLoading &&
          data &&
          data.data.map((item, index) => {
            return (
              <>
                <div
                  className={`grid relative ${
                    cardopen ? "-z-50" : "z-50"
                  } grid-cols-2 md:grid-cols-1 md:h-[24rem] md:grid-rows-2 m-2 w-full  md:border-0 md:bg-slate-100 border border-green-400 rounded-sm overflow-hidden`}
                >
                  <div className="p-2 border-4 md:border-0 text-wrap pr-1 md:order-2 flex flex-col justify-between ">
                    <div className="text-wrap whitespace-normal">
                      <p className="text-lg md:text-sm font-bold">
                        {item.first_name} {item.last_name}
                      </p>
                      <p className="font-semibold md:text-sm font-serif text-green-600">
                        {item.gender}
                      </p>
                      <p className="md:text-sm">Domain : {item.domain}</p>
                      <p className="text-[12px] whitespace-normal max-w-xs">
                        {item.email}
                      </p>
                      <p className="md:text-sm">
                        Available: {item.available ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <div
                        onClick={() => {
                          handleedit(
                            item.id,
                            item.first_name,
                            item.last_name,
                            item.available,
                            item.gender,
                            item.email,
                            item.domain,
                            "update"
                          );
                        }}
                        className="right-0"
                      >
                        <TbUserEdit className="text-green-500 text-2xl " />
                      </div>
                      <div
                        onClick={() => {
                          handledelete(item.id);
                        }}
                      >
                        <RiDeleteBin6Line className="text-green-500 text-2xl " />
                      </div>
                      {item.available === true && (
                        <div
                          onClick={() => {
                            if (selectedProfile.ids.includes(item.id)) {
                              setSelectedProfile((prevState) => ({
                                ...prevState,
                                ids: prevState.ids.filter(
                                  (id) => id !== item.id
                                ),
                                domains: prevState.domains.filter(
                                  (domain) => domain !== item.domain
                                ),
                              }));
                            } else {
                              setSelectedProfile((prevState) => ({
                                ...prevState,
                                ids: [...prevState.ids, item.id],
                                domains: [...prevState.domains, item.domain],
                              }));
                            }
                          }}
                        >
                          {selectedProfile.ids.includes(item.id) ? (
                            <BsCheck2Square className="text-green-500 text-2xl " />
                          ) : (
                            <PiSquareLight className="text-green-500 text-2xl " />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <img
                      className=" w-full h-full md:order-1  bg-green-300"
                      alt="pofile"
                      src={item.avatar}
                    />
                  </div>
                </div>
              </>
            );
          })}
      </div>
      {isLoading}
      {cardopen && (
        <div className="fixed inset-0  backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50">
          <div className="border bg-white p-6 md:w-1/2 rounded-md flex flex-col border-green-500">
            <div className="">
              <MdClose
                onClick={() => {
                  dispatch(toogledialog());
                }}
              />
            </div>
            <label className="text-green-800 text-lg font-bold">
              {userdata.type === "update" ? "Edit Profile" : "Add Profile"}
            </label>

            <label className="text-green-400 font-bold">First Name</label>
            <input
              type="text"
              onChange={(e) => {
                setUserdata({ ...userdata, first_name: e.target.value });
              }}
              value={userdata.first_name}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            />
            <label className="text-green-400 font-bold">Last Name</label>
            <input
              type="text"
              onChange={(e) => {
                setUserdata({ ...userdata, last_name: e.target.value });
              }}
              value={userdata.last_name}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            />
            <label className="text-green-400 font-bold">Gender</label>
            <select
              id="select"
              onChange={(e) => {
                setUserdata({ ...userdata, gender: e.target.value });
              }}
              value={userdata.gender}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label className="text-green-400 font-bold">Domain</label>
            <select
              id="select"
              value={userdata.domain}
              onChange={(e) => {
                setUserdata({ ...userdata, domain: e.target.value });
              }}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            >
              {" "}
              {[
                {
                  value: "Business Development",
                  label: "Business Development",
                },
                { value: "Finance", label: "Finance" },
                { value: "IT", label: "IT" },
                { value: "Management", label: "Management" },
                { value: "Marketing", label: "Marketing" },
                { value: "Sales", label: "Sales" },
                { value: "UI Designing", label: "UI Designing" },
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label className="text-green-400 font-bold">Email</label>
            <input
              type="text"
              value={userdata.email}
              onChange={(e) => {
                setUserdata({ ...userdata, email: e.target.value });
              }}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            />
            <label className="text-green-400 font-bold">Available</label>
            <select
              id="select"
              value={userdata.available}
              onChange={(e) => {
                setUserdata({ ...userdata, available: e.target.value });
              }}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <button
              onClick={() => {
                if (userdata.type === "update") {
                  updateprofile();
                }
                if (userdata.type === "new") {
                  createuser();
                }
              }}
              className="px-4 py-2 my-2 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
            >
              {userdata.type === "update" ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}
      {togleteam && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50">
          <div className="border bg-white p-6 md:w-1/3 rounded-md flex flex-col border-green-500">
            <div className="">
              <MdClose
                onClick={() => {
                  setTogleteam((prevState) => !prevState);
                  if(errort){
                    setErrort((prev)=>!prev)
                  }
                }}
              />
            </div>
            <label className="text-green-800 text-lg font-bold">
              Create Team
            </label>

            <label className="text-green-400 font-bold">Name</label>
            <input
              type="text"
              onChange={(e) => {
                setSelectedProfile({
                  ...selectedProfile,
                  name: e.target.value,
                });
              }}
              className="px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:border-green-700 focus:ring-green-700"
            />
            <button
              onClick={() => {
                createTeam();
              }}
              className="px-4 py-2 my-2 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
            >
              Create Team
            </button>
            <span className="text-green-600">
              Selected Items : {selectedProfile.ids.length}
            </span>
            {errort && (
              <span className="text-red-500">Select Unique Domains</span>
            )}
            <span
              onClick={() => {
                setTogleteam((prevState) => !prevState);
                setSelectedProfile({
                  ...selectedProfile,
                  name: null,
                  domains: [],
                  ids: [],
                });

              }}
              className="text-red-900 underline-offset-1 underline cursor-pointer "
            >
              Unselect All
            </span>
          </div>
        </div>
      )}
      {selectedProfile.ids.length > 1 && (
        <div
          onClick={() => {
            setTogleteam((prevState) => !prevState);
            const uniqueSet = new Set(selectedProfile.domains);
            console.log(
              "size of set",
              uniqueSet.size,
              "size of array",
              selectedProfile.domains.length
            );
            if (uniqueSet.size === !selectedProfile.domains.length) {
              setErrort((prev) => !prev);
            }
          }}
          className={` ${
            !toggle && "p-4"
          } z-[55] fixed flex items-center bg-white   right-0 md:top-1/2 md:right-10 bottom-1/3 md:border-2 md:rounded-md md:items-center md:justify-center border-t-2 border-l-2 border-b-2 border-green-950   rounded-r-md pl-1 py-2 pr-4`}
        >
        
            <div className="flex items-center">
              <AiOutlineUsergroupAdd className="text-green-500 text-4xl " />
              <span className="md:visible md:w-auto md:h-auto invisible w-0 h-0">Add <br/> Team</span>
            </div>
                  </div>
      )}
    </div>
  );
};

export default Cards;
