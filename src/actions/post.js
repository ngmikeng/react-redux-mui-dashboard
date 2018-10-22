import {
  FETCH_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST
} from './types';

export const fetchPostsData = () => (dispatch) => {
  console.log('fetch post data');
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts
    }));
}

export const createPost = (postData) => (dispatch) => {
  console.log('create post');
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(post => dispatch({
      type: CREATE_POST,
      payload: post
    }));
}

export const editPost = (postId, postData, index) => (dispatch) => {
  console.log('edit post');
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(post => dispatch({
      type: EDIT_POST,
      payload: {
        index: index,
        data: post
      }
    }));
}

export const deletePost = (postId, index) => (dispatch) => {
  console.log('delete post');
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => dispatch({
      type: DELETE_POST,
      payload: {
        index: index,
        data: result
      }
    }));
}