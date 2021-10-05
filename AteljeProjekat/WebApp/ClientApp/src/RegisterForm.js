import React from "react";
import './LogIn.css';
import { sha256 } from "js-sha256";

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
                '','','','',''
            ]
        }
    }

    onInputChange(e) {

    }

    render() {

        let inputs = [];

        for (let i = 0; i < 5; i++) {

            let type = "text";
            if (i == 0)
                type = "email";
            else if (i == 1)
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

        return <div className="Login">
            {inputs}
        </div>
    };
}