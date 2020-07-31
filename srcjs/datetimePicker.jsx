// jshint esversion: 6
import { reactShinyInput } from "reactR";
import Calendar from 'react-datetime-slider-picker/dist/Calendar';
import TimePicker from 'react-datetime-slider-picker/dist/TimePicker';
//import { Calendar, TimePicker } from 'react-datetime-slider-picker';
import { Tabs, Tab, Button } from '@material-ui/core';
import { CheckCircleOutline, Today, AccessTime } from '@material-ui/icons';
//const moment = require('moment');
import Language from 'react-datetime-slider-picker/public/Language';
//import 'react-datetime-slider-picker/public/Calendar.css';
//import 'react-datetime-slider-picker/public/TimePicker.css';
//import 'react-datetime-slider-picker/public/Picker.css';


class Widget extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      date: this.props.value.date,
      time: this.props.value.time
    };

    this.onTabChange = this.onTabChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onTabChange(value) {
    this.setState({ tab: value });
  }

  onValueChange(isDate, value) {
    let date = this.state.date,
      time = this.state.time;
    if (isDate) {
      date = {
        year: value.year,
        month: value.month,
        date: value.date
      };
      this.setState({ date: date });
    } else {
      time = value;
      this.setState({ time: time });
    }
    if (!this.props.save) {
      let id = this.props.shinyId + ":shinyDatetimePicker.date";
      setTimeout(function () {
        Shiny.setInputValue(id, {
          date: date,
          time: time
        });
      }, 0);
    }
  }

  onSave() {
    Shiny.setInputValue(this.props.shinyId + ":shinyDatetimePicker.date", {
      date: this.state.date,
      time: this.state.time
    });
  }

  componentDidMount() {
    let state = this.state,
      id = this.props.shinyId + ":shinyDatetimePicker.date";
    setTimeout(function () {
      Shiny.setInputValue(id, {
        date: state.date,
        time: state.time
      });
    }, 0);
  }

  render() {
    const language = (this.props.language === 'ko') ? Language['ko'] : Language['en'];

    return (
      <div className='picker'>
        <div className='picker-tab'>
          <Tabs
            value={this.state.tab}
            onChange={(event, value) => this.onTabChange(value)}
            fullWidth
            textColor='inherit'
            classes={{ indicator: 'picker-tab-indicator' }}
          >
            <Tab 
              label={language.date} 
              icon={<Today />} 
              classes={{ selected: 'selected' }} 
            />
            <Tab 
              label={language.time} 
              icon={<AccessTime />} 
              classes={{ selected: 'selected' }} 
            />
          </Tabs>
        </div>
        <div className='picker-form'>
          {(this.state.tab === 0) ?
            <Calendar
              language={this.props.language}
              defaultValue={this.state.date}
              onChange={(date) => this.onValueChange(true, date)}
            /> :
            <TimePicker
              language={this.props.language}
              enableSecond={this.props.enableSecond}
              defaultValue={this.state.time}
              onChange={(time) => this.onValueChange(false, time)}
            />}
        </div>
        {this.props.save ?
          <div className='picker-footer'>
            <div onClick={() => this.onSave()}>
              <Button fullWidth><CheckCircleOutline />{language.save}</Button>
            </div>
          </div> :
          null}
      </div>
    );
  }
}


const Input = ({ configuration, value, setValue }) => {
  return (
    <Widget
      setShinyValue={setValue}
      value={value}
      shinyId={configuration.shinyId}
      enableSecond={configuration.second}
      save={configuration.save}
    />
  );
};

reactShinyInput('.datetimePicker', 'shinyDatetimePicker.datetimePicker', Input);
