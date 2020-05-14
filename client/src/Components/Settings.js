import React , { Component , Suspense } from 'react';
import FeatherIcon from 'feather-icons-react';
import '../css/Settings.css';

export default class Settings extends Component {

    constructor(props){
        super(props)
        this.state = {

            weather: props.weather,
            weatherSettings: {

                location: props.weatherSettings.location,
                description: props.weatherSettings.description,
                temp: props.weatherSettings.temp,
                feelsLike: props.weatherSettings.feelsLike,
                sunrise: props.weatherSettings.sunrise,
                sunset: props.weatherSettings.sunset
            
            },

            statsDisplay: props.statsDisplay,
            jobBoardIcons: {
                LinkedIn: props.jobBoardIcons.LinkedIn,
                Indeed: props.jobBoardIcons.Indeed,
                GlassDoor: props.jobBoardIcons.GlassDoor,
                AngelList: props.jobBoardIcons.AngelList,
                email: props.jobBoardIcons.email
            },

            editResumeButton: props.editResumeButton,
            todaysJobsActive: props.todaysJobsActive,
            thisWeeksJobsActive: props.thisWeeksJobsActive
        }
    }

    render() {

        return (

            <Suspense fallback = { <h1>Loading</h1> }>

                <div className = 'SettingsContainer'>

                    <h1>Settings</h1>

                    <div className='Settings'>

                        <div className = 'Section'>

                            <h2>Weather</h2>

                            <div className = 'Single'>

                                <h3>All Weather</h3>
                                { this.state.weather === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'weather' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'weather' , true ) }/> 
                                }

                            </div>

                            <div className = 'Single'>

                                <h3>Location</h3>
                                { this.state.weatherSettings.location === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'location' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'location' , true ) }/> 
                                }

                            </div>

                            <div className = 'Single'>

                                <h3>Description</h3>
                                { this.state.weatherSettings.description === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'description' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'description' , true ) }/> 
                                }

                            </div>

                            <div className = 'Single'>

                                <h3>Temperature</h3>
                                { this.state.weatherSettings.temp === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'temp' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'temp' , true ) }/> 
                                }

                            </div>

                            <div className = 'Single'>

                                <h3>Feels Like</h3>
                                { this.state.weatherSettings.feelsLike === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'feelsLike' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'feelsLike' , true ) }/> 
                                }

                            </div>

                            <div className = 'Single'>

                                <h3>Sunrise</h3>
                                { this.state.weatherSettings.sunrise === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'sunrise' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'sunrise' , true ) }/> 
                                }

                            </div>

                            <div className = 'Single'>

                                <h3>Sunset</h3>
                                { this.state.weatherSettings.sunset === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'sunset' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'sunset' , true ) }/> 
                                }

                            </div>


                        </div>

                        <div className = 'Section'>

                            <h2>Job Board</h2>

                            <div className = 'Single'>
                                <h3>All Job Stats</h3>
                                { this.state.statsDisplay === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'statsDisplay' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'statsDisplay' , true ) }/> 
                                }
                            </div>

                            <div className = 'Single'>
                                <h3>Edit Resume</h3>
                                { this.state.editResumeButton === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'editResumeButton' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'editResumeButton' , true ) }/> 

                                }
                            </div>

                            <div className = 'Single'>

                                <h3>Todays Jobs</h3>
                                { this.state.todaysJobsActive === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'TodaysJobs' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'TodaysJobs' , true ) }/> 
                                }

                            </div>

                            <div className = 'Single'>

                                <h3>This Weeks Jobs</h3>
                                { this.state.thisWeeksJobsActive === true ? 
                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'ThisWeeksJobs' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'ThisWeeksJobs' , true ) }/> 
                                }

                            </div>

                            <div className = 'JobBoardContainer'>

                                <h3>Job Board Icons</h3>

                                <div className = 'JobBoard'>
                                    <p>LinkedIn</p>
                                    { this.state.jobBoardIcons.LinkedIn === true ? 
                                        <FeatherIcon icon="check-square" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'LinkedIn' , false ) }/>
                                    : 
                                        <FeatherIcon icon="square" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'LinkedIn' , true ) }/> 
                                    }

                                </div>

                                <div className = 'JobBoard'>
                                    <p>Indeed</p>
                                    { this.state.jobBoardIcons.Indeed === true ? 
                                        <FeatherIcon icon="check-square" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'Indeed' , false ) }/>
                                    : 
                                        <FeatherIcon icon="square" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'Indeed' , true ) }/> 
                                    }
                                </div>

                                <div className = 'JobBoard'>
                                    <p>Glass Door</p>
                                    { this.state.jobBoardIcons.GlassDoor === true ? 
                                        <FeatherIcon icon="check-square" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'GlassDoor' , false ) }/>
                                    : 
                                        <FeatherIcon icon="square" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'GlassDoor' , true ) }/> 
                                    }
                                </div>

                                <div className = 'JobBoard'>
                                    <p>AngelList</p>
                                    { this.state.jobBoardIcons.AngelList === true ? 
                                        <FeatherIcon icon="check-square" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'AngelList' , false ) }/>
                                    : 
                                        <FeatherIcon icon="square" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'AngelList' , true ) }/> 
                                    }
                                </div>

                                <div className = 'JobBoard'>
                                    <p>Email</p>
                                    { this.state.jobBoardIcons.email === true ? 
                                        <FeatherIcon icon="check-square" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'email' , false ) }/>
                                    : 
                                        <FeatherIcon icon="square" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'email' , true ) }/> 
                                    }
                                </div>

                            </div>
                            
                        </div>

                    </div>

                </div>

            </Suspense>
    
        )
    }

}