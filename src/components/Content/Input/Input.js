import React, {Component} from 'react';
import './Input.css';


const MAX_FIO_LENGTH = 100;

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
      id: null,
      validate: {
        isAllValid: false,
        isFioValid: true,
        isPhoneValid: true
      }
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
    let validate = this.state.validate;
    let valid = true;
    let validDate = this.state.day > 0 && this.state.month > 0 && this.state.year > 0;
    switch (payload) {
      case 'fio':
        console.log('fio');
        if (event.target.value.length > MAX_FIO_LENGTH) {
          valid = false;
        }
        validate.isFioValid = valid
        break;
      case 'phone':
        if (event.target.value.length > 0) {
          let reg = /^\d[\d() -]{4,14}\d$/
          valid = reg.test(event.target.value)
        }
        validate.isPhoneValid = valid
        break;
      case 'day':
        validDate = event.target.value > 0 && this.state.month > 0 && this.state.year > 0;
        break;
      case 'month':
        validDate = this.state.day > 0 && event.target.value > 0 && this.state.year > 0;
        break;
      case 'year':
        validDate = this.state.day > 0 && this.state.month > 0 && event.target.value > 0;
        break;
      default:
        break;
    }
    console.log(this.state.day)
    if (validate.isPhoneValid && validate.isFioValid && validDate) {
      validate.isAllValid = true;
    } else {
      validate.isAllValid = false;
    }
    this.setState({[payload]: event.target.value, validate});
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
      phone: '',
      id: null,
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
            ФИО *:
            <input type="text" value={this.state.fio} onChange={this.handleChange.bind(this, 'fio')} required/>
            <span
              className={this.state.validate.isFioValid ? 'input-hided' : 'input-dunger'}>Поле не должно превышать {MAX_FIO_LENGTH}
              символов</span>
          </label>
          <label>
            Дата рождения *:
            <select onChange={this.handleChange.bind(this, 'day')} value={this.state.day} required>
              <option></option>
              {this.makeArray(0, 31).map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select onChange={this.handleChange.bind(this, 'month')} value={this.state.month} required>
              <option></option>
              {this.makeArray(0, 12).map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select onChange={this.handleChange.bind(this, 'year')} value={this.state.year} required>
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
            <span className={this.state.validate.isPhoneValid ? 'input-hided' : 'input-dunger'}>Некорректный номер телефона</span>
          </label>
          <input disabled={!this.state.validate.isAllValid} type="submit" value={this.state.edit ? "Edit" : "Submit"}
                 className="input-submit"/>
        </form>
        * - обязательные поля
      </div>
    );
  }
}

export default Input;
