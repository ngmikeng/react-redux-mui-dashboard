import { FETCH_POSTS } from './types';

export const fetchPostsData = () => (dispatch) => {
  console.log('fetch post data');
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts
    })
  );
}