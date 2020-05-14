
import React from 'react';
import '../css/Home.css';
import axios from 'axios';
import styled from 'styled-components';

class Home extends React.Component {

    state = {
    
        nasa: []
    
    }

    componentDidMount = () => {

        axios.get( 'https://api.nasa.gov/planetary/apod?api_key=Md4N6JumVhhSG9qJdeQEG550QIyCUDDy0kgjWiaj' )
        .then( res => {
            this.setState({ nasa: res.data })
            console.log( res.data )
        })
        .catch( err => 
            console.log( 'ERROR:' , err )    
        )

    }

    render() {

        // STYLED COMPONENTS

        const BackgroundImage = styled.div`

            background-color: rgb(0, 0, 0);
            min-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-top: 3px solid black;
            background-size: 100%;
            background-position: center center;
            background-attachment: fixed;
            padding-top: 65px;

        `;

        const InformationContainer = styled.div`

            margin-top: 75vh;
            display: flex;
            flex-direction: column;
            color: white;

        `;

        const Title = styled.h1`

            align-self: flex-start;
            margin-left: 20px;
            border: 4px solid white;
            padding-left: 10px;
            padding-right: 10px;

        `;

        const Info = styled.p`

            background-color: rgba(0, 0, 0, 0.671);
            padding: 20px;
            border-radius: 10px 10px 0px 0px;
            width: 80%;
            margin: 0 auto;

        `;

        return (

            <BackgroundImage style = { { 'backgroundImage': `url(${this.state.nasa.hdurl})` } }>

                <InformationContainer>

                    <Title>{ this.state.nasa.title }</Title>
                    <Info>{ this.state.nasa.explanation }</Info>

                </InformationContainer>

            </BackgroundImage>

        )
    };

};

export default Home;