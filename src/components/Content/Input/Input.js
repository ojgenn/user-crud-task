import React, {Component} from 'react';
import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      fio: '',
      day: '',
      month: '',
      year: '',
      address: '',
      city: '',
      phone: '',
      id: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        edit: nextProps.edit,
        fio: nextProps.editContent.fio,
        day: nextProps.editContent.day,
        month: nextProps.editContent.month,
        year: nextProps.editContent.year,
        address: nextProps.editContent.address,
        city: nextProps.editContent.city,
        phone: nextProps.editContent.phone,
        id: nextProps.editContent.id
      })
    }
  }

  handleChange(payload, event) {
    this.setState({[payload]: event.target.value});
  }

  handleSubmit(event) {
    let state = {...this.state};
    if (this.state.edit) {
      this.props.editHandler(state)
    } else {
      state.id = new Date().getTime();
      this.props.submitHandler(state)
    }
    this.setState({
      edit: false,
      fio: '',
      day: '',
      month: '',
      year: '',
      address: '',
      city: '',
      phone: ''
    });
    event.preventDefault();
  }

  makeArray = (begin, end) => {
    let arr = [];
    for (let i = begin; i < end;) {
      arr.push(++i)
    }
    return arr;
  };

  render() {
    return (
      <div className="input">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            ФИО:
            <input type="text" value={this.state.fio} onChange={this.handleChange.bind(this, 'fio')}/>
          </label>
          <label>
            Дата рождения:
            <select onChange={this.handleChange.bind(this, 'day')} value={this.state.day}>
              <option></option>
              {this.makeArray(0, 31).map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select onChange={this.handleChange.bind(this, 'month')} value={this.state.month}>
              <option></option>
              {this.makeArray(0, 12).map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select onChange={this.handleChange.bind(this, 'year')} value={this.state.year}>
              <option></option>
              {this.makeArray(1940, new Date().getFullYear()).reverse().map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Адрес:
            <input type="text" value={this.state.address} onChange={this.handleChange.bind(this, 'address')}/>
          </label>
          <label>
            Город:
            <input type="text" value={this.state.city} onChange={this.handleChange.bind(this, 'city')}/>
          </label>
          <label>
            Телефон:
            <input type="text" value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')}/>
          </label>
          <input type="submit" value={this.state.edit ? "Edit" : "Submit"} className="input-submit"/>
        </form>
      </div>
    );
  }
}

export default Input;
