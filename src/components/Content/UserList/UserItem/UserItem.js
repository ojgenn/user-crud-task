import React, { Component } from 'react';

class UserItem extends Component {
  render() {
    return (
      <div>
        <div>
          fio: {this.props.user.fio}
        </div>
        <div>
          city: {this.props.user.city}
        </div>
      </div>
    );
  }
}

export default UserItem;
