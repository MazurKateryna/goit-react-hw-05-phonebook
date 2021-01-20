import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import ContactEditor from '../components/ContactsEditor/ContactEditor';
import ContactList from '../components/ContactList/ContactList';
import Filter from "./Filter";
import AlertMessage from "./AlertMessage/AlertMessage"
import './App.css'

import PropTypes from 'prop-types';

class App extends Component  {
  static propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
    alert: PropTypes.bool,
  }
  
  state = {
    contacts: [],
    filter: '',
    alert: false,
  };

  componentDidMount() {
    const persistedContact = localStorage.getItem('contacts')
    
    if(persistedContact) {
      this.setState({
        contacts: JSON.parse(persistedContact)
      })
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  addContact = objectContact => {
    this.state.contacts.find(contact => contact.name === objectContact.name)
    ? this.setState((prevState) => ({ alert: true }))
      : this.setState(prevState => {
        return {
          contacts: [
            ...prevState.contacts,
            objectContact],
        } 
      })  
  };

  closeAlert = () => {
    this.setState((prevState) => ({ alert: !prevState.alert }));
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }
    })
  };

  changeFilter = filter => {
    this.setState({ filter});
  };

  getFilterContact = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase()),
      );
  };
 
  render () {
    const {contacts, filter, alert} = this.state;
    const filterContact = this.getFilterContact();
    return (
      <div className='wrapper'>
        <div className='header'>
          <CSSTransition
            in={true}
            appear={true}
            classNames='fade'
            timeout={500}
            unmountOnExit
          >
            <h1 className='logo'>Phonebook</h1>
          </CSSTransition>

          <AlertMessage closeAlert={this.closeAlert} alert={alert}/>
        </div>
        
        <ContactEditor onAddContact={this.addContact}/>
       
        {contacts.length > 0 && (
          <CSSTransition
          in={true}
          appear={true}
          classNames='fade'
          timeout={500}
          unmountOnExit
          >
            <div>
              <h2>Contacts</h2>
              <Filter 
              value={filter} 
              onChangeFilter={this.changeFilter}/>
              <ContactList 
              contacts={filterContact} 
              onRemoveContact={this.removeContact}/>
            </div>
          </CSSTransition>
        )}
      </div>
    )
  };
};

export default App;
