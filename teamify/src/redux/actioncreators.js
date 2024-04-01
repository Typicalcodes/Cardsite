import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  fetchCardopen,
  fetchUpdatepage,
  fetchTeamData
} from "./actions";

export const toogledialog= ()=>{
 return (dispatch)=>{
    dispatch(fetchCardopen())
 }
}
export const updatepage= (data)=>{
 return (dispatch)=>{
    dispatch(fetchUpdatepage(data))
    
 }
}
export const fetchData = (filter) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      console.log("request called", filter);
      const queryString = new URLSearchParams(filter).toString();
      const response = await fetch(
        `https://cardsite-black.vercel.app/api/users?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const tosend = {data:data,pageno: filter.pageno}
      console.log("reacherd herer");
      dispatch(fetchDataSuccess(tosend));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
export const fetchteam = (search) => {
  return async (dispatch) => {
    try {
      console.log("request called");
      const response = await fetch(
        `https://cardsite-black.vercel.app/teamapi/team`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("reacherd herer for update");
      dispatch(fetchTeamData(data))
    } catch (error) {
      console.log({error: error.message})
    }
  };
};
