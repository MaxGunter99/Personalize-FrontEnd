import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

//Imported Components
import EditJob from './Components/EditJob';
import Jobs from './Components/Jobs';
import Job from './Components/Job';
import AddJobForm from './Components/AddJobForm';
import Home from './Components/Home';
import Settings from './Components/Settings';
import Weather from './Components/Weather';
import DiscoverScraper from './Components/DiscoverScraper';

// CSS
import './css/App.css';
import './css/Nav.css';


export default class App extends React.Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {

      // For settings

      weatherSettings: {
        location: false,
        description: false,
        temp: false,
        ImageURL: false,

      },

      statsDisplay: true,

      jobBoardIcons: {
        LinkedIn: false,
        Indeed: false,
        GlassDoor: false,
        AngelList: false,
        email: false
      },

      editResumeButton: true,
      todaysJobsActive: true,
      thisWeeksJobsActive: true,

    }
  }

  componentDidMount = () => {

    if ( localStorage.getItem( 'Settings' ) ) {
      let preSettings = localStorage.getItem( 'Settings' )
      let parsedPreSettings = JSON.parse( preSettings )

      this.setState({
        ...parsedPreSettings
      })

    } else {
      localStorage.clear();
    }

  }

  componentDidUpdate = () => {
    localStorage.setItem( 'Settings' , JSON.stringify( this.state ) )
  }

  toggle = ( e, item , bool ) => {

    e.preventDefault();

    if ( item === 'TodaysJobs' || item === 'ThisWeeksJobs' ) {

      if ( item === 'TodaysJobs' ) {
        this.setState({ todaysJobsActive: bool })
      } else {
        this.setState({ thisWeeksJobsActive: bool })
      }

    } else if ( item === 'statsDisplay' ) {

      this.setState({ statsDisplay: bool })

    } else if ( item === 'Indeed' || item === 'LinkedIn' || item === 'GlassDoor' || item === 'AngelList' || item === 'email' ) {

      this.setState({
        ...this.state,
        jobBoardIcons: {
          ...this.state.jobBoardIcons,
          [item]: bool
        }
      })

    } else if ( item === 'editResumeButton' ) {

      this.setState({ 
        ...this.state,
        editResumeButton: {
          [item]: bool
        }
      })

    } else {

      this.setState({
        ...this.state,
        weatherSettings: {
          ...this.state.weatherSettings,
          [item]: bool
        }
      })
    }

  }

  render() {
    return (
      <div className="App">
        <header className='HomePageHeader'>

          <h1 className='Title' >Personalize</h1>

          <Weather {...this.state}/>

          <div className='Pages'>

            <NavLink exact to='/' ><FeatherIcon icon="home" size="30" /></NavLink>
            <NavLink exact to='/Jobs' ><FeatherIcon icon="briefcase" size="30" /></NavLink>
            <NavLink exact to='/Discover' ><FeatherIcon icon="chrome" size="30"/></NavLink>
            <NavLink exact to='/Settings' ><FeatherIcon icon="settings" size="30"/></NavLink>

          </div>

        </header>

        <Route exact path='/' component={Home} />
        <Route exact path='/Jobs' component={ () => ( <Jobs {...this.state} /> ) } />
        <Route exact path='/AddJob' component={AddJobForm} />
        <Route exact path='/Job/:id' component={Job} />
        <Route exact path='/Job/Edit/:id' component={EditJob} />
        <Route exact path='/Settings' component={() => ( <Settings {...this.state} toggle = { this.toggle }/> ) } />
        <Route exact path='/Discover' component={ DiscoverScraper } />

      </div>

    );
  }
}

// export default withRouter( App );