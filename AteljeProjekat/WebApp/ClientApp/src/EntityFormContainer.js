import React from 'react';
import './LogIn.css';
import { store } from "./LoginCredentials";
import { entityStore, initStateEntity, SHOW_FORM, HIDE_FORM } from "./EntityFormState";
import { AteljeForm } from "./EntityForms/AteljeForm";
import { AutorForm } from './EntityForms/AutorForm';
import { UmetnickoDeloForm } from './EntityForms/UmetnickoDelo';

export class EntityFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAtelje: false,
            showUmetnickoDelo: false,
            showAutor: false
        };

        this.onClickShow = this.onClickShow.bind(this);
        this.onClickFormAtelje = this.onClickFormAtelje.bind(this);
        this.onClickFormAutor = this.onClickFormAutor.bind(this);
        this.onClikFormUD = this.onClikFormUD.bind(this);
    }


    onClickShow() {
        console.log('clicked');

        let shown = entityStore.getState().show;

        let type = shown ? HIDE_FORM : SHOW_FORM;

        entityStore.dispatch({
            type: type,
            show: !shown
        })

        this.forceUpdate();
    }

    onClickFormAtelje() {
        this.setState({
            showAtelje: !this.state.showAtelje,
            showUmetnickoDelo: false,
            showAutor: false
        });
    }

    onClickFormAutor() {
        this.setState({
            showAtelje: false,
            showUmetnickoDelo: false,
            showAutor: !this.state.showAutor
        });
    }

    onClikFormUD() {
        this.setState({
            showAtelje: false,
            showUmetnickoDelo:!this.state.showUmetnickoDelo,
            showAutor: false
        });
    }

    render() {
        return <div>
            <button
                className='loginbtn'
                onClick={this.onClickShow}
            >
                Dodaj entitete   
            </button>
            <br/>
            <br />

            <div hidden={!entityStore.getState().show}>
                <button className='loginbtn' onClick={ this.onClickFormAtelje}>
                    Dodaj atelje
                </button>
                <br />

                <button className='loginbtn' onClick={ this.onClikFormUD}>
                    Dodaj umetnicko delo
                </button>
                <br />

                <button className='loginbtn' onClick={this.onClickFormAutor}>
                    Dodaj autora
                </button>
                <br />
                <div hidden={!this.state.showAtelje}>
                    <AteljeForm />
                </div>
                <div hidden={!this.state.showAutor}>
                    <AutorForm />
                </div>
                <div hidden={!this.state.showUmetnickoDelo}>
                    <UmetnickoDeloForm/>
                </div>
            </div>        
        </div>
    }
}