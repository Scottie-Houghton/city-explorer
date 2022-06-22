import React from 'react';
import axios from 'axios';
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
      let cityInfo = await axios.get(url);
      this.setState({
        cityData: cityInfo.data[0],
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
          <form onSubmit={this.handleSubmit}>
            <label>Pick a city: 
              <input type="text" onInput={this.handleInput}/>
            </label>
            <button type="submit">Explore!</button>
          </form>
          {this.state.error &&
            <Alert variant="danger">{this.state.errorMessage}</Alert>
          } 
          {this.state.cityData &&
            <Container>
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