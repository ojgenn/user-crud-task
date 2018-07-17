import React, { Component } from 'react';
import UserItem from './UserItem/UserItem';

class UserList extends Component {
  render() {
    return (
      <div>
          {this.props.users.map((item, index) => <UserItem key = {index} user = {item}/>)}
      </div>
    );
  }
}

export default UserList;
