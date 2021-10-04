import React from "react";
import { Button, Form } from "react-bootstrap";
import './LogIn.css';
import { sha256 } from "js-sha256";


export class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            usernameBorder : 'black',
            passwordBorder : 'black',
            btnOpacity: 1
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onClick = this.onClick.bind(this);

        let hash = sha256('admin');

        let admin = {
            email: 'admin@admin.com',
            ime: 'Admin',
            korisnickoIme: 'admin',
            lozinkaHash: hash,
            prezime: 'Admin',
            tipKorisnika: 0
        };

        let requestH = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(admin)
        }

        fetch('api/Korisnik/Register', requestH)
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
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
            btnOpacity: this.state.btnOpacity
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
            btnOpacity : this.state.btnOpacity
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

    onClick(){
        // send data to server
    }

    render(){
        return <div className="Login">
            <Form>
                <Form.Group size="lg" controlId="username">
                    <Form.Label className="labelLogin">
                        Korisnicko ime:
                    </Form.Label>
                    <br></br>
                    <Form.Control size='lg' className="input"
                    placeholder="Molimo unesite korisnicko ime"
                    autoFocus
                    type="text"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    style={{
                        borderColor: this.state.usernameBorder
                    }}
                    />
                </Form.Group>

                <Form.Group size="lg" controlId="password">
                    <Form.Label className="labelLogin">
                        Lozinka:
                    </Form.Label>
                    <br></br>
                    <Form.Control size='lg' className="input"
                        placeholder="Molimo unesite lozinku"
                        type="password"
                        onChange={this.onChangePassword}
                        style={{
                            borderColor : this.state.passwordBorder
                        }}
                    />
                </Form.Group>
                <Button size="lg" 
                block type="submit" 
                className="loginbtn"
                disabled={!this.validateForm()}
                style={{
                    opacity: this.state.btnOpacity
                }}
                onClick={this.onClick}
                >
                    Prijava
                </Button>
            </Form>
        </div>
    }
}