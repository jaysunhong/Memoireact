import React, { Component } from 'react';

class Navbar extends Component {

    style = {
        navbarBackground: {
            backgroundColor: "lightblue"
        },
        navbarTitle: {
            fontFamily: "'Ubuntu', 'sans-serif'"
        },
        reset: {
            cursor: "pointer"
        }
    }

    render() {
        return (
            <nav style={this.style.navbarBackground} className="navbar navbar-light">
                <span className="navbar-brand mb-0"><h1>Superhero Memoireact</h1></span>
                <div className="score">
                    Score: {this.props.score} | High Score: {this.props.highScore}
                </div>
                <div style={this.style.reset} onClick={this.props.onClick}>
                    Call in new Superheroes!
                </div>
            </nav>
        )
    }
    
};

export default Navbar;