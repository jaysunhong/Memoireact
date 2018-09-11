import React, { Component } from 'react';
import "./Navbar.css";

class Navbar extends Component {

    render() {
        return (
            <nav className="navbarStyle navbar navbar-light">
                <span className="navbar-brand mb-0"><h1 className="navbarTitle">Superhero Memoireact</h1></span>
                <div className="score">
                    Score: {this.props.score} | High Score: {this.props.highScore}
                </div>
                <div id="btnReset" onClick={this.props.onClick}>
                    Call in new Superheroes!
                </div>
            </nav>
        )
    }
};

export default Navbar;