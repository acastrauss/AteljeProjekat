import React from 'react';
import download from 'downloadjs';
import './LogIn.css';
import * as LoginCredentials from './LoginCredentials';

var unsubLogin;

export class DownloadCSV extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId
        };

        this.onClick = this.onClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.setId = this.setId.bind(this);
    }

    setId() {
        if (this.state.userId !== -1) {
            let currentId = LoginCredentials.store.getState().userId;

            if (currentId !== -1) {
                this.setState({
                    userId: LoginCredentials.store.getState().userId
                });
            }
            else {
                this.setState({
                    userId: -2
                });
            }
        }
    }

    componentDidMount() {
        unsubLogin = LoginCredentials.store.subscribe(this.setId)
    }

    componentWillUnmount() {
        unsubLogin();
    }

    onClick() {
        let url = this.state.userId === -1 ?
            `api/Log/SistemLog` : `api/Log/UserLog?id=${this.state.userId}`;

        fetch(url)
            .then(response => response.blob())
            .then(data => {
                let fName = String(new Date()) + '.csv';
                if (this.state.userId !== -1)
                    fName = this.state.userId + ' ' + fName;

                download(data, fName);
            });

    }

    render() {
        return <button
            className="loginbtn"
            onClick={this.onClick}
            hidden={LoginCredentials.store.getState().userId === -1}
        >
            {this.state.userId === -1 ? "Sistem log" : "Vas log"}
        </button>
    }
}