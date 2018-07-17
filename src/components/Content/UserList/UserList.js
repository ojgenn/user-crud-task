import React, { Component } from 'react';
import UserItem from './UserItem/UserItem';
import './UserList.css';

class UserList extends Component {
  render() {
    return (
      <div className = {'user-list'}>
          {this.props.users.map((item, index) => <UserItem key = {item.id} user = {item} deleteItem = {this.props.deleteItem}/>)}
      </div>
    );
  }
}

export default UserList;
