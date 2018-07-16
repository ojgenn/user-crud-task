import React, { Component } from 'react';
import './Content.css';
import Input from './Input/Input';
import UserList from './UserList/UserList';

class Content extends Component {

  render() {
    return (
      <div className="content">
        <Input />
        <UserList />
      </div>
    );
  }
}

export default Content;
