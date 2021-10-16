import React from 'react';
import './ContentTable.css';
import { store } from './LoginCredentials';

let commandsEnum = [
    'Dodat Atelje', 'Procitan Atelje', 'Promenjen Atelje', 'Obrisan Atelje'
];

let commands = [];

export class Commands extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
    }

    componentDidMount() {
        this.updateResults = setInterval(() => {
            fetch('api/Atelje/GetCommands').
                then(response => response.json())
                .then(data => {
                    commands = [...data];
                    this.forceUpdate();
                });
        }, 3000);
    }

    undo(type) {

        let reqH = {
            headers: {
                'userId': store.getState().userId
            }
        };

        fetch(`api/Atelje/Undo`, reqH)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    commands.splice(commands.length - 1, 1);
                    this.forceUpdate();
                }
                else
                    alert('Greska.');
            });
    }

    redo(type) {

        let reqH = {
            headers: {
                'userId': store.getState().userId
            }
        };

        fetch(`api/Atelje/Redo`, reqH)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    commands.splice(commands.length - 1, 1);
                    this.forceUpdate();
                }
                else
                    alert('Greska.');
            });
    }

    componentWillUnmount() {
        clearInterval(this.updateResults);
    }

    render() {
        let commandsRender = [];

        commands.forEach(c => {
            commandsRender.push(<tr>
                <td>
                    {commandsEnum[c.commandType]}    
                </td>
            </tr>);
        });

        let header = [];

            header.push(
                <tr>
                    <td>
                        <button
                            className="tableBtn"
                            onClick={this.undo}
                        >
                            Undo
                        </button>
                    </td>
                    <td>
                        <button
                            className="tableBtn"
                            onClick={this.redo}
                        >
                            Redo
                        </button>
                    </td>
                </tr>);
        

        return <table
            className="commandTable"
            >
            {header}
            {commandsRender}
        </table>
    }
}