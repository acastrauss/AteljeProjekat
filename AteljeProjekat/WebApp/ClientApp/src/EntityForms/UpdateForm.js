import React from 'react';
import * as EntitiesState from './../EntitiesState';
import * as Enums from './../Enums';
import './../ContentTable.css';

var capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

var unsubChange;

let inputsVals = [];

export class UpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
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

    render() {

        let inputs = [];

        Object.entries(this.state.data).map(([key, value]) => {
            
            if (key.toLowerCase().includes('atelje')) {
                // radi select za atelje
                let ateljeOpts = [];

                EntitiesState.storeAtelje.getState().ateljes.forEach(a => {
                    ateljeOpts.push(<option value={a.Adresa} data-idAtelje={a.id}>
                        {a.Adresa}
                    </option>);
                });

                inputs.push(<div>
                    <label className="labelLogin">Atelje:</label>
                    <select className="input">
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
                        if (e === value) {
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
                            {key}
                        </label>
                        <select className="input">
                            {opts}
                        </select>
                    </div>);
                }
                else if (
                    key.toLowerCase().includes('stil')
                ) {
                    let opts = [];

                    Enums.umetnickiStilEnum.forEach(e => {
                        if (e === value) {
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
                            {key}
                        </label>
                        <select className="input">
                            {opts}
                        </select>
                    </div>);
                }
                else {

                    if (key.toLowerCase().includes('godina')) {
                        
                        let date = new Date(value.split('T')[0]);
                        let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                        console.log(dateStr);

                        inputs.push(<div>
                            <label className="labelLogin">
                                {capitalize(key)}
                            </label>
                            <input
                                type='date'
                                className="input"
                                value={dateStr}
                            />
                        </div>);
                    }
                    else {
                        inputs.push(<div>
                            <label className="labelLogin">
                                {capitalize(key)}
                            </label>
                            <input
                                type='text'
                                className="input"
                                value={value}
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
                                value={value.join('')}
                            />
                        </div>);
                    }
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