import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams, redirect } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
const Profile = () => {
  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  const [profiledata, setProfiledata] = useState(null);
  useEffect(() => {
    const fetchprofile=async(idprofile)=>{
      try {
        const response = await fetch(`https://cardsite-black.vercel.app/api/users/${idprofile}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProfiledata((prev)=>data.data[0])

      } catch (error) {
        console.log(error.message);; // Return an empty string or handle the error as needed
      }
      
    }
    fetchprofile(id);

  }, []);

  useEffect(()=>{
  },[profiledata])
  
  return (
    <>
    {!profiledata ? <p className="text-green-300 text-lg p-4 font-semibold">....Loading</p>:
    <div className='h-screen md:grid md:grid-cols-2 w-screen md:w-[60rem] md:mx-auto px-10 justify-center items-center md:items-start content-center py-2 '>
        <div><div className='font-bold text-2xl md:text-4xl md:place-self-start'>{profiledata.first_name} {profiledata.last_name}</div>
        <p className="flex items-center gap-2 text-lg font-semibold text-gray-600"> <IoMdPeople className='text-green-500'/>{profiledata.domain}</p>
        <p className="flex items-center gap-2 font-semibold  text-lg  text-green-600">
                       {profiledata.gender === "Female" ? <BsGenderFemale className='text-green-500'/>:<BsGenderMale className='text-green-500' />} {profiledata.gender}
                      </p>
                      
                      <p className=" flex items-center gap-2 md:text-base text-lg whitespace-normal font-semibold text-wrap break-words ">
                       <MdEmail className='text-green-500'/> {profiledata.email}
                      </p>
          </div>
                      <div>
                    <img
                      className=" w-full h-full md:order-1 md:w-[24rem] md:h-[24rem] bg-green-300"
                      alt="pofile"
                      src={profiledata.avatar}
                    />
                  </div>
    </div>    


    }
  
    </>
  
  )
}

export default Profile