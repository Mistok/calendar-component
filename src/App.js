import React from 'react';
import Calendar from './Components/Calendar/calendar'
import './App.css';

class  App extends React.Component{
    state = {
        date: null
    };
    handleChange = (date) =>{
        this.setState({date})
    };
    render() {
        const {date} = this.state;

        return (

            <div className="App">
                { date && <p>Selected date is {date.toLocaleDateString() }</p>}
                <Calendar
                    onChange={this.handleChange}
                />
            </div>
        );

    }


}

export default App;
