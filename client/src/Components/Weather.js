import React, { Component } from 'react';
import '../css/Weather.css';
import FeatherIcon from 'feather-icons-react';
import Axios from 'axios';

export default class Weather extends Component {

    constructor(props) {
        super(props);

        this.state = {

            weather: props.weather,

            weatherData: {
                location: '',
                description: '',
                temp: '',
            },

            weatherSettings: {

                location: props.weatherSettings.location,
                description: props.weatherSettings.description,
                temp: props.weatherSettings.temp,
                feelsLike: props.weatherSettings.feelsLike,
                sunrise: props.weatherSettings.sunrise,
                sunset: props.weatherSettings.sunset
        
            }

        }
    }

    componentDidMount() {

        Axios
            .get('http://localhost:3001/weather')
            .then(res => {

                this.setState({
                    ...this.state,
                    location: res.data.Location,
                    description: res.data.Description,
                    temp: res.data.Temperature,
                    ImageURL: res.data.ImageURL,

                });

            })
            .catch(err => {
                console.log('ERROR', err)
            })
    }

    render() {
        return (

            <>

                { this.props.weather === true ?

                    <div className='Weather'>

                        { this.props.weatherSettings.location === true ? 
                            <div>
                                <p><FeatherIcon icon="map-pin" size="24" /> {this.state.location}</p>
                            </div>
                        : null }

                        { this.props.weatherSettings.description === true ? 
                            <div>
                                <p>{this.state.description}</p>
                            </div>
                        : null }

                        { this.props.weatherSettings.ImageURL === true ? 
                            <div>
                                <img src = { this.state.ImageURL } />
                            </div>
                        : null }

                        { this.props.weatherSettings.temp === true ? 
                            <div>
                                <p>{this.state.temp}</p>
                            </div>
                        : null }

                    </div>

                : null }

            </>

        )
    }

}