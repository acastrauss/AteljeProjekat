import React from 'react';
import './ContentTable.css';


let commands = [];

export class Commands extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
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



    componentWillUnmount() {
        clearInterval(this.updateResults);
    }

    render() {
        let commandsRender = [];

        console.log(commands);

        commands.forEach(c => {
            commandsRender.push(<tr>
                <td>
                    {c.commandType}    
                </td>
            </tr>);
        });

        let header = [];

        if (commandsRender.length > 0) {
            header.push(
                <tr>
                    <td>
                        <button
                            className="tableBtn">
                            Undo
                        </button>
                    </td>
                    <td>
                        <button
                            className="tableBtn">
                            Redo
                        </button>
                    </td>
                </tr>);
        }

        return <table
            className="contentTable">
            {header}
            {commandsRender}
        </table>
    }
}