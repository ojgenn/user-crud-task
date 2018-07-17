import React from 'react';
import UserItem from './UserItem/UserItem';
import './UserList.css';

const userList = props => {
  return (
    <div className={'user-list'}>
      {props.users.map(item => <UserItem key={item.id} user={item} deleteItem={props.deleteItem}
                                         editItem={props.editItem}/>)}
    </div>
  );
};

export default userList;
