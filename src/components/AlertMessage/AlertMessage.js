import React from 'react';
import {CSSTransition} from 'react-transition-group';
import './AlertMessage.css';

function AlertMessage ({alert, closeAlert}) {
  return (
    <CSSTransition classNames='alert' in={alert} timeout={250} unmountOnExit>
      <div className='alert' onClick={closeAlert}>
        <span className='alert-message'>
          Contact already exists!
        </span>
      </div>
    </CSSTransition>
  )
}

export default AlertMessage;