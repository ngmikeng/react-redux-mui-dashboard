import { FETCH_USERS, CREATE_USER, EDIT_USER } from '../actions/types';

const initialState = {
  dataRows: [],
  newData: undefined,
  updatedData: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS: 
      return {
        ...state,
        dataRows: action.payload,
        newData: undefined,
        updatedData: undefined
      };
    case CREATE_USER: 
      return {
        ...state,
        newData: action.payload,
        updatedData: undefined
      };
    case EDIT_USER: 
      return {
        ...state,
        newData: undefined,
        updatedData: action.payload
      };
    default:
      return state;
  }
} 