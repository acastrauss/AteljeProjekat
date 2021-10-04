import React from "react";
import { Button, Form } from "react-bootstrap";
import './LogIn.css';
import { sha256 } from "js-sha256";
import { LoginCredentials } from "./LoginCredentials"

export class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            usernameBorder : 'black',
            passwordBorder : 'black',
            btnOpacity: 1,
            logged: false
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onClick = this.onClick.bind(this);
        this.changeLoginShow = this.changeLoginShow.bind(this);

        //let hash = sha256('admin');

        //let admin = {
        //    email: 'admin@admin.com',
        //    ime: 'Admin',
        //    korisnickoIme: 'admin',
        //    lozinkaHash: hash,
        //    prezime: 'Admin',
        //    tipKorisnika: 0
        //};

        //let requestH = {
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify(admin)
        //}

        //fetch('api/Korisnik/Register', requestH)
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log(JSON.stringify(data));
        //    });
    }


    onClick() {
        if (this.state.logged) {
            LoginCredentials.ResetCredentials();
            this.changeLoginShow();
        }
        else {
            let values = {
                username: this.state.username,
                password: sha256(this.state.password)
            };

            let requestHeader = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }

            fetch('api/Korisnik/UserId', requestHeader)
                .then(response => response.json())
                .then(data => {
                    if (data != -1) {
                        alert('You logged in. Your ID:' + data);
                        LoginCredentials.username = this.state.username;
                        LoginCredentials.passwordHash = this.state.password;
                        LoginCredentials.userId = data;
                        this.changeLoginShow();
                    }
                    else {
                        alert('Wrong credentials.');
                    }
                });
        }
    }

    changeLoginShow() {
        this.setState({
            password: "",
            username: "",
            usernameBorder: this.state.usernameBorder,
            passwordBorder: this.state.passwordBorder,
            btnOpacity: this.state.btnOpacity,
            logged: !this.state.logged
        });
    }

    onChangeUsername(e){
        let col = 'black';

        if(e.target.value.length === 0)
            col = 'red';

        this.setState({
            password : this.state.password,
            username : e.target.value,
            usernameBorder : col,
            passwordBorder : this.state.passwordBorder,
            btnOpacity: this.state.btnOpacity,
            logged: this.state.logged
        });
    }

    onChangePassword(e){
        let col = 'black';

        if(e.target.value.length === 0)
            col = 'red';

        this.setState({
            password : e.target.value,
            username : this.state.username,
            usernameBorder : this.state.usernameBorder,
            passwordBorder : col,
            btnOpacity : this.state.btnOpacity,
            logged: this.state.logged
        });
    }

    validateForm(){
        let cond = this.state.username.length > 0 && 
        this.state.password.length > 0; 

        if(cond)
            this.state.btnOpacity = 1;
        else 
            this.state.btnOpacity = 0.5;

        return cond; 
    }

    render() {

        let logBtn = [];

        if (!this.state.logged) {
            logBtn.push(
                <div className="Login" hidden={this.state.logged}>
                    <label className="labelLogin">Korisnicko ime</label>
                    <br />
                    <input
                        className="input"
                        placeholder="Molimo unesite korisnicko ime"
                        autoFocus
                        type="text"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        style={{
                            borderColor: this.state.usernameBorder
                        }}
                    />
                    <br />

                    <label>Lozinka:</label>
                    <br />
                    <input
                        className="input"
                        placeholder="Molimo unesite lozinku"
                        type="password"
                        onChange={this.onChangePassword}
                        style={{
                            borderColor: this.state.passwordBorder
                        }}
                    />
                    <br />
                    <button
                        block
                        className="loginbtn"
                        disabled={!this.validateForm()}
                        style={{
                            opacity: this.state.btnOpacity
                        }}
                        onClick={this.onClick}
                    >
                        Prijava
            </button>
                </div>
            )
        }
        else {
            logBtn.push(
                <div className="Login" hidden={!this.state.logged}>
                    <button
                        block
                        className="loginbtn"
                        style={{
                            opacity: this.state.btnOpacity
                        }}
                        onClick={this.onClick}
                    >
                        Odjava
                    </button>
                </div >
            );
        }

        return <div>
            {logBtn}
        </div>
    }
}