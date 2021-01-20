import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './ContactList.css'

const ContactList = ({ contacts, onRemoveContact}) => (
  <TransitionGroup component='ul' className="ContactList">
    {contacts.map(contact => (
      <CSSTransition key={contact.id} timeout={500} classNames="ContactList-item">
        <div className="ContactList-item">
          <div className="ContactList-text">{contact.name}: {contact.number}</div>
          <button
          type="button"
          className="ContactList-button"
          onClick={() => onRemoveContact(contact.id)}
          >
            Delete
          </button>
        </div>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default ContactList;