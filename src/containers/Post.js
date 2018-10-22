import React, { Component } from 'react';
import SimpleTable from '../components/SimpleTable';
import ModalPost from '../components/ModalPost';
import { Paper, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchPostsData, createPost, editPost, deletePost } from '../actions/post';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpenCreateModal: false,
      postEditing: null,
      currentIndex: null
    };
    this.handleOpenPostModal = this.handleOpenPostModal.bind(this);
    this.handleCloseCreateModal = this.handleCloseCreateModal.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleOpenPostModal = this.handleOpenPostModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostsData();
  }

  handleOpenPostModal(post, index) {
    this.setState({
      isOpenCreateModal: true,
      postEditing: post,
      currentIndex: index
    });
  }

  handleCloseCreateModal() {
    this.setState({
      isOpenCreateModal: false
    });
  }

  handleSubmitPost(post) {
    if (this.state.currentIndex >= 0 && this.state.postEditing) {
      this.props.editPost(post.id, post, this.state.currentIndex);
      setTimeout(() => {
        this.setState({
          isOpenCreateModal: false
        });
      }, 200);
    } else {
      this.props.createPost(post);
      this.setState({
        isOpenCreateModal: false
      });
    }
  }

  handleDeletePost(post, index) {
    let isConfirm = window.confirm(`Are you sure you want to delete this post ?`);
    if (isConfirm) {
      this.props.deletePost(post.id, index);
    }
  }

  render() {
    const headers = ['ID', 'Title', 'Content'];
    const dataKeys = ['id', 'title', 'body'];

    return (
      <div className="Post">
        <h2>
          Posts
        </h2>
        <Paper>
          <Button variant="contained" color="primary" onClick={(e) => this.handleOpenPostModal()}>
            Create
          </Button>
        </Paper>
        <SimpleTable headers={headers} dataKeys={dataKeys} dataRows={this.props.dataRows} onDelete={this.handleDeletePost} onEdit={this.handleOpenPostModal} />
        <ModalPost open={this.state.isOpenCreateModal}
          post={this.state.postEditing}
          onClose={this.handleCloseCreateModal}
          onSubmitForm={this.handleSubmitPost} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let dataRows = state.post.dataRows;
  if (state.post.newData) {
    dataRows.push(state.post.newData);
  } else if (state.post.updatedData && state.post.updatedData.index >= 0 && state.post.updatedData.data) {
    if (dataRows[state.post.updatedData.index]) {
      dataRows[state.post.updatedData.index] = state.post.updatedData.data;
    }
  } else if (state.post.deletedData && state.post.deletedData.index >= 0 && state.post.deletedData.data) {
    if (dataRows[state.post.deletedData.index]) {
      dataRows.splice(state.post.deletedData.index, 1);
    }
  }
  return {
    dataRows: [...dataRows]
  }
};

export default connect(mapStateToProps, { fetchPostsData, createPost, editPost, deletePost })(Post);