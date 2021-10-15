import React from 'react';
import * as LoginCredentials from './../LoginCredentials';
import { sha256 } from "js-sha256";
import './../LogIn.css';

let arrInput = [
    'ime', 'prezime'
];

let btnOpac = 0.5;
var unsubLogin;
let hiddenUpdate = true;

export class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValues: [
                '',''
            ],
            borderColors: [
                'black','black'
            ],

        };

        this.callUpdate = this.callUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.updateClick = this.updateClick.bind(this);
        this.showUpdate = this.showUpdate.bind(this);
    }

    callUpdate() {
        this.setState({
            inputValues: [
                LoginCredentials.store.getState().ime, LoginCredentials.store.getState().prezime
            ],
            borderColors: this.state.borderColors
        });
    }

    componentDidMount() {
        unsubLogin = LoginCredentials.store.subscribe(this.callUpdate);
        if (LoginCredentials.store.getState().userId !== -1) {
            this.callUpdate();
        }
    }

    componentWillUnmount() {
        unsubLogin();
    }

    onInputChange(e) {

        let indx = e.target.dataset.indx;

        let values = this.state.inputValues;
        values[indx] = e.target.value;

        let colors = this.state.borderColors;

        if (e.target.value) {
            colors[indx] = 'black';
        }
        else {
            colors[indx] = 'red';
        }

        this.setState({
            borderColors: colors,
            inputValues: values,
            btnOpacity: btnOpac
        });
    }

    validateInput() {
        let cond = true;

        for (let i = 0; i < this.state.inputValues.length; i++) {
            cond &= this.state.inputValues[i].length > 0;
        }

        btnOpac = 0.5;

        if (cond) {
            btnOpac = 1;
        }

        return cond;
    }

    showUpdate() {
        hiddenUpdate = !hiddenUpdate;
        this.forceUpdate();
    }

    updateClick() {
        let values = {
            id: LoginCredentials.store.getState().userId,
            email: LoginCredentials.store.getState().email,
            korisnickoIme: LoginCredentials.store.getState().username,
            lozinkaHash: LoginCredentials.store.getState().password,
            ime: this.state.inputValues[0],
            prezime: this.state.inputValues[1],
            tipKorisnika: LoginCredentials.store.getState().userRole
        };

        console.log(values);

        let reqH = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        };

        fetch('api/Korisnik/Update', reqH)
            .then(response => response.json())
            .then(data => {
                if (data !== -1) {
                    
                    let values = {
                        username: LoginCredentials.store.getState().username,
                        password: LoginCredentials.store.getState().password
                    };

                    let requestHeader = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }

                    LoginCredentials.store.dispatch(LoginCredentials.initState);

                    fetch('api/Korisnik/UserId', requestHeader)
                        .then(response => response.json())
                        .then(data => {

                            if (!data) {
                                alert('Server error.');
                                return;
                            }

                            if (data.id != -1) {

                                LoginCredentials.store.dispatch({
                                    type: LoginCredentials.LOGIN_USER,
                                    username: data.korisnickoIme,
                                    userId: data.id,
                                    userRole: data.tipKorisnika,
                                    email: data.email,
                                    ime: data.ime,
                                    prezime: data.prezime,
                                    password: data.lozinkaHash
                                });

                                let storeState = LoginCredentials.store.getState();
                                storeState.type = LoginCredentials.LOGIN_USER;

                                localStorage.setItem('user', JSON.stringify(LoginCredentials.store.getState()));

                                this.forceUpdate();
                            }
                            else {
                                alert('Wrong credentials.');
                            }
                        });
                }
            });
    }


    render() {

        let inputs = [];

        for (let i = 0; i < 2; i++) {

            let type = "text";
            
            let ph = `${arrInput[i]} korisnika`

            inputs.push(
                <div>
                    <label className="labelLogin">
                        {
                           arrInput[i].charAt(0).toUpperCase() + arrInput[i].slice(1) + ':'
                        }
                    </label>
                    <br />
                    <input
                        type={type}
                        className="input"
                        placeholder={ph}
                        data-indx={i}
                        onChange={this.onInputChange}
                        style={{
                            borderColor: this.state.borderColors[i]
                        }}
                        value={this.state.inputValues[i]}
                    />
                    <br />
                </div>
            )
        }

        inputs.push(<div>
            <button
                className="loginbtn"
                onClick={this.updateClick}
                disabled={!this.validateInput()}
                style={{
                    opacity: this.state.btnOpacity
                }}
            >
                Sacuvaj
            </button>
        </div>)

        return <div
            className="Login"
            hidden={LoginCredentials.store.getState().userId === -1}>
            <button
                className="loginbtn"
                onClick={this.showUpdate}
            >
                Izmeni profil
            </button>
            <div hidden={ hiddenUpdate}>
                {inputs}
            </div>
        </div>
    }
}