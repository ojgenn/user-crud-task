import React, { Component } from 'react';
import './UserItem.css';

class UserItem extends Component {
  render() {
    return (
      <div className = {'user-item'}>
        <div className = "user-item__header">
          <h2>{this.props.user.fio}</h2>
        </div>
        <div className = "user-item__content">
          <div>Дата рождения: {this.props.user.day}.{this.props.user.month}.{this.props.user.year}</div>
          <div className = {this.props.user.address === ''? 'user-item__content-hidden': ''}>Адрес: {this.props.user.address}</div>
          <div className = {this.props.user.city === ''? 'user-item__content-hidden': ''}>Город: {this.props.user.city}</div>
          <div className = {this.props.user.phone === ''? 'user-item__content-hidden': ''}>Телефон: {this.props.user.phone}</div>
        </div>
        <div className = "user-item__footer">
          <div className = 'user-item__footer-link' >Редактировать</div>
          <div className = 'user-item__footer-link' onClick = {() => this.props.deleteItem(this.props.user.id)}>Удалить</div>
        </div>
      </div>
    );
  }
}

export default UserItem;
