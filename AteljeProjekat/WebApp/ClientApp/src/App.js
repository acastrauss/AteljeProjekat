import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import { LogIn } from './LogIn';
import { ContentTable } from './ContentTable';

import './custom.css';
import './Grid.css';
import { EntityFormContainer } from './EntityFormContainer';
import { Details } from './Details';
import { UpdateForm } from './EntityForms/UpdateForm';
import { Commands } from './Commands';
import * as LoginCredentials from './LoginCredentials';
import { UpdateUser } from './EntityForms/UserForm';

var unsubLogin;

export default class App extends Component {
  static displayName = App.name;
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }


    componentDidMount() {
        LoginCredentials.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        unsubLogin();
    }

  render () {
    return (
        <div className="App">
            <header className="App-header">
                <div className='grid-container'>
                    <div className='grid-login'>
                        <LogIn />
                    </div>
                    <div className='grid-updateUser'>
                        <UpdateUser/>
                    </div>
                    <div
                        className='grid-contentTable'
                        hidden={LoginCredentials.store.getState().userId == -1}
                    >
                        <div
                            className="tableDiv"
                            hidden={LoginCredentials.store.getState().userId == -1}
                        >
                            <ContentTable></ContentTable>
                        </div>
                    </div>
                    <div
                        className='grid-entityFormContainer'
                        hidden={LoginCredentials.store.getState().userId == -1}
                    >
                        <EntityFormContainer>
                        </EntityFormContainer>
                    </div>
                    <div
                        className='grid-details'
                        hidden={LoginCredentials.store.getState().userId == -1}
                    >
                        <Details />
                    </div>
                    <div
                        className='grid-update'
                        hidden={LoginCredentials.store.getState().userId == -1}
                    >
                        <UpdateForm data={new Object()} />
                    </div>
                    <div
                        className='grid-commands'
                        hidden={LoginCredentials.store.getState().userId == -1}
                    >
                        <Commands />
                    </div>
                    
                </div>
            </header>
        </div>
    );
  }
}
