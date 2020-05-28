import React, { Component } from 'react';
import Axios from 'axios';
import '../css/Weather.css';

export default class Weather extends Component {

    constructor(props) {
        super(props);

        this.state = {

            weatherData: {
                location: '',
                description: '',
                temp: '',
                ImageURL: '',
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
                    weatherData: {
                        location: res.data.Location,
                        description: res.data.Description,
                        temp: res.data.Temperature,
                        ImageURL: res.data.ImageURL,
                    }

                });

            })
            .catch(err => {
                console.log('ERROR', err)
            })
    }

    render() {
        return (

            <>

                { this.state.weatherData.location !== '' ||
                  this.state.weatherData.description !== '' ||
                  this.state.weatherData.temp !== '' ||
                  this.state.weatherData.ImageURL !== '' ?

                    <div className='Weather'>

                        {this.props.weatherSettings.location === true ?
                            <div>
                                <p>{this.state.weatherData.location}</p>
                            </div>
                        : null}

                        {this.props.weatherSettings.description === true ?
                            <div>
                                <p>{this.state.weatherData.description}</p>
                            </div>
                        : null}

                        {this.props.weatherSettings.ImageURL === true ?
                            <div>
                                <img alt = "WeatherImage" src={this.state.weatherData.ImageURL} style = {{ height: '50px', width: '50px' }} />
                            </div>
                        : null}

                        {this.props.weatherSettings.temp === true ?
                            <div>
                                <p>{this.state.weatherData.temp}</p>
                            </div>
                        : null}

                    </div>

                : null }

            </>

        )
    }
}