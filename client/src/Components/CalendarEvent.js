import React from 'react';
import axios from 'axios'

//CSS
import '../css/Calendar.css'

export default class CalendarEvent extends React.Component {

    constructor() {
        super();
        this.state = {
    
            event: `${window.location.href.split('/')[4]}/${window.location.href.split('/')[5]}/${window.location.href.split('/')[6]}`,
            today: new Date().toLocaleDateString().split('/'),
            data: []
    
        }
    }

    componentDidMount = () => {

        axios.get( 'http://localhost:3000/events' )

        .then( res => {

            const data = res.data.filter( x => `${x.month}/${x.day}/${x.year}` === this.state.event );

            this.setState({ data: data })

        })

        .catch( error => {

            console.log( 'There was an error getting todays events!' , error )

        })

    }

    render() {

        return(

            <div>

                <header>
                <h1>{this.state.event}</h1>
                </header>

                { this.state.data.length === 0 ?

                    <p>Nothing Scheduled</p>

                :
                    <>

                        { this.state.data.map( (x) =>
                                
                            <div className = 'IndividualDay'>
                                <p>{x.title}</p>
                                <p>{x.category}</p>
                                <p>{x.time}</p>
                                <button>{x.URL}</button>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>

                        )}

                    </>
                }
                
            </div>

        )
    }
}