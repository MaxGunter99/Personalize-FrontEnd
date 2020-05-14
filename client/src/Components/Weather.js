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
                feelsLike: '',
                sunrise: '',
                sunset: '',
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
            .get('http://api.openweathermap.org/data/2.5/weather?q=Austin&APPID=31d108f3bb32d9ddb53203d1fc57ca6b')
            .then(res => {

                // Kelvin to Fahrenheit
                let currentWeatherInF = (res.data.main.temp - 273.15) * 9 / 5 + 32
                let feelsLikeWeatherInF = (res.data.main.feels_like - 273.15) * 9 / 5 + 32

                // Unix to regular time

                // Sunrise
                let sunriseUnix = res.data.sys.sunrise
                let SRTime = new Date(sunriseUnix * 1000);
                let newSunriseTime = SRTime.toUTCString();
                let sunrise = new Date(newSunriseTime).toLocaleTimeString();

                // Sunset
                let sunsetUnix = res.data.sys.sunset
                let SSTime = new Date(sunsetUnix * 1000);
                let newSunsetTime = SSTime.toUTCString();
                let sunset = new Date(newSunsetTime).toLocaleTimeString();

                this.setState({
                    ...this.state,
                    location: res.data.name,
                    temp: Math.floor(currentWeatherInF),
                    feelsLike: Math.floor(feelsLikeWeatherInF),
                    description: res.data.weather[0].description,
                    sunrise,
                    sunset,
                    descriptionImg: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
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

                        { this.props.weatherSettings.temp === true ? 
                            <div>
                                <p>{this.state.temp}℉</p>
                            </div>
                        : null }

                        { this.props.weatherSettings.feelsLike === true ? 
                            <div>
                                <p> Feels: {this.state.feelsLike}℉</p>
                            </div>
                        : null }

                        { this.props.weatherSettings.sunrise === true ? 
                            <div>
                                <FeatherIcon icon="sunrise" size="20" />
                                <p>{this.state.sunrise}</p>
                            </div>
                        : null }

                        { this.props.weatherSettings.sunset === true ? 
                            <div>
                                <FeatherIcon icon="sunset" size="20" />
                                <p>{this.state.sunset}</p>
                            </div>
                        : null }

                    </div>

                : null }

            </>

        )
    }

}