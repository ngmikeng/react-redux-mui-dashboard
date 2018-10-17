import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleTable from '../components/SimpleTable';
import ModalUser from '../components/ModalUser';
import { Paper, Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { fetchUsersData, createUser, editUser } from '../actions/user';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpenCreateModal: false,
      userEditing: null,
      currentIndex: null
    };
    this.handleOpenUserModal = this.handleOpenUserModal.bind(this);
    this.handleCloseCreateModal = this.handleCloseCreateModal.bind(this);
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsersData();
  }

  handleOpenUserModal(user, index) {
    this.setState({
      isOpenCreateModal: true,
      userEditing: user,
      currentIndex: index
    });
  }

  handleCloseCreateModal() {
    this.setState({
      isOpenCreateModal: false
    });
  }

  handleSubmitUser(user) {
    if (this.state.currentIndex >= 0 && this.state.userEditing) {
      this.props.editUser(user.id, user, this.state.currentIndex);
      setTimeout(() => {
        this.setState({
          isOpenCreateModal: false
        });
      }, 200);
    } else {
      this.props.createUser(user);
      this.setState({
        isOpenCreateModal: false
      });
    }
  }

  handleDeleteUser(user, index) {
    let isConfirm = window.confirm(`Are you sure you want to delete this user ?`);
    if (isConfirm) {
      let users = [...this.state.data];
      users.splice(index, 1);
      this.setState({
        data: users
      });
    }
  }

  render() {
    const headers = ['ID', 'Name', 'Username', 'Email', 'Phone', 'Website'];
    const dataKeys = ['id', 'name', 'username', 'email', 'phone', 'website'];

    return (
      <div className="User">
        <h2>
          Users
        </h2>
        <Paper>
          <Button variant="contained" color="primary" onClick={(e) => this.handleOpenUserModal()}>
            <PersonAddIcon/> Create
          </Button>
        </Paper>
        <SimpleTable headers={headers} dataKeys={dataKeys} dataRows={this.props.dataRows} onDelete={this.handleDeleteUser} onEdit={this.handleOpenUserModal} />
        <ModalUser open={this.state.isOpenCreateModal}
          user={this.state.userEditing}
          onClose={this.handleCloseCreateModal}
          onSubmitForm={this.handleSubmitUser} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let dataRows = state.user.dataRows;
  if (state.user.newData) {
    dataRows.push(state.user.newData);
  } else if (state.user.updatedData && state.user.updatedData.index >= 0 && state.user.updatedData.data) {
    if (dataRows[state.user.updatedData.index]) {
      dataRows[state.user.updatedData.index] = state.user.updatedData.data;
    }
  }
  return {
    dataRows: dataRows,
    newData: state.user.dataRows
  }
};

export default connect(mapStateToProps, { fetchUsersData, createUser, editUser })(User);