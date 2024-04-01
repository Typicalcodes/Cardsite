
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, CARD_OPEN, UPDATE_PAGE, FETCH_TEAM_DATA_REQUEST } from './actions';

const initialState = {
  data: [],
  teamData: [],
  isLoading: true,
  error: null,
  cardopen: false,
  pageno:1,
  pagenumbers:1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_DATA_SUCCESS:
      const newData = (action.payload.data.data).length;
      return { ...state, data: action.payload.data , pageno: action.payload.pageno, pagenumbers : newData, isLoading: false, error: null };
    case FETCH_DATA_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case CARD_OPEN: 
      return { ...state, cardopen: !state.cardopen };
    case FETCH_TEAM_DATA_REQUEST: 
      return { ...state, teamData: action.payload };
    default:
      return state;
  }
};

export default reducer;
