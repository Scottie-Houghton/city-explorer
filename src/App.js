import React from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,

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
      console.log(cityInfo);
      this.setState({
        cityData: cityInfo.data[0]
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: 'An Error Occurred: {error.response.status}'
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
          <ListGroup>City: {this.state.cityData.display_name}
            <ListGroup>Latitude: {this.state.cityData.lat}</ListGroup>
            <ListGroup>Longitude: {this.state.cityData.lon}</ListGroup>
          </ListGroup>
          <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt="City Map" />
        </main>
        <footer>Scottie Houghton, 2022</footer>
      </>
    );
  }
}

export default App;

// https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=12