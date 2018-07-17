import React, {Component} from 'react';
import './Content.css';
import Input from './Input/Input';
import UserList from './UserList/UserList';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: JSON.parse(localStorage.getItem('users')) || [],
      edit: false,
      editContent: {}
    };
    this.submitHandler = this.submitHandler.bind(this)
    this.editHandler = this.editHandler.bind(this)
  }

  submitHandler = (payload) => {
    let users = [...this.state.users];
    delete payload.edit;
    users.push(payload)
    this.setState({users, edit: false, editContent: {}}, function () {
      localStorage.setItem('users', JSON.stringify(this.state.users))
    });
  };

  editHandler = (payload) => {
    let newState = this.state.users.map(item => {
      if (item.id === payload.id) {
        delete payload.edit;
        return payload;
      } else {
        return item
      }
    });
    this.setState({users: newState, edit: false, editContent: {}}, function () {
      localStorage.setItem('users', JSON.stringify(this.state.users))
    });
  };

  deleteItem = id => {
    let users = [...this.state.users];
    let newState = users.filter(item => item.id !== id);
    this.setState({users: newState, edit: false, editcontent: {}});
    localStorage.setItem('users', JSON.stringify(newState));
  };

  editItem = id => {
    let users = [...this.state.users];
    let newState = users.filter(item => item.id === id);
    this.setState({edit: true, editContent: newState[0]})
  };

  render() {
    return (
      <div className="content">
        <Input editHandler={this.editHandler} submitHandler={this.submitHandler} edit={this.state.edit}
               editContent={this.state.editContent}/>
        <UserList deleteItem={this.deleteItem} editItem={this.editItem} users={this.state.users}/>
      </div>
    );
  }
}

export default Content;
