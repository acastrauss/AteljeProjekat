import React from "react";
import './LogIn.css';
import { sha256 } from "js-sha256";
import { store, initState, LOGIN_USER } from "./LoginCredentials"
import { RegisterForm } from "./RegisterForm";

export class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            usernameBorder : 'black',
            passwordBorder : 'black',
            btnOpacity: 1,
            logged: false,
            showRegister: false
        };

        var unsubscribe = store.subscribe(() => {
            //console.log(store.getState());
        })

        // save user state
        if (sessionStorage.getItem('user') != null) {
            store.dispatch(JSON.parse(sessionStorage.getItem('user')));
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onClick = this.onClick.bind(this);
        this.changeLoginShow = this.changeLoginShow.bind(this);
        this.showRegisterClick = this.showRegisterClick.bind(this);
    }

    componentDidMount() {

    }

    onClick() {

        if (store.getState().userId != -1) {
            store.dispatch(initState);
            sessionStorage.removeItem('user');
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

                    if (!data) {
                        alert('Server error.');
                        return;
                    }

                    if (data.id != -1) {
                        
                        store.dispatch({
                            type: LOGIN_USER,
                            username: data.korisnickoIme,
                            userId: data.id,
                            userRole: data.tipKorisnika,
                            email: data.email,
                            ime: data.ime,
                            prezime: data.prezime,
                            password: data.lozinkaHash
                        });

                        let storeState = store.getState();
                        storeState.type = LOGIN_USER;

                        sessionStorage.setItem('user', JSON.stringify(store.getState()));

                        this.changeLoginShow();
                    }
                    else {
                        alert('Pogresno korisnicko ime/lozinka.');
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
            logged: !this.state.logged,
            showRegister: this.state.showRegister
        });
    }

    showRegisterClick() {
        this.setState({
            password: this.state.password,
            username: this.state.username,
            usernameBorder: this.state.usernameBorder,
            passwordBorder: this.state.passwordBorder,
            btnOpacity: this.state.btnOpacity,
            logged: this.state.logged,
            showRegister: !this.state.showRegister
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

        if (store.getState().userId == -1) {
            logBtn.push(
                <div className="Login" hidden={store.getState().userId != -1}>
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
                <div className="Login" hidden={!store.getState().userId == -1}>
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
            <div hidden={!store.getState().userRole == 0 || store.getState().userId == -1}>
                <div>
                    <button onClick={this.showRegisterClick} className="loginbtn">
                        Registruj korisnika
                    </button>
                </div>
                <div hidden={!this.state.showRegister}>
                    <br/>
                    <RegisterForm />
                </div>
            </div>
        </div>
    }
}