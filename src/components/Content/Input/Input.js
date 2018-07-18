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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(event) {
    let payload = event.target.dataset.payload;
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
        <form onSubmit={this.handleSubmit}>
          <label>
            ФИО *:
            <input data-payload = 'fio' type="text" value={this.state.fio} onChange={this.handleChange} required/>
            <span
              className={this.state.validate.isFioValid ? 'input-hided' : 'input-dunger'}>Поле не должно превышать {MAX_FIO_LENGTH}
              символов</span>
          </label>
          <label>
            Дата рождения *:
            <select data-payload = 'day' onChange={this.handleChange} value={this.state.day} required>
              <option></option>
              {this.makeArray(0, 31).map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select data-payload = 'month' onChange={this.handleChange} value={this.state.month} required>
              <option></option>
              {this.makeArray(0, 12).map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select data-payload = 'year' onChange={this.handleChange} value={this.state.year} required>
              <option></option>
              {this.makeArray(1940, new Date().getFullYear()).reverse().map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Адрес:
            <input data-payload = 'address' type="text" value={this.state.address} onChange={this.handleChange}/>
          </label>
          <label>
            Город:
            <input data-payload = 'city' type="text" value={this.state.city} onChange={this.handleChange}/>
          </label>
          <label>
            Телефон:
            <input data-payload = 'phone' type="text" value={this.state.phone} onChange={this.handleChange}/>
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
