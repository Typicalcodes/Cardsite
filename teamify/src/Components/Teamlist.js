import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchteam } from "../redux/actioncreators";
import { Link } from 'react-router-dom';

const Teamlist = () => {   
  const dispatch = useDispatch();
  const teamlist = useSelector((state) => state.teamData);
  const [teamMembers, setTeamMembers] = useState([]);
  

  useEffect(() => {
    dispatch(fetchteam())

  }, [dispatch])

  useEffect(()=>{
    
  },[teamlist])
  
  async function fetchMemberData(member) {
    try {
      const response = await fetch(`https://cardsite-black.vercel.app/teamapi/team/id/${member}`);
      const data = await response.json();

      return {fname: data[0].first_name,lname: data[0].last_name,domain: data[0].domain,id: data[0].id};

      
    } catch (error) {

      return ''; // Return an empty string or handle the error as needed
    }
  }

  useEffect(() => {
    const fetchDataForAllMembers = async () => {
      const promises = teamlist.map(async (team) => {
        const members = await Promise.all(team.members.map(member => fetchMemberData(member)));
        return { teamId: team._id, members };
      });
      const resolvedTeams = await Promise.all(promises);

      setTeamMembers(resolvedTeams);
    };

    if (teamlist) {
      fetchDataForAllMembers();
    }
  }, [teamlist]);


  return (
    <div className='mx-2 py-2 md:w-[60rem] pt-3 md:mx-auto'>
    <label className='text-xl font-bold text-black my-4 py-4 md:my-4 md:py-8'>Team list</label>

    <div className="flex items-center justify-center mt-4 mx-auto">
    {teamMembers<1 && <p className="text-green-300 text-lg p-4 font-semibold">....Loading</p>}
      </div>
   
    <div className='space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-1 md:h-full' >
    {teamMembers.length>1 && teamlist.filter((item,index)=>{return teamMembers[index]}).map((team, index) => (
      <div className='border-2 border-green-500 rounded-md p-2' key={index}>
        <h3 className='text-green-800 font-bold text-lg '>{team.name}</h3>
        <div className='grid grid-cols-3 space-x-1 space-y-1 md:space-y-0 items-start justify-start'>

          {teamMembers[index].members.filter((item)=>{return item.domain}).map((member, subIndex) => (
            (<div className='' key={subIndex}>
              {member.domain && 
              
              <><div className='text-lg whitespace-normal text-wrap font-semibold font-sans text-green-500'>
              {member.domain && member.domain}
              </div>
             <Link to={{ pathname: "/profile", search: `?id=${member.id}` }}> <div className='underline text-blue-600 underline-offset-2'>
              {member.fname && member.lname && `${member.fname} ${member.lname}`}
              </div>
              </Link></>
          }
             
            </div>)
))}
        </div>
      </div>
    ))}
  </div>
  </div>
  )
}
export default Teamlist;
