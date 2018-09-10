import React, { Component } from 'react';
import './App.css';
import Container from "./Components/Grid/Container";
import Navbar from "./Components/Navbar/Navbar";
import superheroKey from "./Keys";
import Row from "./Components/Grid/Row";
import Col from "./Components/Grid/Col";

class App extends Component {

  state = {
    isLoaded: false,
    items: [],
    clicks: 0,
    isClicked: false,
    chosenImageValue: null,
    score: 0,
    highScore: 0
  }

  style = {
    superheroImage: {
      width: "170px",
      height: "200px",
      cursor: "pointer",
      marginTop: "10px"
    }
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  shuffleArray = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  onReset = () => {
    this.setState({
      isLoaded: false,
      items: [],
      clicks: 0,
      isClicked: false,
      chosenImageValue: null,
      score: 0,
    });

    for (var j=0; j<12; j++) {

      let randomCharacterId = this.getRandomInt(1, 731);
      let url = `http://superheroapi.com/api/${superheroKey.access_token}/${randomCharacterId}`;


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
  
  componentDidMount = () => {

    for (var i=0; i<12; i++) {

      let randomCharacterId = this.getRandomInt(1, 731);
      let url = `http://superheroapi.com/api/${superheroKey.access_token}/${randomCharacterId}`;


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
                <Col size="sm-3">
                  <img
                    key={item.id}
                    id={`item${index}`}
                    src={item.image.url}
                    style={this.style.superheroImage}
                    alt={item.image.url}
                    onClick={() => {

                      let newArray = this.shuffleArray(this.state.items);

                      this.setState({
                        isClicked: true,
                        clicks: this.state.clicks + 1,
                        items: newArray,
                        chosenImageValue: item.id
                      });

                      if (this.state.clicks > 0) {

                        if (this.state.chosenImageValue === item.id) {

                          this.setState({
                            score: this.state.score + 1,
                          });

                          if (this.state.score >= this.state.highScore) {
                            this.setState({
                              highScore: this.state.score + 1
                            })
                          }

                        } else {

                          alert("you lose");

                          this.setState({
                            clicks: 0,
                            score: 0,
                            chosenImageValue: null
                          });
                        }
                      }

                    }}
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