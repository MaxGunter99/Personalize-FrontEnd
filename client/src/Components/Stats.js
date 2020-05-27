import React from 'react';
import '../css/Jobs.css';
import '../../node_modules/react-vis/dist/style.css';
import { 
    XYPlot, 
    LineSeries, 
    VerticalGridLines, 
    YAxis, 
    XAxis, 
} from 'react-vis';
import WOW from "wow.js";
import Axios from 'axios';

export default class Stats extends React.Component {

    constructor( props ) {
        super( props )
        this.state = {
    
            jobs: [],
            appliedThisWeek: 0,
            appliedToday: 0,
            data: [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 }
            ],

            jobsAppliedToday: props.jobsAppliedToday,
            jobsAppliedThisWeek: props.jobsAppliedThisWeek,
    
        }
    }

    componentDidMount() {

        Axios
            .get('http://localhost:3001/jobs')
            .then(res => {
                this.setState({ jobs: res.data })
                return this.loadStats()
            })
            .catch(err => { console.log('Error in stats getting jobs:', err) })

        new WOW().init()

    }

    // Loads data for activity graph
    loadStats = () => {

        const accepts = []
        const jobsAppliedToday = []
        const jobsAppliedThisWeek = []
        const thisWeekDates = []
        const thisWeeksJobs = []
        const todaysJobs = []

        const today = new Date()
        const Sunday = new Date( today.getTime() - today.getDay() * 24 * 3600 * 1000).toLocaleDateString();
        let curr = new Date( Sunday )

        // Sets the days of the week to the current starting from sunday
        for (let i = 0; i < 7; i++) {

            let first = curr.getDate() - curr.getDay() + i
            let day = new Date(curr.setDate(first)).toLocaleDateString()
            thisWeekDates.push( day )

        }

        for (var i = 0; i < this.state.jobs.length; i++) {

            const reply = this.state.jobs[i].ReplyRecieved
            const applied = this.state.jobs[i].DateApplied

            if ( reply !== '' ) {
                if ( reply.toLowerCase() === 'yes' ) {
                    accepts.push(1)
                }
            }

            const todayStr = new Date()

            // Jobs applied to Today
            if ( Number( applied.split('/')[0] ) === Number( todayStr.toLocaleDateString().split('/')[0] ) 
                && Number( applied.split('/')[1] ) === Number( todayStr.toLocaleDateString().split('/')[1] ) 
                && Number( applied.split('/')[2] ) === Number( todayStr.toLocaleDateString().split('/')[2] )
            ) {

                jobsAppliedToday.push(1)
                todaysJobs.push( this.state.jobs[i] )

            }

            // Finds jobs applied to this past week
            for (var x = 0; x < thisWeekDates.length; x++) {

                if ( thisWeekDates[x] === applied ) {

                    jobsAppliedThisWeek.push(applied)
                    thisWeeksJobs.push( this.state.jobs[i] )

                }

            }

        }

        let xyGraph = []

        console.log( thisWeekDates )

        // Populates graph data with jobs applied this week
        for (var q = 0; q < thisWeekDates.length; q++ ) {

            let count = 0;

            for ( var weekDay in jobsAppliedThisWeek ) {

                const day = jobsAppliedThisWeek[ weekDay ]

                if ( day === thisWeekDates[q] ) {
                    count += 1
                }

            }

            xyGraph.push( { x : q , y : count } )
        }

        console.log( xyGraph )

        this.props.handleJobs( todaysJobs , 'Day' )
        this.props.handleJobs( thisWeeksJobs , 'Week' )

        this.setState({
            replies: accepts.length,
            appliedToday: jobsAppliedToday.length,
            appliedThisWeek: jobsAppliedThisWeek.length,
            jobsAppliedThisWeek: thisWeeksJobs,
            jobsAppliedToday: todaysJobs,
            data: xyGraph
        });

    }

    render() {

        return (

            <div className='Stats'>

                <div>
                    <p>Total: {this.state.jobs.length}</p>
                    {/* <p>{ Math.floor( this.state.replies / this.state.jobs.length * 100 ) }% replied to you. ( { this.state.replies } )</p> */}
                    <p>{ Math.floor( this.state.replies / this.state.jobs.length * 100 ) }% replied</p>
                </div>


                <div>
                    <XYPlot
                        height = { 300 }
                        width = { 300 }
                        xDomain={ [ 0 , 5 ] } 
                        yDomain={ [ 0 , this.state.jobsAppliedThisWeek.length ] }
                        stroke = 'rgb(185, 50, 50)'>

                        {/* <HorizontalGridLines /> */}
                        <VerticalGridLines />
                        <XAxis color = 'red' />
                        <YAxis />
                        <LineSeries
                            style = {{ strokeWidth: 2 }}
                            fill = 'rgb(185, 50, 50)'
                            data={this.state.data} 
                        />

                    </XYPlot>
                </div>

                <div>
                    <p onClick = { () => console.log( this.state.jobsAppliedToday ) }>Today: {this.state.appliedToday}</p>
                    <p onClick = { () => console.log( this.state.jobsAppliedThisWeek ) }>This week: {this.state.appliedThisWeek}</p>
                </div>
            </div>
        )
    }

}