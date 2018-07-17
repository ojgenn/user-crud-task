import React, { Component } from 'react';
import './Content.css';
import Input from './Input/Input';
import UserList from './UserList/UserList';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {users: JSON.parse(localStorage.getItem('users')) || []};
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount

  submitHandler = (payload) => {
    let users = [...this.state.users];
    users.push(payload)
    this.setState({users}, function() {
      localStorage.setItem('users', JSON.stringify(this.state.users))
    });
  }

  deleteItem = (id) => {
    let users = [...this.state.users];
    let newState = users.filter(item => item.id !== id);
    this.setState({users: newState});
    localStorage.setItem('users', JSON.stringify(newState));
  }

  render() {
    return (
      <div className="content">
        <Input submitHandler = {this.submitHandler} />
        <UserList deleteItem = {this.deleteItem} users = {this.state.users}/>
      </div>
    );
  }
}

export default Content;
