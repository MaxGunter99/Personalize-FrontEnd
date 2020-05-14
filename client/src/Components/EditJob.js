import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

import '../css/EditJobForm.css';

async function wait(ms) {

    return new Promise( resolve => {
      setTimeout(resolve, ms);
    });

}

export default class EditJob extends React.Component {

    state = {
        job: {

            CompanyName: "",
            AppliedThrough: "",
            Role: "",
            URL: "",
            DateApplied: '',
            ReplyRecieved: "",
            Details: ""
        },

        date: {
            day: '',
            month: '',
            year: ''
        },

        startDate: new Date(),
        id: window.location.href.split('/')[5],
        PhoneScreen: false,
        OnSite: false,

        PhoneScreenHeight: '0',
        OnSiteHeight: '0'
    }


    componentDidMount() {
        axios
            .get(`http://localhost:3000/jobs/${this.state.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    job: res.data,
                })

                if (res.data.DateApplied) {

                    this.setState({ date: { day: res.data.DateApplied.split('/')[0], month: res.data.DateApplied.split('/')[1], year: [res.data.DateApplied.split('/')[2]] } })

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    // Update State When Entering Info
    changeHandler = event => {
        event.preventDefault();
        this.setState({
            job: {
                ...this.state.job,
                [event.target.name]: event.target.value
            }
        });
        console.log(this.state.startDate)
    };

    dateHandler = event => {

        event.preventDefault();

        this.setState({

            date: {
                ...this.state.date,
                [event.target.name]: event.target.value
            }

        });

        this.setState({

            job: {

                DateApplied: `${this.state.date.month}/${this.state.date.day}/${this.state.date.year}`

            }

        });

        console.log(this.state.date)

    }

    submitDataHandler = event => {

        event.preventDefault();
        axios
            .put(`http://localhost:3000/jobs/${this.state.id}`, this.state.job)
            .then(response => {
                console.log('Success', response, this.state.job)
                window.location.href = 'http://localhost:3001/Jobs';
            })
            .catch(error => {
                console.log(error.message)
            })

    };

    toggle = async function(data) {

        if (data === 'PhoneScreen') {
            if (this.state.PhoneScreen === false) {

                this.setState({ PhoneScreen: true })

                for ( var x = 0; x < 700; x += 50 ) {
                    await wait( 0 )
                    this.setState({ PhoneScreenHeight: x })
                    // window.scrollTo(0,document.body.scrollHeight);
                }

                this.setState({ PhoneScreenHeight: 700 })

            } else if (this.state.PhoneScreen === true) {

                for ( var x = 700; x > 0; x -= 50 ) {
                    await wait( 0 )
                    this.setState({ PhoneScreenHeight: x })
                    // window.scrollTo(0,document.body.scrollHeight);
                }

                this.setState({ PhoneScreen: false , PhoneScreenHeight: 0 })
            }

        } else if (data === 'OnSite') {
            if (this.state.OnSite === false) {

                this.setState({ OnSite: true })

                for ( var x = 0; x < 600; x += 50 ) {
                    await wait( 0 )
                    this.setState({ OnSiteHeight: x })
                    // window.scrollTo(0,document.body.scrollHeight);
                }

                this.setState({ OnSiteHeight: 600 })

            } else if (this.state.OnSite === true) {

                for ( var x = 600; x > 0; x -= 50 ) {
                    await wait( 0 )
                    this.setState({ OnSiteHeight: x })
                    // window.scrollTo(0,document.body.scrollHeight);
                }

                this.setState({ OnSite: false , OnSiteHeight: 0 })
            }
        }
    }

    back = () => {
        this.props.history.push(`/Job/${this.state.id}`)
    }

    render() {

        return (

            <div className='EditJobForm'>

                <form onSubmit={this.submitDataHandler}>

                    <div className='Process'>

                        <h1>Outreach</h1>

                        <div className='section'>

                            <div className='pair'>
                                <label>Company Name:</label>
                                <input
                                    id="CompanyName"
                                    type="text"
                                    name="CompanyName"
                                    value={this.state.job.CompanyName}
                                    className='input'
                                    placeholder="Company Name"
                                    onChange={this.changeHandler}
                                />
                            </div>

                            <div className='pair'>
                                <label>Applied Through:</label>
                                <input
                                    id="AppliedThrough"
                                    type="text"
                                    name="AppliedThrough"
                                    value={this.state.job.AppliedThrough}
                                    className='input'
                                    placeholder="Applied Through"
                                    onChange={this.changeHandler}
                                />
                            </div>

                        </div>

                        <div className='section'>

                            <div className='pair'>
                                <label>Role:</label>
                                <input
                                    id="Role"
                                    type="text"
                                    name="Role"
                                    value={this.state.job.Role}
                                    className='input'
                                    placeholder="Role"
                                    onChange={this.changeHandler}
                                />
                            </div>

                            <div className='pair'>
                                <label>URL:</label>
                                <input
                                    id="URL"
                                    type="text"
                                    name="URL"
                                    value={this.state.job.URL}
                                    className='input'
                                    placeholder="URL"
                                    onChange={this.changeHandler}
                                />
                            </div>

                        </div>

                        <div className='section'>

                            <div className='pair'>
                                <label>Reply Recieved:</label>
                                <input
                                    id="ReplyRecieved"
                                    type="text"
                                    name="ReplyRecieved"
                                    value={this.state.job.ReplyRecieved}
                                    className='input'
                                    placeholder="Yes or No"
                                    onChange={this.changeHandler}
                                />
                            </div>

                            <div className='pair'>
                                <label>Details:</label>
                                <input
                                    id="Details"
                                    type="text"
                                    name="Details"
                                    value={this.state.job.Details}
                                    className='input'
                                    placeholder="Details"
                                    onChange={this.changeHandler}
                                />
                            </div>

                        </div>

                        <div className='section'>

                            <div className='pair'>

                                <label>Day:</label>

                                <input
                                    id="day"
                                    type="number"
                                    name="day"
                                    value={this.state.date.day}
                                    className='input'
                                    placeholder="Day"
                                    onChange={this.dateHandler}
                                />

                            </div>

                            <div className='pair'>

                                <label>Month:</label>

                                <input
                                    id="month"
                                    type="number"
                                    name="month"
                                    value={this.state.date.month}
                                    className='input'
                                    placeholder="Month"
                                    onChange={this.dateHandler}
                                />

                            </div>

                            <div className='pair'>

                                <label>Year:</label>

                                <input
                                    id="year"
                                    type="number"
                                    name="year"
                                    value={this.state.date.year}
                                    className='input'
                                    placeholder="Year"
                                    onChange={this.dateHandler}
                                />

                            </div>

                        </div>

                    </div>
                    
                    {/* { this.state.job.PhoneScreen === 'Yes' || this.state.PhoneScreen === true ? */}
                    
                        <div className='Process' style = {{ height: `${this.state.PhoneScreenHeight}px` , overflow: 'hidden', transition: '1s' }}>

                            <h1>Phone Screen</h1>

                            <div className='section'>

                                <div className='pair'>
                                    <label>Phone Screen:</label>
                                    <input
                                        id="PhoneScreen"
                                        type="text"
                                        name="PhoneScreen"
                                        value={this.state.job.PhoneScreen}
                                        className='input'
                                        placeholder="Yes or No"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                            </div>

                            <div className='section'>

                                <div className='pair'>
                                    <label>Scheduled Or Completed:</label>
                                    <input
                                        id="ScheduledOrCompleted"
                                        type="text"
                                        name="ScheduledOrCompleted"
                                        value={this.state.job.ScheduledOrCompleted}
                                        className='input'
                                        placeholder="Scheduled Or Completed"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                                <div className='pair'>
                                    <label>Phone Screen Date:</label>
                                    <input
                                        id='PhoneScreenDate'
                                        type="text"
                                        name="PhoneScreenDate"
                                        value={this.state.job.PhoneScreenDate}
                                        className='input'
                                        placeholder="ex. 11/18/2019"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                            </div>

                            <div className='section'>

                                <div className='pair'>
                                    <label>Follow Up:</label>
                                    <input
                                        id="FollowUp"
                                        type="text"
                                        name="FollowUp"
                                        value={this.state.job.FollowUp}
                                        className='input'
                                        placeholder="Yes or No"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                                <div className='pair'>
                                    <label>Follow Up Date:</label>
                                    <input
                                        id='FollowUpDate'
                                        type="text"
                                        name="FollowUpDate"
                                        value={this.state.job.FollowUpDate}
                                        className='input'
                                        placeholder="ex. 11/18/2019"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                            </div>

                            <div className='section'>

                                <div className='pair'>
                                    <label>Follow Up Reply:</label>
                                    <input
                                        id='FollowUpReply'
                                        type="text"
                                        name="FollowUpReply"
                                        value={this.state.job.FollowUpReply}
                                        className='input'
                                        placeholder="Yes or No"
                                        onChange={this.changeHandler}
                                    />
                                </div>
                            </div>

                        </div>
                    {/* :
                        null
                    } */}

                    {/* {this.state.job.OnSite === 'Yes' || this.state.OnSite === true ? */}

                        <div className='Process' style = {{ height: `${this.state.OnSiteHeight}px` , overflow: 'hidden', transition: '1s' }}>

                            <h1>On Site</h1>

                            <div className='section'>

                                <div className='pair'>
                                    <label>On Site:</label>
                                    <input
                                        id="OnSite"
                                        type="text"
                                        name="OnSite"
                                        value={this.state.job.OnSite}
                                        className='input'
                                        placeholder="Yes or No"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                                <div className='pair'>
                                    <label>Opportunity Type:</label>
                                    <input
                                        id='OpportunityType'
                                        type="text"
                                        name="OpportunityType"
                                        value={this.state.job.OpportunityType}
                                        className='input'
                                        placeholder="Salary , Contract , etc."
                                        onChange={this.changeHandler}
                                    />
                                </div>
                            </div>


                            <div className='section'>

                                <div className='pair'>
                                    <label>Initial Compensation:</label>
                                    <input
                                        id="InitialCompensation"
                                        type="text"
                                        name="InitialCompensation"
                                        value={this.state.job.InitialCompensation}
                                        className='input'
                                        placeholder="$$$$"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                                <div className='pair'>
                                    <label>Negotiated:</label>
                                    <input
                                        id='Negotiated'
                                        type="text"
                                        name="Negotiated"
                                        value={this.state.job.Negotiated}
                                        className='input'
                                        placeholder="Yes or No"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                            </div>

                            <div className='section'>

                                <div className='pair'>
                                    <label>Salary:</label>
                                    <input
                                        id="Salary"
                                        type="text"
                                        name="Salary"
                                        value={this.state.job.Salary}
                                        className='input'
                                        placeholder="$$$$"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                                <div className='pair'>
                                    <label>Accepted Or Rejected:</label>
                                    <input
                                        id='AcceptedOrRejected'
                                        type="text"
                                        name="AcceptedOrRejected"
                                        value={this.state.job.AcceptedOrRejected}
                                        className='input'
                                        placeholder="Accepted Or Rejected"
                                        onChange={this.changeHandler}
                                    />
                                </div>

                            </div>

                        </div>
                    {/* :
                        null
                    } */}

                    <div className = 'ToggleButtonsContainer'>

                        <button className = 'AButton' onClick = { () => this.back() }><FeatherIcon icon="arrow-left" size="30"/><p>Back</p></button>

                        { this.state.job.PhoneScreen === 'No' || this.state.PhoneScreen === false ?
                            <button className='AButton' type='button' onClick={() => this.toggle('PhoneScreen')}><FeatherIcon icon="eye" size="30" /><p>Show Phone Screen</p></button>
                        : 
                            <button className='AButton' type='button' onClick={() => this.toggle('PhoneScreen')}><FeatherIcon icon="eye-off" size="30" /><p>Hide Phone Screen</p></button>
                        }

                        { this.state.job.OnSite === 'No' || this.state.OnSite === false ?
                            <button className='AButton' type='button' onClick={() => this.toggle('OnSite')}><FeatherIcon icon="eye" size="30" /><p>Show On Site</p></button>
                        : 
                            <button className='AButton' type='button' onClick={() => this.toggle('OnSite')}><FeatherIcon icon="eye-off" size="30" /><p>Hide On Site</p></button> 
                        }

                        <button type='submit' className='AButton'><FeatherIcon icon="check" size="30" /><p>Submit</p></button>

                    </div>

                </form>
            </div>

        )

    }

}