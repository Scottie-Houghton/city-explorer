import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: null,
      weatherForecast: [],
      error: false,
      errorMessage: ''
    };
  }

  handleInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      console.log(url);
      let cityInfo = await axios.get(url);
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${cityInfo.data[0].lat}&lon=${cityInfo.data[0].lon}`;
      let weatherData = await axios.get(weatherUrl);
      this.setState({
        cityData: cityInfo.data[0],
        weatherForecast: weatherData.data,
        error: false,
        errorMessage: ''
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`
      });
    }
  };

  render() {

    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>
        <main>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Pick a city: 
                <Form.Control type="text" onInput={this.handleInput}/>
              </Form.Label>
            </Form.Group>
            <Button type="submit">Explore!</Button>
          </Form>
          {this.state.error &&
            <Alert variant="danger">{this.state.errorMessage}</Alert>
          } 
          {this.state.cityData &&
            <Container>
              <ListGroup>Forecast:
                <ListGroup.Item>Date: {this.state.weatherForecast[0].date}</ListGroup.Item>
                <ListGroup.Item>Weather: {this.state.weatherForecast[0].description}</ListGroup.Item>
                <ListGroup.Item>Date: {this.state.weatherForecast[1].date}</ListGroup.Item>
                <ListGroup.Item>Weather: {this.state.weatherForecast[1].description}</ListGroup.Item>
                <ListGroup.Item>Date: {this.state.weatherForecast[2].date}</ListGroup.Item>
                <ListGroup.Item>Weather: {this.state.weatherForecast[2].description}</ListGroup.Item>
                <ListGroup.Item>Date: {this.state.weatherForecast[3].date}</ListGroup.Item>
                <ListGroup.Item>Weather: {this.state.weatherForecast[3].description}</ListGroup.Item>
                <ListGroup.Item>Date: {this.state.weatherForecast[4].date}</ListGroup.Item>
                <ListGroup.Item>Weather: {this.state.weatherForecast[4].description}</ListGroup.Item>
              </ListGroup>
              <ListGroup>City: {this.state.cityData.display_name}
                <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
                <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
              </ListGroup>
              <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt="City Map" />
            </Container>
          }
        </main>
        <footer>Scottie Houghton, 2022</footer>
      </>
    );
  }
}

export default App;