import React, { Component } from 'react';
import './Content.css';
import Input from './Input/Input';
import UserList from './UserList/UserList';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {users: JSON.parse(localStorage.getItem('users')) || []}
  }

  componentDidMount

  submitHandler = (payload) => {
    let users = [...this.state.users];
    users.push(payload)
    this.setState({users}, function() {
      localStorage.setItem('users', JSON.stringify(this.state.users))
    });
  }

  render() {
    return (
      <div className="content">
        <Input submitHandler = {this.submitHandler.bind(this)} />
        <UserList users = {this.state.users}/>
      </div>
    );
  }
}

export default Content;
