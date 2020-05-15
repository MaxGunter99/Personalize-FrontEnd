
import React, { Suspense } from 'react';
import '../css/Jobs.css';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import Confetti from 'react-confetti';
const Stats = React.lazy(() => import('./Stats'));

export default class Jobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            Jobs: [],
            PuppeteerJobs: [],

            spinner: Math.floor(Math.random() * 4),
            spinnerOpacity: 1,
            spinnerWidth: 50,
            spinnerBorderRadius: 50,

            search: '',
            zoom: 20,
            statsDisplay: props.statsDisplay,
            editResumeButton: props.editResumeButton,

            jobBoardIcons: {
                LinkedIn: props.jobBoardIcons.LinkedIn,
                Indeed: props.jobBoardIcons.Indeed,
                GlassDoor: props.jobBoardIcons.GlassDoor,
                AngelList: props.jobBoardIcons.AngelList,
                email: props.jobBoardIcons.email
            },

            todaysJobsActive: props.todaysJobsActive,
            jobsAppliedToday: [],

            thisWeeksJobsActive: props.thisWeeksJobsActive,
            jobsAppliedThisWeek: [],

            onSchedule: true,
            catchUpNumber: 0,

            fetchingPuppeteerData: false,

        };
    };

    componentDidMount = () => {

        var bank = {}

        Axios
            .get('http://localhost:3001/jobs')
            .then(res => {

                let sorted = res.data.sort( (a, b) => (a.CompanyName > b.CompanyName) ? 1 : -1 );

                for ( var x in res.data ) {
                    let cur = sorted[x].CompanyName.toLowerCase()
                    if ( !bank[cur] ) {
                        bank[cur] = cur
                    };
                };

                this.setState({ Jobs: sorted });
                return this.loadSuggestions( bank );

            })
            .catch( err => {
                console.log( 'Get Jobs Error:' , err );
            })
    };

    loadSuggestions = bank => {

        Axios
            .get('http://localhost:3001/puppeteer')
            .then( results => {

                let filtered = [];
                
                for (var y = 0; y < results.data.length; y++ ) {
                    for ( var x = 0; x < results.data[y].length; x++ ) {
                        if (!bank[results.data[y][x].company.toLowerCase()]) {
                            filtered.push(results.data[y][x])
                        };
                    };
                };

                let sorted = filtered.sort((a, b) => (a.title > b.title) ? 1 : -1);

                this.setState({
                    spinnerOpacity: 0,
                    spinnerWidth: 95,
                    spinnerBorderRadius: 10
                });

                this.setState({ PuppeteerJobs: sorted });

            })
            .catch( err => {
                console.log( 'Error getting Puppeteer data:' , err );
            })
    };

    handleSearch = (e) => {

        e.preventDefault();
        this.setState({
            search: e.target.value
        });

    };

    toIndeed = e => {
        e.preventDefault();
        window.open('https://www.indeed.com/?from=gnav-jobsearch--jasx');
    };

    toLinkedIn = e => {
        e.preventDefault();
        window.open('https://www.linkedin.com/jobs/');
    };

    toGlassDoor = e => {
        e.preventDefault();
        window.open('https://www.glassdoor.com/Job/Home/recentActivity.htm');
    };

    toAngelList = e => {
        e.preventDefault();
        window.open('https://angel.co/jobs');
    };

    toCreddle = e => {
        e.preventDefault();
        window.open('https://content.creddle.io/persons/sign_in');
    };

    toEmail = e => {
        e.preventDefault();
        window.open('https://mail.google.com/mail/u/1/#inbox`');
    };

    zoom = (e, size) => {

        e.preventDefault();
        if (size === 'in' & this.state.zoom <= 40) {

            let currentSize = this.state.zoom;
            this.setState({ zoom: currentSize + 10 });

        } else if (size === 'out' & this.state.zoom >= 30) {

            let currentSize = this.state.zoom;
            this.setState({ zoom: currentSize - 10 });

        };

    };

    handleJobs = (jobs, time) => {

        if (time === 'Week') {

            this.setState({ ...this.state, jobsAppliedThisWeek: jobs });
            this.statusCheck();

        } else {

            this.setState({ ...this.state, jobsAppliedToday: jobs });

        };

    };

    renderConfetti = () => {
        return (
            <Confetti
                width={window.width}
                height={window.height}
            />
        );
    };

    statusCheck = () => {

        var d = new Date();
        var n = d.getDay();
        const dailyGoal = n * 2;
        const onSchedule = dailyGoal - this.state.jobsAppliedThisWeek.length;

        if (0 < n < 6) {
            if (this.state.jobsAppliedThisWeek.length < dailyGoal) {
                this.setState({ onSchedule: false, catchUpNumber: onSchedule });
            } else {
                this.setState({ onSchedule: true });
            };
        };

    };

    sleep = m => new Promise(r => setTimeout(r, m));

    render() {

        // STYLED COMPONENTS

        const IndividualJob = styled.div`

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
            margin: 10px;
            padding: 5px;
            width: ${this.state.zoom}%;
            border: 3px solid white;
            background-color: black;
            transition: .2s;

            &:hover {

                border: 3px solid rgb(185, 50, 50);
                transition: .2s;
                cursor: pointer;

            };

        `;

        return (
            <div className='Jobs'>
                <nav>
                    <div className='Actions'>

                        <div className='JobBoards'>
                            {this.state.jobBoardIcons.email === true ?
                                <img src={'https://i.ya-webdesign.com/images/email-icon-white-png-5.png'} alt = 'EmailIcon' onClick={this.toEmail} />
                            : null}
                            {this.state.jobBoardIcons.LinkedIn === true ?
                                <img src={'https://i.ya-webdesign.com/images/location-icon-png-white-5.png'} alt = 'LinkedInIcon' onClick={this.toLinkedIn} />
                            : null}
                            {this.state.jobBoardIcons.Indeed === true ?
                                // <img src = { 'https://assets-cdn.breezy.hr/breezy-portal/images/indeed-icon.png' } onClick = { this.toIndeed } />
                                <img src={'https://i.ya-webdesign.com/images/white-letter-a-png-6.png'} alt = 'IndeedIcon' onClick={this.toIndeed} />
                            : null}
                            {this.state.jobBoardIcons.GlassDoor === true ?
                                <img src={'https://intalytics.com/careers/glassdoor-icon-300x300-2/'} alt = 'GlassDoorIcon' onClick={this.toGlassDoor} />
                            : null}
                            {this.state.jobBoardIcons.AngelList === true ?
                                <img src={'https://techcrunch.com/wp-content/uploads/2014/03/peace_large.jpg?w=730&crop=1'} alt = 'AngelListIcon' onClick={this.toAngelList} />
                            : null}
                        </div>

                        <div className='Search'>

                            <input
                                value={this.state.search}
                                placeholder='Search'
                                name='search'
                                onChange={this.handleSearch}
                            />

                        </div>

                        <NavLink className='ActionButton' exact to='/AddJob' >Add Job</NavLink>
                        {this.state.editResumeButton === true ?
                            <button onClick={this.toCreddle}>Edit Resume</button>
                        : null}
                    </div>
                </nav>

                {this.state.onSchedule === false ? (
                    <>
                        {this.state.catchUpNumber >= 2 ? (
                            <p style={{ color: 'rgb(185, 50, 50)' }}>You are { this.state.catchUpNumber} jobs away from your weekly goal!</p>
                        ) : (
                            <p style={{ color: 'rgb(185, 50, 50)' }}>You are { this.state.catchUpNumber} job away from your weekly goal!</p>
                        )}
                    </>
                ) : (
                    // <p>{ this.renderConfetti() }</p> 
                    null
                )}

                { this.state.search === '' ?

                    <Suspense fallback={<div> Loading... </div>}>

                        { this.state.statsDisplay === true ? (
                            <Stats {...this.state} handleJobs={this.handleJobs} />
                        ) : null }

                    </Suspense>

                : null}

                { this.state.PuppeteerJobs.length > 0 && this.state.search === '' ?
                    <div className='PuppeteerJobs'>
                        <h1 style={{ width: '100%', color: 'white' }}>Indeed Suggestions</h1>
                        { this.state.PuppeteerJobs.map( (x) =>
                            <>
                                {x.title.toLowerCase().includes('php') ||
                                    x.title.toLowerCase().includes('.net') ||
                                    x.title.toLowerCase().includes('lead') ||
                                    x.title.toLowerCase().includes('angular') ||
                                    x.company.toLowerCase() === 'revature' ||
                                    x.title.toLowerCase().includes('senior') ? null :

                                    <div key = {x.description} className='PuppeteerJob' onClick={() => window.open(x.URL)}>

                                        <div>
                                            <h2><strong>{x.title}</strong></h2>
                                            <h5>{x.company}  ➡︎  {x.location}</h5>
                                        </div>

                                        <p>{x.description}</p>

                                        <div className = 'PuppeteerBottom'>
                                            <p>{x.jobBoard}</p>
                                            <div className = 'buttons'>
                                                <NavLink exact to='/AddJob' onClick = { () => ( localStorage.setItem('ApplyingTo', JSON.stringify(x) ) ) }><FeatherIcon icon="plus" /></NavLink>
                                                <button onClick={ () => window.open(x.URL) }><FeatherIcon icon="eye" /></button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        )}

                    </div>
                :
                    <>
                        { this.state.search === '' ?

                            <div className='LoadingGif' style={{ width: `${this.state.spinnerWidth}%`, transition: '.5s', borderRadius: `${this.state.spinnerBorderRadius}px` }}>
                                { this.state.spinner === 0 ?
                                    <img className='LoadingGifImg' alt = 'SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://cdn.dribbble.com/users/2448190/screenshots/5369677/hud.gif"} />
                                : this.state.spinner === 1 ?
                                    <img className='LoadingGifImg' alt = 'SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://i.pinimg.com/originals/c6/1c/d2/c61cd23ff606ef7b7599ccf2c8dda159.gif"} />
                                : this.state.spinner === 2 ?
                                    <img className='LoadingGifImg' alt = 'SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://i.pinimg.com/originals/f2/d9/c3/f2d9c3dbdc12351f8d32585b8cf5152b.gif"} />
                                : this.state.spinner === 3 ?
                                    <img className='LoadingGifImg' alt = 'SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://thumbs.gfycat.com/DeterminedEssentialHoki-small.gif"} />
                                : this.state.spinner === 4 ?
                                    <img className='LoadingGifImg' alt = 'SpinnerLoader' style={{ opacity: this.state.spinnerOpacity, transition: '.5s' }} src={"https://cdn.dribbble.com/users/31818/screenshots/2035234/dribbb.gif"} />
                                : null}
                            </div>

                        : null}
                    </>
                }

                <div>

                    <Suspense fallback={<div> Loading... </div>}>

                        {this.state.search === '' && this.state.jobsAppliedToday.length > 0 ? (

                            <div className='indView'>

                                {this.state.todaysJobsActive === true && this.state.jobsAppliedToday.length > 0 ? (

                                    <div className='individual'>

                                        <h2>Applied Today</h2>

                                        <div className='JobContainer'>

                                            {this.state.jobsAppliedToday.map((x) =>

                                                <IndividualJob key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

                                                    <div className='Header'>
                                                        <div>
                                                            <h2 className='CompanyName'>{x.CompanyName}</h2>
                                                            <h4 className='Role'>{x.Role}</h4>
                                                        </div>
                                                    </div>

                                                    <div className='Applied'>
                                                        {/* <p>{x.AppliedThrough}</p> */}
                                                        <p className="Date">{x.DateApplied}</p>
                                                    </div>

                                                </IndividualJob>

                                            )}
                                        </div>
                                    </div>
                                ) : null}

                                {this.state.thisWeeksJobsActive === true && this.state.jobsAppliedThisWeek.length > 0 ? (

                                    <div className='individual'>

                                        <h2>Applied This Week</h2>

                                        <div className='JobContainer'>

                                            {this.state.jobsAppliedThisWeek.map((x) =>

                                                <IndividualJob key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

                                                    <div className='Header'>

                                                        <div>

                                                            <h2 className='CompanyName'>{x.CompanyName}</h2>
                                                            <h4 className='Role'>{x.Role}</h4>

                                                        </div>

                                                    </div>

                                                    <div className='Applied'>

                                                        <p>{x.AppliedThrough}</p>
                                                        <p className="Date">{x.DateApplied}</p>

                                                    </div>

                                                </IndividualJob>

                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}

                        {this.state.search !== '' ?

                            <div className='JobContainer'>

                                <div className='ZoomControls'>
                                    <FeatherIcon icon="zoom-in" size="35" className='Zoom' onClick={(e) => this.zoom(e, 'in')} />
                                    <FeatherIcon icon="zoom-out" size="35" className='Zoom' onClick={(e) => this.zoom(e, 'out')} />
                                </div>

                                {this.state.Jobs.map((x) =>
                                    <>
                                        {x.CompanyName.slice(0, this.state.search.length) === this.state.search ?
                                            <IndividualJob key={x.id} onClick={() => window.location = `/Job/${x.id}`}>
                                                <div className='Header' >
                                                    <div>
                                                        <h2 className='CompanyName'>{x.CompanyName}</h2>
                                                        <h4 className='Role'>{x.Role}</h4>
                                                    </div>
                                                </div>

                                                <div className='Applied'>
                                                    <p>{x.AppliedThrough}</p>
                                                    <p className="Date">{x.DateApplied}</p>
                                                </div>

                                            </IndividualJob>

                                        : null}
                                    </>
                                )}
                            </div>
                        :
                            <div className='JobContainer'>

                                <h1 style={{ width: '100%', color: 'white' }}>Applied</h1>

                                <div className='ZoomControls'>
                                    <FeatherIcon icon="zoom-in" size="35" className='Zoom' onClick={(e) => this.zoom(e, 'in')} />
                                    <FeatherIcon icon="zoom-out" size="35" className='Zoom' onClick={(e) => this.zoom(e, 'out')} />
                                </div>

                                {this.state.Jobs.map((x) =>

                                    <IndividualJob key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

                                        <div className='Header'>
                                            <div>
                                                <h2 className='CompanyName'>{x.CompanyName}</h2>
                                                <h4 className='Role'>{x.Role}</h4>
                                            </div>
                                        </div>

                                        <div className='Applied'>
                                            <p>{x.AppliedThrough}</p>
                                            <p className="Date">{x.DateApplied}</p>
                                        </div>

                                    </IndividualJob>
                                )}
                            </div>
                        }
                    </Suspense>
                </div>
            </div>
        )
    }
};