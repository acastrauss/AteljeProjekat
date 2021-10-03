import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import { LogIn } from './LogIn';
import { ContentTable } from './ContentTable';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div className="App">
            <header className="App-header">
                <LogIn />
                <br />
                <div className="tableDiv">
                    <ContentTable></ContentTable>
                </div>
            </header>
        </div>
    );
  }
}
