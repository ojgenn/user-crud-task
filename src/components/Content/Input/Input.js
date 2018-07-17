import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
  state = {
    fio: '',
    day: '',
    month: '',
    year: '',
    address: '',
    city: '',
    phone: ''
  }

  handleChange(payload,event) {
    this.setState({[payload]: event.target.value});
  }

  handleSubmit(event) {
    this.props.submitHandler(this.state)
    this.setState({
      fio: '',
      day: '',
      month: '',
      year: '',
      address: '',
      city: '',
      phone: ''
    })
    event.preventDefault();
  }

  makeArray = (begin, end) => {
    let arr = [];
    for (let i = begin; i < end;) {
      arr.push(++i)
    }
    return arr;
  }

  render() {
    return (
      <div className="input">
        <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          ФИО:
          <input type="text" value={this.state.fio} onChange={this.handleChange.bind(this, 'fio')} />
        </label>
        <label>
          Дата рождения:
          <select onChange={this.handleChange.bind(this, 'day')}>
            <option></option> 
            {this.makeArray(0, 31).map(item => (
              <option key={item}>{item}</option>  
            ))}
          </select>
          <select onChange={this.handleChange.bind(this, 'month')}>
            <option></option> 
            {this.makeArray(0, 12).map(item => (
              <option key={item}>{item}</option>  
            ))}
          </select> 
          <select onChange={this.handleChange.bind(this, 'year')}>
            <option></option> 
            {this.makeArray(1940, new Date().getFullYear()).reverse().map(item => (
              <option key={item}>{item}</option>  
            ))}
          </select>  
        </label>
        <label>
          Адрес:
          <input type="text" value={this.state.address} onChange={this.handleChange.bind(this, 'address')} />
        </label>
        <label>
          Город:
          <input type="text" value={this.state.city} onChange={this.handleChange.bind(this, 'city')} />
        </label>
        <label>
          Телефон:
          <input type="text" value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} />
        </label>
        <input type="submit" value="Submit" className = "input-submit"/>
      </form>
      </div>
    );
  }
}

export default Input;
