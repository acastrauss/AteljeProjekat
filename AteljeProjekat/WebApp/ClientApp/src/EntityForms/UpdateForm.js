import React from 'react';
import * as EntitiesState from './../EntitiesState';
import * as Enums from './../Enums';
import './../ContentTable.css';

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

            console.log(this.state.data);
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

    }

    render() {

        let inputs = [];
        let iter = 0;
        
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
                        data-inputindx={iter}
                        data-key={key}
                        value={this.state.data[key].Adresa}
                        onChange={this.onInputChange}
                    >
                        {ateljeOpts}
                    </select>
                </div>);

                iter++;

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
                            data-inputindx={iter}
                            data-key={key}
                            value={this.state.data[key]}
                            onChange={this.onInputChange}
                        >
                            {opts}
                        </select>
                    </div>);

                    iter++;
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
                            data-inputindx={iter}
                            data-key={key}
                            value={this.state.data[key]}
                            onChange={this.onInputChange}
                        >
                            {opts}
                        </select>
                    </div>);

                    iter++;
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
                                data-inputindx={iter}
                                data-key={key}
                                onChange={this.onInputChange}
                            />
                        </div>);

                        iter++;
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
                                data-inputindx={iter}
                                data-key={key}
                                onChange={this.onInputChange}

                            />
                        </div>);

                        iter++;
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
                                data-inputindx={iter}
                                data-key={key}
                                onChange={this.onInputChange}

                            />
                        </div>);
                    }

                iter++;
            }

        });

        if(inputs.length > 0)
            inputs.push(<div>
                <button
                    className="loginbtn"
                >
                    Sacuvaj
                    </button>
            </div>)

        return <div>
            {inputs}
        </div>
    }

}