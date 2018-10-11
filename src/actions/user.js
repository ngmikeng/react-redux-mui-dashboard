import { FETCH_USERS } from './types';

export const fetchUsersData = () => (dispatch) => {
  console.log('fetch user data');
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => dispatch({
      type: FETCH_USERS,
      payload: users
    })
  );
}