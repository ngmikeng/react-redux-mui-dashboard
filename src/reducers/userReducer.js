import { FETCH_USERS } from '../actions/types';

const initialState = {
  dataRows: [],
  selected: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS: 
      return {
        ...state,
        dataRows: action.payload
      };
    default:
      return state;
  }
} 