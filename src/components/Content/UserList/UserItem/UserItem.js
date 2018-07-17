import React from 'react';
import './UserItem.css';

const userItem = props => {
  return (
    <div className={props.user ? 'user-item' : 'user-item__content-hidden'}>
      <div className="user-item__header">
        <h2>{props.user.fio}</h2>
      </div>
      <div className="user-item__content">
        <div>Дата рождения: {props.user.day}.{props.user.month}.{props.user.year}</div>
        <div className={props.user.address === '' ? 'user-item__content-hidden' : ''}>
          Адрес: {props.user.address}</div>
        <div className={props.user.city === '' ? 'user-item__content-hidden' : ''}>
          Город: {props.user.city}</div>
        <div className={props.user.phone === '' ? 'user-item__content-hidden' : ''}>
          Телефон: {props.user.phone}</div>
      </div>
      <div className="user-item__footer">
        <div className='user-item__footer-link' onClick={() => props.editItem(props.user.id)}>
          Редактировать
        </div>
        <div className='user-item__footer-link' onClick={() => props.deleteItem(props.user.id)}>Удалить
        </div>
      </div>
    </div>
  );
}

export default userItem;
