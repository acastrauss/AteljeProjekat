import React from "react";
import './LogIn.css';
import { sha256 } from "js-sha256";
import * as LoginCredentials from './LoginCredentials';

let arrInput = [
    'email', 'korisnicko ime', 'lozinka', 'ime', 'prezime'
];


export class RegisterForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            borderColors: [
                'black', 'black', 'black', 'black', 'black'
            ],
            inputValues: [
                '', '', '', '', ''
            ],
            btnOpacity: 0.5
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.registerClick = this.registerClick.bind(this);
        this.validateInput = this.validateInput.bind(this);
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
            btnOpacity: this.state.btnOpacity
        });
    }

    validateInput() {
        let cond = true;

        for (let i = 0; i < this.state.inputValues.length; i++) {
            cond &= this.state.inputValues[i].length > 0;
        }

        let btnOpac = 0.5;

        if (cond) {
            btnOpac = 1;
        }

        this.state.btnOpacity = btnOpac;

        return cond;
    }

    registerClick() {
        let values = {
            email: this.state.inputValues[0],
            korisnickoIme: this.state.inputValues[1],
            lozinkaHash: sha256(this.state.inputValues[2]),
            ime: this.state.inputValues[3],
            prezime: this.state.inputValues[4],
            tipKorisnika: 1
        };

        let reqH = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            headers: {
                'userId': LoginCredentials.store.getState().userId
            },
            body: JSON.stringify(values)
        };

        fetch('api/Korisnik/Register', reqH)
            .then(response => response.json())
            .then(data => {
                alert('Registered');
            });
    }

    render() {

        let inputs = [];

        for (let i = 0; i < 5; i++) {

            let type = "text";
            if (i == 0)
                type = "email";
            else if (i == 2)
                type = "password";

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
                onClick={this.registerClick}
                disabled={!this.validateInput()}
                style={{
                    opacity: this.state.btnOpacity
                }}
                >
                Dodaj
            </button>
        </div>)

        return <div className="Login">
            {inputs}
        </div>
    };
}