import React from 'react'
import contacts from '../../contacts.json';


export default class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first5: contacts.slice(0,5)
        };    
    }

    showContacts() {
        return this.state.first5.map((theContact,index) => {
            return (
                <tr key={index}>
                    <td>
                        <img src={theContact.pictureUrl} alt='the pic' width='70px'/>
                    </td>
                    <td>{theContact.name}</td>
                    <td>{theContact.popularity.toFixed(2)}</td>
                    <td onClick={() => this.deleteContact(index)}><button>Delete</button></td>
                </tr>
            )
        })
    }

    randomContact() {
        const newContact = contacts[Math.floor(Math.random() * contacts.length)]
        const contactCopy = [...this.state.first5];
        contactCopy.push(newContact);
        this.setState({
            first5: contactCopy
        })
    }

    sortContacts(field) {
        let compareFunction;
        if(field === 'name') {
            compareFunction = (a, b) => (a.name > b.name ? 1 : -1 );
        }else if (field === 'popularity') {
            compareFunction = (a, b) => b.popularity - a.popularity;
        }
        this.setState({
            first5: this.state.first5.slice().sort(compareFunction)
        })
    }

    deleteContact(toDeleteIndex) {
        const contactCopy = [...this.state.first5];
        contactCopy.splice(toDeleteIndex,1);
        this.setState({
            first5: contactCopy
        })
    }

    render() {
        return (
            <div>
                <h1>IronContacts</h1>
                <button onClick={() => this.randomContact()}>Add Random Contact</button>
                <button onClick={() => this.sortContacts('name')}>Sort Contacts by Name</button>
                <button onClick={() => this.sortContacts('popularity')}>Sort Contacts by Popularity</button>
                <div>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Popularity</th>
                        <th>Action</th>
                    </tr>
                    {this.showContacts()}
                </div>
                
            </div>
        )
    }
}
