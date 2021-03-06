import React from 'react';
import * as EntitiesState from './../EntitiesState';
import * as Enums from './../Enums';
import './../ContentTable.css';
import { store } from '../LoginCredentials';

var capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

var unsubChange;

let inputsVals = [
    
];


var parseDateStr = (dateStr) => {
    return dateStr.split('T')[0];
}

export class UpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillMount() {
        unsubChange = EntitiesState.storeChange.subscribe(() => {
            this.setState({
                data: EntitiesState.storeChange.getState().entity
            });

        })
    }

    componentWillUnmount() {
        unsubChange();
    }

    onInputChange(e) {
        
        let key = e.target.dataset.key;
        let val = e.target.value;

        this.state.data[key] = val;

        this.forceUpdate();
    }

    onSave() {
        let entity = this.state.data;
        let active = EntitiesState.storeActivate.getState().activate;

        Object.entries(entity).map(([key, value]) => {
            if (key.toLowerCase().includes('pravac') && typeof value === 'string')
                entity[key] = Enums.GetIndxFromPravac(value);

            else if (key.toLowerCase().includes('stil') && typeof value === 'string')
                entity[key] = Enums.GetIndxFromStil(value);

            else if (key.toLowerCase().includes('mbr'))
                if (!Array.isArray(value))
                    entity[key] = value.split('');

            else if (key.toLowerCase().includes('pib'))
                if (!Array.isArray(value))
                    entity[key] = value.split('');
        });

        let reqH = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userId': store.getState().userId
            },
            body: JSON.stringify(entity)
        };

        fetch(`api/${active}/Update`, reqH)
            .then(response => response.json())
            .then(data => {
                if (data)
                    alert('Uspesna izmena');
                else
                    alert('Error');
            });
    }

    render() {

        let inputs = [];
        
        Object.entries(this.state.data).map(([key, value]) => {

            if (key.toLowerCase().includes('atelje')) {
                // radi select za atelje
                let ateljeOpts = [];

                EntitiesState.storeAtelje.getState().ateljes.forEach(a => {
                    if (a.id === this.state.data.idAtelje) {
                        
                        ateljeOpts.push(<option value={a.Adresa} data-idatelje={a.id} selected>
                            {a.Adresa}
                        </option>);
                    }
                    else {

                        ateljeOpts.push(<option value={a.Adresa} data-idatelje={a.id}>
                            {a.Adresa}
                        </option>);
                    }
                });

                inputs.push(<div>
                    <label className="labelLogin">Atelje:</label>
                    <select
                        className="input"
                        data-key={key}
                        value={this.state.data[key].Adresa}
                        onChange={this.onInputChange}
                    >
                        {ateljeOpts}
                    </select>
                </div>);

                return 0;
            };

            if (!(
                    key.toLowerCase().includes('id') ||
                typeof value === 'object'
            )) {

                if (
                    key.toLowerCase().includes('pravac')
                ) {

                    let opts = [];

                    Enums.umetnickiPravacEnum.forEach(e => {
                        if (e == value) {
                            inputsVals.push(e);
                            
                            opts.push(
                                <option value={e} selected>{e}</option>
                            )
                        }
                        else {
                            opts.push(
                                <option value={e}>{e}</option>
                            )
                        }
                    });

                    inputs.push(<div>
                        <label className="labelLogin">
                            {capitalize(key)}
                        </label>
                        <select
                            className="input"
                            data-key={key}
                            value={this.state.data[key]}
                            onChange={this.onInputChange}
                        >
                            {opts}
                        </select>
                    </div>);

                }
                else if (
                    key.toLowerCase().includes('stil')
                ) {
                    let opts = [];

                    Enums.umetnickiStilEnum.forEach(e => {
                        if (e == value) {
                            inputsVals.push(e);

                            opts.push(
                                <option value={e} selected>
                                    {e}
                                </option>
                            )
                        }
                        else {
                            opts.push(
                                <option value={e}>
                                    {e}
                                </option>
                            )
                        }
                    });

                    inputs.push(<div>
                        <label className="labelLogin">
                            {capitalize(key)}
                        </label>
                        <select
                            className="input"
                            data-key={key}
                            value={this.state.data[key]}
                            onChange={this.onInputChange}
                        >
                            {opts}
                        </select>
                    </div>);

                }
                else {

                    if (key.toLowerCase().includes('godina')) {
                        
                        let date = new Date(value.split('T')[0]);
                        let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

                        inputsVals.push(dateStr);

                        inputs.push(<div>
                            <label className="labelLogin">
                                {capitalize(key)}
                            </label>
                            <input
                                type='date'
                                className="input"
                                value={parseDateStr(this.state.data[key])}
                                data-key={key}
                                onChange={this.onInputChange}
                            />
                        </div>);

                    }
                    else {

                        inputsVals.push(value);

                        inputs.push(<div>
                            <label className="labelLogin">
                                {capitalize(key)}
                            </label>
                            <input
                                type='text'
                                className="input"
                                value={this.state.data[key]}
                                data-key={key}
                                onChange={this.onInputChange}

                            />
                        </div>);

                    }
                }
            }
            else if (Array.isArray(value)) {
                if (value.length > 0)
                    if (typeof value[0] === 'string') {
                        
                        inputs.push(<div>
                            <label className="labelLogin">
                                {capitalize(key)}
                            </label>
                            <input
                                type='text'
                                className="input"
                                value={this.state.data[key].join('')}
                                data-key={key}
                                onChange={this.onInputChange}

                            />
                        </div>);
                    }
            }

        });

        if(inputs.length > 0)
            inputs.push(<div>
                <button
                    className="loginbtn"
                    onClick={this.onSave}
                >
                    Sacuvaj
                    </button>
            </div>)

        return <div>
            {inputs}
        </div>
    }

}