import React from 'react';
import './calendar.css'
import * as calendar from './calendarLogic'

export default class Calendar extends React.Component {

    static defaultProps = {
        date: new Date(),
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'Jul', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekDayNames: ['Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        onChange:  Function.prototype
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null
    };

    get year() {
       return this.state.date.getFullYear();
    }
    get month() {
       return this.state.date.getMonth();
    }

    get day() {
        return this.state.date.getDate();
    }

    handlePrevMonthButtonClick = () => {
        const date = new Date(this.year, this.month - 1 );
        //console.log(date)
        this.setState({date})
    };

    handleNextMonthButtonClick = () => {
        const date = new Date(this.year, this.month + 1 );
        //console.log(date)
        this.setState({date})
    };

    handleSelectChange = () => {
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;
        const date = new Date(year, month);
        //console.log(date);
        this.setState({date})
    };

    handleDayClick = (date) => {
        console.log(date);
        this.setState({selectedDate: date});
        this.props.onChange(date)
    };

    render(){

        const {years, monthNames, weekDayNames } = this.props;

        const monthData = calendar.getMonthData(this.year, this.month);
        console.log(monthData);
        return(
            <div className='calendar'>
                <header>
                    <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>
                    <select
                        ref = {element => this.monthSelect = element}
                        onChange={this.handleSelectChange}
                            value = {this.month}
                    >

                        {monthNames.map((name, index) =>
                                <option key={name} value={index}>
                                    {name}
                                </option>
                            
                        )}
                    </select>
                    <select
                        ref = {element => this.yearSelect = element}
                        onChange={this.handleSelectChange}
                        value = {this.year}
                    >
                        {years.map((name, index) =>
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            
                        )}
                    </select>
                    <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
                </header>

                <table>
                    <thead>
                        <tr>
                            {weekDayNames.map((name, index) => <th key={index}>{name}</th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {monthData.map((week, index)=>
                            <tr className='week' key={index}>
                                {week.map((date, index)=>
                                    date
                                        ? <td
                                            key={index}

                                            onClick={() => this.handleDayClick(date)}>{date.getDate()}</td>
                                        : <td key={index}/>
                                )}
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        );
    }
}
