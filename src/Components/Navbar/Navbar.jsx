import React, { Component } from 'react';
import "./Navbar.css";
import Modal from "../Modal/Modal";

class Navbar extends Component {

    render() {
        return (
            <nav className="navbarStyle navbar navbar-light">
                <span className="navbar-brand mb-0"><h1 className="navbarTitle">Pokemon Memoireact</h1></span>

                <div id="btnInstructions" data-toggle="modal" data-target="#instructions">
                    How to Play
                </div>

                <Modal />

                <div className="score">
                    Score: {this.props.score} | High Score: {this.props.highScore}
                </div>

                <div id="btnReset" onClick={this.props.onClick}>
                    Catch new Pokemon?
                </div>
            </nav>
        )
    }
};

export default Navbar;