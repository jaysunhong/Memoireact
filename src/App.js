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
    isClicked: false,
    chosenImageValue: "",
    clickedImages: [],
    score: 0,
    highScore: 0,
    clicks: 0
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
      isClicked: false,
      chosenImageValue: "",
      clickedImages: [],
      score: 0,
      highScore: 0,
      clicks: 0
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
                <Col key={item.id} size="sm-3">
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
                        items: newArray,
                        chosenImageValue: item.id,
                        clicks: this.state.clicks + 1,
                        clickedImages: this.state.clickedImages.concat(this.state.chosenImageValue)
                      });

                        console.log(this.state.clickedImages);
                        console.log(this.state.clickedImages.length);

                        if (this.state.clicks > 0) {
                    
                          for (var h=1; h<this.state.clickedImages.length; h++) {

                            if (this.state.clickedImages[h] !== item.id) {

                              this.setState({
                                score: this.state.score + 1,
                              });

                              if (this.state.score >= this.state.highScore) {
                                this.setState({
                                  highScore: this.state.score + 1
                                })
                              }

                            } else if (this.state.clickedImages[h] === item.id) {

                              this.setState({
                                score: 0,
                                clicks: 0,
                                chosenImageValue: "",
                                clickedImages: [],
                              });

                            }
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