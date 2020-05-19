import React from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import '../css/Job.css';

export default class Job extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: window.location.href.split('/')[4],
            job: {}
        }

    }

    componentDidMount() {

        Axios
            .get(`http://localhost:3001/jobs/${this.state.id}`)
            .then(res => {
                this.setState({ job: res.data })
            });

    }

    deleteJob = ( id ) => {

        Axios
            .delete(`http://localhost:3001/jobs/${this.state.id}`)
            .then(res => {

                console.log()
                this.props.history.push( '/Jobs' )
            });

    }

    back = () => {
        this.props.history.push('/Jobs')
    }

    render() {

        return (

            <div>

                <div className='Container'>

                    <header>
                        <h1>{this.state.job.CompanyName}</h1>
                        <h4>{this.state.job.Role}</h4>
                    </header>

                    <div className='part'>

                        <h2>-= Outreach =-</h2>
                        <p><strong>Applied Through:</strong> {this.state.job.AppliedThrough}</p>
                        {this.state.job.ReplyRecieved === 'Yes' ? <p><strong>Reply Received:</strong> {this.state.job.ReplyRecieved}</p> : <p><strong>. . . No Reply yet . . .</strong></p>}
                        {this.state.job.Details !== '' ? <p><strong>Details:</strong> {this.state.job.Details}</p> : null}

                    </div>

                    {this.state.job.PhoneScreen === 'Yes' ?

                        <div className='part'>

                            <h2>-= Phone Screen =-</h2>
                            <p><strong>Scheduled or Completed:</strong> {this.state.job.ScheduledOrCompleted}</p>
                            <p><strong>Phone Screen Date:</strong> {this.state.job.PhoneScreenDate}</p>
                            {this.state.job.FollowUp !== '' ? <p><strong>Follow Up:</strong> {this.state.job.FollowUp}</p> : null}
                            {this.state.job.FollowUpDate !== '' ? <p><strong>Follow Up Date:</strong> {this.state.job.FollowUpDate}</p> : null}
                            {this.state.job.FollowUpReply !== '' ? <p><strong>Follow Up Reply:</strong> {this.state.job.FollowUpReply}</p> : null}

                        </div>

                        : null}

                    {this.state.job.OnSite === 'Yes' ?

                        <div className='part'>

                            <h2>-= On Site =-</h2>
                            <p><strong>Opportunity Type:</strong> {this.state.job.OpportunityType}</p>
                            <p><strong>Initial Compensation $:</strong> {this.state.job.InitialCompensation}</p>
                            <p><strong>Negotiated:</strong> {this.state.job.Negotiated}</p>
                            <p><strong>Salary:</strong> {this.state.job.Salary}</p>
                            <p><strong>Accepted Or Rejected:</strong> {this.state.job.AcceptedOrRejected}</p>

                        </div>

                    : null}

                    <div className='BottomButtons'>
                        <button className = 'AButton' onClick={() => this.back()}><FeatherIcon icon="arrow-left" size="30" /><p>back</p></button>
                        <button className = 'AButton' onClick={() => window.open(`${this.state.job.URL}`)}><FeatherIcon icon="external-link" size="30" /><p>Job Description</p></button>
                        <NavLink type = 'button' className = 'AButton' exact to={`/Job/Edit/${this.state.id}`}><FeatherIcon icon="edit-2" size="30" /><p>Edit</p></NavLink>
                        <button className = 'AButton' onClick={() => this.deleteJob(this.state.id)}><FeatherIcon icon="trash" size="30" /><p>Delete</p></button>
                    </div>

                    {/* <img className = 'Clouds' src = { 'https://www.pngmart.com/files/1/Clouds-PNG-Pic.png' } /> */}

                </div>

            </div>

        )

    }

}