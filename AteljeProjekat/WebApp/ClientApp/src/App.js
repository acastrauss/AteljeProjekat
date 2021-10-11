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


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div className="App">
            <header className="App-header">
                <div className='grid-container'>
                    <div className='grid-login'>
                        <LogIn />
                    </div>
                    <div className='grid-contentTable'>
                        <div className="tableDiv">
                            <ContentTable></ContentTable>
                        </div>
                    </div>
                    <div className='grid-entityFormContainer'>
                        <EntityFormContainer>
                        </EntityFormContainer>
                    </div>
                    <div className='grid-details'>
                        <Details/>
                    </div>
                    <div className='grid-update'>
                        <UpdateForm data={new Object() }/>
                    </div>
                    <div className='grid-commands'>
                        <Commands />
                    </div>
                </div>
            </header>
        </div>
    );
  }
}
