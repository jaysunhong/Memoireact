import React, { Component } from 'react';
import './App.css';
import Container from "./Components/Grid/Container";
import Navbar from "./Components/Navbar/Navbar";
import Row from "./Components/Grid/Row";
import Col from "./Components/Grid/Col";
import Modal from "./Components/Modal/Modal";
import dataArray from "./Data";

class App extends Component {

  state = {
    items: [],
    clickedImages: [],
    score: 0,
    highScore: 0,
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
      items: [],
      clickedImages: [],
      score: 0
    });

    this.getImageData();
  }

  handleClicks = (item) => {
    // shuffle array on click by calling shuffleArray function
    let newArray = this.shuffleArray(this.state.items);
    let chosenImageValue = item;

    this.setState({
      items: newArray,
      clickedImages: this.state.clickedImages.concat(item)
    });

      if (this.state.score === 12) {

        alert("You win!");
        
        this.setState({
          score: 0,
          clickedImages: [],
        });
      }

      // increment state of score by 1 if the item id if the clicked image DOES NOT match the previous clicked items
      if (this.state.clickedImages.indexOf(chosenImageValue) === -1) {

        this.setState({
          score: this.state.score + 1,
        });
      // alert user of loss and set state back to default values if the item id if the clicked image DOES match the previous clicked items
      } else if (this.state.clickedImages.indexOf(chosenImageValue) !== -1) {

        alert("You lose. Try again.");

        this.setState({
          score: 0,
          clickedImages: [],
        });
      } 

      setTimeout (
          function() {
            // run function if score is greater than or equal to the high score
            if (this.state.score >= this.state.highScore) {
              this.setState({
                highScore: this.state.score
              })
            }
          }
        .bind(this),
      0.0001 * 1000);
  }

  // fetchApi = () => {
  //   for (var i=0; i<12; i++) {

  //     let randomCharacterId = this.getRandomInt(1, 802);
  //     let url = `https://pokeapi.co/api/v2/pokemon-form/${randomCharacterId}`;

  //     fetch(url)
  //     .then(res => res.json())
  //     .then((result) => {

  //       let array = this.state.items.concat(result);

  //       this.setState({
  //           items: array
  //       });
  //     }, (error) => {
  //         console.log(error);
  //       }
  //     )  
  //   }
  // }

  getImageData = () => {
    const checkArray = [];

    for (var q=0; q<27; q++) {

      if (checkArray.length === 12) {
        break;
      } else {

        var randomCharacterId = this.getRandomInt(0, 27);

        if (checkArray.indexOf(randomCharacterId) === -1) {

          checkArray.push(randomCharacterId);
          let grabArray = dataArray[randomCharacterId];

          setTimeout (
            function() {
              this.setState({
                items: this.state.items.concat(grabArray)
              })
            }
          .bind(this),
          0.0001 * 1000);
        }
      }
    }
  }

  componentDidMount = () => {
    // this.fetchApi();
    this.getImageData();
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
                <Col 
                  // key={item.id}
                  key={`item${index}`}
                  size="sm-3">
                  <img
                    // key={item.id}
                    key={`item${index}`}
                    id={`item${index}`}
                    // src={item.sprites.front_default}
                    src={item}
                    className="styleImages"
                    // alt={item.sprites.front_default}
                    alt={item}
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