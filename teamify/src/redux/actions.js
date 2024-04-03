// actions.js
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const CARD_OPEN = 'CARD_OPEN';
export const PROFILE_CREATE = 'PROFILE_CREATE';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const FETCH_TEAM_DATA_REQUEST = "FETCH_TEAM_DATA_REQUEST";


export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});
export const fetchCardopen = () => ({
  type: CARD_OPEN,
});

export const fetchProfileCreate = (data)=>({
  type: PROFILE_CREATE,
  payload: data
})

export const fetchUpdatepage = (data)=>({
  type: UPDATE_PAGE,
  payload: data
})

export const fetchTeamData = (data)=>({
  type: FETCH_TEAM_DATA_REQUEST,
  payload: data
})
