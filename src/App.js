import React, { Component } from 'react';
import './App.css';
import Container from "./Components/Grid/Container";
import Navbar from "./Components/Navbar/Navbar";
import Row from "./Components/Grid/Row";
import Col from "./Components/Grid/Col";

class App extends Component {

  state = {
    isLoaded: false,
    items: [],
    isClicked: false,
    clickedImages: [],
    score: 0,
    highScore: 0,
    clicks: 0
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  shuffleArray = (array) => {
    let m = array.length - 1;
    for (; m > 0; m--) {
      const k = Math.floor(Math.random() * (m + 1));
      const temp = array[m];
      array[m] = array[k];
      array[k] = temp;
    }
    return array;
  }

  onReset = () => {
    this.setState({
      isLoaded: false,
      items: [],
      isClicked: false,
      clickedImages: [],
      score: 0,
      highScore: 0,
      clicks: 0
    });

    for (var i=0; i<12; i++) {

      let randomCharacterId = this.getRandomInt(1, 731);
      let url = `https://pokeapi.co/api/v2/pokemon-form/${randomCharacterId}`;

      fetch(url)
      .then(res => res.json())
      .then((result) => {

        let array = this.state.items.concat(result);

        this.setState({
            isLoaded: true,
            items: array
        });

      }, (error) => {
          console.log(error);
        }
      )  
    }
  }

  handleClicks = (item) => {
    // shuffle array on click by calling shuffleArray function
    let newArray = this.shuffleArray(this.state.items);
    let chosenImageValue = item.id;

    this.setState({
      isClicked: true,
      items: newArray,
      clicks: this.state.clicks + 1,
      clickedImages: this.state.clickedImages.concat(item.id)
    });

      if (this.state.score === 12) {

        alert("You win!");
        
        this.setState({
          score: 0,
          clicks: 0,
          clickedImages: [],
        });
      }

      // run function if score is greater than or equal to the high score
      if (this.state.score >= this.state.highScore) {
        this.setState({
          highScore: this.state.score
        })
      }

      // increment state of score by 1 if the item id if the clicked image DOES NOT match the previous clicked items
      if (this.state.clickedImages.indexOf(chosenImageValue) === -1) {

        this.setState({
          score: this.state.score + 1,
        });
      // alert user of loss and set state back to default values if the item id if the clicked image DOES match the previous clicked items
      } 
      if (this.state.clickedImages.indexOf(chosenImageValue) !== -1) {

        alert("You lose. Try again.");

        this.setState({
          score: 0,
          clicks: 0,
          clickedImages: [],
        });
      } 
      console.log(this.state.clickedImages);
      console.log(chosenImageValue);
  }

  componentDidMount = () => {

    for (var i=0; i<12; i++) {

      let randomCharacterId = this.getRandomInt(1, 731);
      let url = `https://pokeapi.co/api/v2/pokemon-form/${randomCharacterId}`;

      fetch(url)
      .then(res => res.json())
      .then((result) => {

        let array = this.state.items.concat(result);

        this.setState({
            isLoaded: true,
            items: array
        });

      }, (error) => {
          console.log(error);
        }
      )  
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar 
          score={this.state.score}
          highScore={this.state.highScore}
          onClick={this.onReset}
        />
        <Container>
          <Row>
              {this.state.items.map((item, index) => 
                <Col key={item.id} size="sm-3">
                  <img
                    key={item.id}
                    id={`item${index}`}
                    src={item.sprites.front_default}
                    className="styleImages"
                    alt={item.sprites.front_default}
                    onClick={() => this.handleClicks(item)}
                  /> 
                </Col>
              )}
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;