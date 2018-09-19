import React from 'react';
import "./Modal.css";

const Modal = () => {
    return (
        <div className="modal fade" id="instructions" tabIndex="-1" role="dialog" aria-labelledby="modalPopup" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitle">How to Play</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Welcome to Pokemon Memoireact! This game tests your memorization through clicks. Your objective is to click a different Pokemon with every click. You cannot click
                        a Pokemon that you have previous clicked. 
                        <br></br>
                        <br></br>
                        Try to catch all 12 Pokemon! Good luck!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btnModalClose" data-dismiss="modal">Let's Play!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;