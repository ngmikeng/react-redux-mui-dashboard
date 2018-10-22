import {
  FETCH_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/types';

const crudData = {
  newData: undefined,
  updatedData: undefined,
  deletedData: undefined
};
const initialState = {
  dataRows: [],
  ...crudData
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        dataRows: action.payload
      };
    case CREATE_POST:
      return {
        ...state,
        newData: action.payload,
        updatedData: undefined,
        deletedData: undefined
      };
    case EDIT_POST:
      return {
        ...state,
        newData: undefined,
        deletedData: undefined,
        updatedData: action.payload
      };
    case DELETE_POST:
      return {
        ...state,
        newData: undefined,
        updatedData: undefined,
        deletedData: action.payload
      };
    default:
      return state;
  }
}