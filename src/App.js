import React, { Component } from 'react';
import './App.css';
import crabImage from './images/crab.jpg';

/* 
  App Component
  - This is a class-based component.
  - It manages the state of a person profile and a visibility toggle.
  - It also tracks the time interval since the component was last mounted.
*/
class App extends Component {
  constructor(props) {
    super(props);
    // Initialize state with person details, visibility flag, last mounted time, and interval
    this.state = {
      person: {
        fullName: "John Doe",
        bio: "A software engineer with 10 years of experience.",
        imgSrc: crabImage, // Use imported image for person's image source
        profession: "Software Engineer"
      },
      shows: false, // Flag to toggle the visibility of the person profile
      lastMounted: Date.now(), // Time when the component was mounted
      interval: 0 // Interval since the component was mounted
    };
  }

  // Lifecycle method called when the component is mounted
  componentDidMount() {
    // Set up an interval to update the interval state every second
    this.intervalID = setInterval(() => this.updateTime(), 1000);
  }

  // Lifecycle method called when the component is about to unmount
  componentWillUnmount() {
    // Clear the interval to prevent memory leaks
    clearInterval(this.intervalID);
  }

  // Method to update the interval state
  updateTime() {
    this.setState({
      interval: Math.floor((Date.now() - this.state.lastMounted) / 1000) // Calculate the interval in seconds
    });
  }

  // Method to toggle the shows state
  toggleShow = () => {
    this.setState({ shows: !this.state.shows });
  };

  // Method to handle image load error
  handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150'; // Fallback URL
  };

  // Render method to display the component
  render() {
    const { person, shows, interval } = this.state; // Destructure state variables
    return (
      <div className="App">
        <header className="App-header">
          {/* Button to toggle the visibility of the person profile */}
          <button onClick={this.toggleShow}>
            {shows ? 'Hide' : 'Show'} Profile
          </button>
          {/* Conditional rendering of the person profile based on the shows state */}
          {shows && (
            <div>
              <img 
                src={person.imgSrc} 
                alt={person.fullName} 
                onError={this.handleImageError} // Handle broken image URL
              />
              <h1>{person.fullName}</h1>
              <p>{person.bio}</p>
              <h2>{person.profession}</h2>
            </div>
          )}
          {/* Display the time interval since the component was mounted */}
          <p>Time since last mounted: {interval} seconds</p>
        </header>
      </div>
    );
  }
}

export default App;
