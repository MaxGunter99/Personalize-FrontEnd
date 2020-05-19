import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';

import '../css/AddJobForm.css';
// import "react-datepicker/dist/react-datepicker.css";

export default class JobForm extends React.Component {

    state = {

        job: {

            CompanyName: "",
            AppliedThrough: "",
            Role: "",
            URL: "",
            DateApplied: `${new Date().toLocaleDateString().split('/')[0]}/${new Date().toLocaleDateString().split('/')[1]}/${new Date().toLocaleDateString().split('/')[2]}`,
            ReplyRecieved: "No",
            Details: ""
        },

        date: {

            day: new Date().toLocaleDateString().split('/')[1],
            month: new Date().toLocaleDateString().split('/')[0],
            year: new Date().toLocaleDateString().split('/')[2]

        }
        
    }

    componentDidMount = () => {

        if ( localStorage.getItem('ApplyingTo' ) ) {
            let ApplyingTo = JSON.parse( localStorage.getItem( 'ApplyingTo' ) );
            console.log( ApplyingTo )
            this.setState({
                ...this.state,
                job : {
                    ...this.state.job,
                    CompanyName: ApplyingTo.company,
                    AppliedThrough: ApplyingTo.jobBoard,
                    Role: ApplyingTo.title,
                    URL: ApplyingTo.URL,
                    Details: `They are located in ${ ApplyingTo.location }`
                }
            });

            localStorage.removeItem( 'ApplyingTo' );

        }
    }

    // Update State When Entering Info
    changeHandler = event => {

        event.preventDefault();

        this.setState({

            job: {
                ...this.state.job,
                [ event.target.name ]: event.target.value
            }

        });
        console.log( this.state.startDate )

    };

    submitDataHandler = event => {
        event.preventDefault();
        axios
            .post( 'http://localhost:3001/jobs/' , this.state.job )
            .then( response => {
                console.log( 'Success' , response )
                window.location.href = 'http://localhost:3000/Jobs';
            })
            .catch( error => {
                console.log( error.message )
            })
        
    };

    dateHandler = event => {

        event.preventDefault();

        this.setState({

            date: {
                ...this.state.date,
                [ event.target.name ]: event.target.value
            }

        });

        this.setState({

            job: {

                DateApplied: `${this.state.date.month}/${this.state.date.day}/${this.state.date.year}`

            }

        });

        console.log( this.state.date )

    }

    render() {

        return(

            <div className = 'AddJobForm'>

                <form onSubmit = { this.submitDataHandler }>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Company Name:</label>
                            <input
                                id = "CompanyName"
                                type = "text"
                                name = "CompanyName"
                                value = { this.state.job.CompanyName }
                                className = 'input'
                                placeholder = "Company Name"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>Applied Through:</label>
                            <input
                                id = "AppliedThrough"
                                type = "text"
                                name = "AppliedThrough"
                                value = { this.state.job.AppliedThrough }
                                className = 'input'
                                placeholder = "Applied Through"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Role:</label>
                            <input
                                id = "Role"
                                type = "text"
                                name = "Role"
                                value = { this.state.job.Role }
                                className = 'input'
                                placeholder = "Role"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>URL:</label>
                            <input
                                id = "URL"
                                type = "text"
                                name = "URL"
                                value = { this.state.job.URL }
                                className = 'input'
                                placeholder = "URL"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>

                            <label>Day:</label>

                                <input
                                id = "day"
                                type = "number"
                                name = "day"
                                value = { this.state.date.day }
                                className = 'input'
                                placeholder = "Day"
                                onChange = { this.dateHandler }
                            />

                        </div>

                        <div className = 'pair'>

                            <label>Month:</label>

                            <input
                                id = "month"
                                type = "number"
                                name = "month"
                                value = { this.state.date.month }
                                className = 'input'
                                placeholder = "Month"
                                onChange = { this.dateHandler }
                            />

                        </div>

                        <div className = 'pair'>

                            <label>Year:</label>

                            <input
                                id = "year"
                                type = "number"
                                name = "year"
                                value = { this.state.date.year }
                                className = 'input'
                                placeholder = "Year"
                                onChange = { this.dateHandler }
                            />

                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            
                            <label>Reply Recieved:</label>
                            <input
                                id = "ReplyRecieved"
                                type = "text"
                                name = "ReplyRecieved"
                                value = { this.state.job.ReplyRecieved }
                                className = 'input'
                                placeholder = "Reply Recieved"
                                onChange = { this.changeHandler }
                            />

                        </div>

                        <div className = 'pair'>
                            <label>Details:</label>
                            <input
                                id = "Details"
                                type = "text"
                                name = "Details"
                                value = { this.state.job.Details }
                                className = 'input'
                                placeholder = "Details"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div>
                        <NavLink type = 'button' to = '/Jobs' className = 'Action'><FeatherIcon icon="x" size="30" /></NavLink>
                        <button type='submit' className='Action'><FeatherIcon icon="check" size="30" /></button>
                    </div>

                </form>
            </div>

        )

    }

}