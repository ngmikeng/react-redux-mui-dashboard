import {
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER
} from '../actions/types';

const crudData = {
  newData: undefined,
  updatedData: undefined,
  deletedData: undefined
}
const initialState = {
  dataRows: [],
  ...crudData
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        ...crudData,
        dataRows: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        newData: action.payload,
        updatedData: undefined,
        deletedData: undefined
      };
    case EDIT_USER:
      return {
        ...state,
        newData: undefined,
        deletedData: undefined,
        updatedData: action.payload
      };
    case DELETE_USER:
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