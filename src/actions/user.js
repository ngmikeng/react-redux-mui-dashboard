import {
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER
} from './types';

export const fetchUsersData = () => (dispatch) => {
  console.log('fetch user data');
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => dispatch({
      type: FETCH_USERS,
      payload: users
    }));
}

export const createUser = (userData) => (dispatch) => {
  console.log('create user');
  fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(user => dispatch({
      type: CREATE_USER,
      payload: user
    }));
}

export const editUser = (userId, userData, index) => (dispatch) => {
  console.log('edit user');
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(user => dispatch({
      type: EDIT_USER,
      payload: {
        index: index,
        data: user
      }
    }));
}

export const deleteUser = (userId, index) => (dispatch) => {
  console.log('delete user');
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => dispatch({
      type: DELETE_USER,
      payload: {
        index: index,
        data: result
      }
    }));
}