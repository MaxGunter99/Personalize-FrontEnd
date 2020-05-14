
import React from 'react';
import '../css/Calendar.css';
import WOW from "wow.js";
import FeatherIcon from 'feather-icons-react';
import axios from 'axios'

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
    
            events: [],
            today: new Date().toDateString(),
            thisMonth: [],
            loading: true,
            select: 'Inactive',
            slide: 30,
            AddEvent: false,
            eventSlide: -3000,
            selected: [],
            CalendarDate: new Date(),
            time: `${ new Date().toLocaleTimeString().split(':')[0] }:${ new Date().toLocaleTimeString().split(':')[1] }`,
            
            AddedEvent: {
                title: '',
                category: '',
                day: '',
                month: '',
                year: '',
                URL: '',
                notes: '',
                time: ''
            }
        }
    }

    componentDidMount() {
        console.log(`${ new Date().toLocaleTimeString().split(':')[0] }:${ new Date().toLocaleTimeString().split(':')[1] } ${ new Date().toLocaleTimeString().split(' ')[1] }`)

        axios.get('http://localhost:3000/events/Month')

            .then(res => {

                this.setState({ events: res.data })
                this.loadCalendar()
            })

            .catch(err => {
                console.log(err.message)
            })

    };

    componentDidUpdate = () => event => {
        
        event.preventDefault();
        new WOW().init();

    };

    // Update State When Entering Info
    changeHandler = event => {

        event.preventDefault();

        this.setState({

            AddedEvent: {
                ...this.state.AddedEvent,
                [ event.target.name ]: event.target.value
            }

        });

        console.log( this.state.AddedEvent )

    };

    loadCalendar = () => {

        const thisMonthDates = [];
        const today = 1;

        for (var z = 0; z < 32; z++) {

            const prev = new Date(z)
            const prevDay = new Date().setDate(prev)
            const thatDay = new Date(prevDay).toLocaleDateString()
            let MatchingEvent = []

            if ( new Date().toLocaleDateString().split('/')[0] === thatDay.split('/')[0] ) {

                let day = new Date( thatDay ).toLocaleDateString().split('/')[1]
                let month = new Date( thatDay ).toLocaleDateString().split('/')[0] 
                let year = new Date( thatDay ).toLocaleDateString().split('/')[2]

                for ( var d = 0; d < this.state.events.length; d++ ) {

                    let thisEvent = this.state.events[d]

                    if ( Number( day ) === thisEvent.day && Number( month ) === thisEvent.month && Number( year ) === thisEvent.year ) {

                        MatchingEvent.push( thisEvent )

                    }
                    
                }

                if ( MatchingEvent.length === 1 ) {

                    thisMonthDates.push( { Day: new Date( thatDay ).toDateString() , Event: MatchingEvent[0] } )

                    MatchingEvent.pop()

                } else if ( MatchingEvent.length >= 2 ) {

                    thisMonthDates.push( { Day: new Date( thatDay ).toDateString() , Event: MatchingEvent } )
                    MatchingEvent = []

                } else {

                    thisMonthDates.push( { Day: new Date( thatDay ).toDateString() , Event: null } )

                }

            }

        }

        let week = [ 'Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat' ]

        // matching days to the map
        if ( thisMonthDates[0].Day.split(' ')[0] !== 'Sun' ) {

            let count = week.indexOf( thisMonthDates[0].Day.split(' ')[0] )
            for ( var x = 0; x < count; x++ ) {

                thisMonthDates.unshift({Day: '' , Event: null})

            }
        }

        if ( thisMonthDates[ thisMonthDates.length - 1 ].Day.split(' ')[0] !== 'Sat' ) {

            let EndCount = 6 - week.indexOf( thisMonthDates[ thisMonthDates.length - 1 ].Day.split(' ')[0] )

            for ( var x = 0; x < EndCount; x++ ) {

                thisMonthDates.push({Day: '' , Event: null})

            }

        }
        
        this.setState({  
            thisMonth: thisMonthDates , 
            loading: false 
        })

    };

    activehandler = x => {

        if ( x !== 'None' ) {

            let thatDaysEvents = []

            for ( var e = 0; e < this.state.events.length; e++ ) {

                let day = `${this.state.events[e].month}/${this.state.events[e].day}/${this.state.events[e].year}`

                if ( x === day ) {

                    thatDaysEvents.push( this.state.events[e] )

                }

            }

            this.setState({ selected: thatDaysEvents , select: 'Active' })

        }

    };

    // Conditionals to show or hide modals
    toggleModal = event => {

        // If the event is blank ( white spaces to align week days )
        if ( event.Day === '' ) {

            console.log( 'No Event' )

        } else if ( event.Event !== null && event !== 'AddEvent' ) {

            if ( this.state.select === 'Inactive' ) {

                // If there are two events then  it creates more space for them
                if ( event.Event.length ) {

                    console.log( 'YES' )
                    this.setState({ select: 'Active' , selected: event, slide: 1500 })

                    setTimeout( () => {
                        this.setState({ eventSlide: -2000  })
                    } , 250 )

                } else {

                    this.setState({ select: 'Active' , selected: event, slide: 560 })

                    setTimeout( () => {
                        this.setState({ eventSlide: -1000  })
                    } , 250 )

                }

            } else {

                this.setState({ eventSlide: -3000 })

                setTimeout( () => {
                    this.setState({ select: 'Inactive' , slide: 30 })
                } , 250 )

            }

        } else {

            if ( this.state.AddEvent === false ) {

                this.setState({ select: 'Active' , AddEvent: true , slide: 560 })

                if ( !event.Day ) {

                    setTimeout( () => {
                        this.setState({ eventSlide: -1150  })
                    } , 250 )

                } else {

                    setTimeout( () => {

                        this.setState({ eventSlide: -1150  })
                        this.setState({ AddedEvent: { 
                            day: Number( event.Day.split(' ')[2] ),
                            month: Number( new Date().toLocaleDateString()[0] ) ,
                            year: Number( event.Day.split(' ')[3] ) } 
                        })

                    } , 250 )

                };

            } else {

                this.setState({ eventSlide: -3000 })

                setTimeout( () => {
                    this.setState({ select: 'Inactive' , AddEvent: false , slide: 30 })
                } , 250 )

            }
        }

    }
    
    // AXIOS ACTIONS

    SubmitEvent = ( e , event ) => {

        e.preventDefault();

        axios.post( 'http://localhost:3000/events' , this.state.AddedEvent )
        .then( res => {
            console.log( 'Add event Success!' , res.data )
            this.setState({ eventSlide: -3000 })

            setTimeout( () => {
                this.setState({ slide: 30 })
            } , 250 )

            setTimeout( () => {
                window.location = 'http://localhost:3001/Schedule'
            } , 1000 )

        })
        .catch( err => {
            console.log( 'Error adding Event!' , err )
        })

    };

    DeleteEvent = ( e , event ) => {
        
        e.preventDefault();
        axios.delete( `http://localhost:3000/events/${event.id}` )
        .then( res => {

            console.log( res )
            this.setState({ eventSlide: -3000  })

            setTimeout( () => {
                this.setState({ slide: 30  })
            } , 250 )

            setTimeout( () => {
                window.location = 'http://localhost:3001/Schedule'
            } , 1000 )

        })
        .catch( err => {
            console.log( err )
        })

    }

    render() {
        
        return (

            <div className='Calendar'>

                {this.state.loading === true ?

                    null

                :
                    <div>

                        <header className = {`CalendarHeader ${this.state.select}`} style = {{ marginTop: `${this.state.slide}px` , transition: '1s' }}>

                            <h1 className = 'HeaderMonth'>{ new Date().toDateString().split(' ')[1] }</h1>
                            <button className = 'Action' onClick ={ () => this.toggleModal( 'AddEvent' ) }><FeatherIcon icon="plus" size="30" /></button>

                        </header>

                        {/* // MONTH VIEW */}

                        <div className = 'CalendarContainer Month'>

                            <div className='month'>

                                <div className = 'WeekDays'>

                                    <h3>Sunday</h3>
                                    <h3>Monday</h3>
                                    <h3>Tuesday</h3>
                                    <h3>Wednsday</h3>
                                    <h3>Thursday</h3>
                                    <h3>Friday</h3>
                                    <h3>Saturday</h3>

                                </div>

                                {this.state.thisMonth.map( ( x )  =>

                                    <>
                                        { x.Day === this.state.today ? 

                                            <div key={ x } className = 'ind Today' onClick ={ () => this.toggleModal( x ) }>

                                                { x.Event !== null ?  

                                                    <p className = 'Event'>{ x.Day.split(' ')[2]}</p>

                                                :
                                                    <p className = 'NoEvent'>{ x.Day.split(' ')[2] }</p>
                                                }

                                            </div> 

                                        : 

                                            <div key={x} className = 'ind' onClick ={ () => this.toggleModal( x ) }>

                                                { x.Event !== null ?  

                                                    <p className = 'Event'>{ x.Day.split(' ')[2]}</p>

                                                :
                                                    <p className = 'NoEvent'>{ x.Day.split(' ')[2] }</p>
                                                }

                                            </div>

                                        }
                                    </>
                                )}

                            </div>

                        </div>

                        {/* IF YOU SELECT AN EVENT */}

                        { this.state.select === 'Active' && this.state.AddEvent === false ?
                            
                            <>

                                { this.state.selected.Event === null ?

                                    // IF THERE IS JUST A BANK SPACE
                                    null

                                : this.state.selected.Event.length ?

                                    // MAPPING MULTIPLE EVENTS
                                    <div className = {`EventModal Active Multiple`} style = {{ marginTop: `${this.state.eventSlide}px` , transition: '1s' }} wow-duration = '4s'>

                                        <>

                                            <h2 className = 'CloseEvents' onClick = { () => this.toggleModal( this.state.selected.Event ) }>Close</h2>

                                            { this.state.selected.Event.map(  ( event ) =>

                                                <div className = 'EventContainer'>

                                                    <div className = 'EventHeader'>
                                                        <div>
                                                            <h1>{event.title}</h1>
                                                            <h2 className = 'Category'>{event.category}</h2>
                                                        </div>

                                                        <div className = 'RightHeader'>
                                                            <h2>{event.time}</h2>
                                                        </div>

                                                    </div>

                                                    <div className = 'info'>
                                                        <p>{event.notes}</p>
                                                        <h3>{event.URL}</h3>
                                                        <button onClick = { (e) => this.DeleteEvent( e , event ) }>Delete</button>
                                                    </div>

                                                </div>
                                            ) }

                                        </>

                                    </div>

                                :
                                    // MAPPING JUST ONE EVENT
                                    <div className = {`EventModal ${this.state.select}`} style = {{ marginTop: `${this.state.eventSlide}px` , transition: '1s' }} wow-duration = '4s'>

                                        <div className = 'EventHeader'>

                                            {/* <h2>{this.state.selected.Event.month}/{this.state.selected.Event.day}/{this.state.selected.Event.day}</h2> */}
                                            <div>
                                                <h1>{this.state.selected.Event.title}</h1>
                                                <h2 className = 'Category'>{this.state.selected.Event.category}</h2>
                                            </div>

                                            <div className = 'RightHeader'>

                                                <h2>{this.state.selected.Event.time}</h2>
                                                <h2 className = 'x' onClick = { () => this.toggleModal( this.state.selected.Event ) }><FeatherIcon icon="x" size="30" /></h2>

                                            </div>

                                        </div>

                                        <div className = 'info'>

                                            <p>{this.state.selected.Event.notes}</p>
                                            <h3>{this.state.selected.Event.URL}</h3>
                                            <button onClick = { (e) => this.DeleteEvent( e , this.state.selected.Event ) }>Delete</button>

                                        </div>

                                    </div>

                                }

                            </>

                        :
                            null
                        }

                        {/* IF YOU WANT TO ADD AN EVENT */}

                        { this.state.select === 'Active' && this.state.AddEvent === true ?
                        
                            <div style = {{ marginTop: `${this.state.eventSlide}px` , transition: '1s' }}>

                                <h2 className = 'AddEventTitle'>Add an Event</h2>

                                <form autoComplete="off" onSubmit = { this.SubmitEvent }>
                                    
                                    <div className = 'pair'>

                                        <div>

                                            <label>Title:</label>

                                            <input
                                                id = "title"
                                                type = "text"
                                                name = "title"
                                                value = { this.state.AddedEvent.title }
                                                className = 'input'
                                                placeholder = "Title"
                                                onChange = { this.changeHandler }
                                            />

                                        </div>

                                        <div>

                                            <label>Event type:</label>

                                            <input
                                                id = "category"
                                                type = "text"
                                                name = "category"
                                                value = { this.state.AddedEvent.category }
                                                className = 'input'
                                                placeholder = "Category"
                                                onChange = { this.changeHandler }
                                            />

                                        </div>

                                        <div>

                                            <label>Link to event:</label>

                                            <input
                                                id = "URL"
                                                type = "text"
                                                name = "URL"
                                                value = { this.state.AddedEvent.URL }
                                                className = 'input'
                                                placeholder = "Link"
                                                onChange = { this.changeHandler }
                                            />

                                        </div>

                                    </div>


                                    <div className = 'date'>

                                        <div>

                                            <label>Day:</label>

                                            <input
                                                id = "day"
                                                type = "number"
                                                name = "day"
                                                value = { this.state.AddedEvent.day }
                                                className = 'input'
                                                placeholder = "Day"
                                                onChange = { this.changeHandler }
                                            />

                                        </div>

                                        <div>

                                            <label>Month:</label>

                                            <input
                                                id = "month"
                                                type = "number"
                                                name = "month"
                                                value = { this.state.AddedEvent.month }
                                                className = 'input'
                                                placeholder = "Month"
                                                onChange = { this.changeHandler }
                                            />

                                        </div>

                                        <div>

                                            <label>Year:</label>

                                            <input
                                                id = "year"
                                                type = "number"
                                                name = "year"
                                                value = { this.state.AddedEvent.year }
                                                className = 'input'
                                                placeholder = "Year"
                                                onChange = { this.changeHandler }
                                            />

                                        </div>

                                    </div>

                                    <div className = 'pair'>

                                        <div>
                                            <label>Time:</label>

                                            <input
                                                id = "time"
                                                type = "text"
                                                name = "time"
                                                value = { this.state.AddedEvent.time }
                                                className = 'input'
                                                placeholder = "ex: 1:00 PM"
                                                onChange = { this.changeHandler }
                                            />

                                        </div>


                                        <div>

                                            <label>Notes:</label>

                                            <input
                                                id = "notes"
                                                type = "text"
                                                name = "notes"
                                                value = { this.state.AddedEvent.notes }
                                                className = 'input'
                                                placeholder = "Notes"
                                                onChange = { this.changeHandler }
                                            />

                                        </div>

                                    </div>

                                    <div className = 'buttons'>

                                        <button type = 'button' className='Action x' onClick = { ( e ) => this.toggleModal( e , 'AddEvent' ) }><FeatherIcon icon="x" size="30" /></button>
                                        <button type='submit' className='Action Check'><FeatherIcon icon="check" size="30" /></button>

                                    </div>

                                </form>
                                
                            </div>

                        :

                            null

                        }

                    </div>
                }

            </div>
        )
    };

};

export default Home;