import React from 'react';

let arrInput = [
    'adresa', 'mbr', 'pib'
];

let inputCols = [
    'black', 'black', 'black'
];

let inputVals = [
    '', '', ''
];

let btnOpac = 0.5;

export class AteljeForm extends React.Component {
    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
    }


    onInputChange() {

    }

    render() {

        let inputs = [];

        for (let i = 0; i < 3; i++) {

            let capitalLabel = arrInput[i].charAt(0).toUpperCase() + arrInput[i].slice(1);

            inputs.push(
                <div>
                    <label className='labelLogin'>
                        {
                            capitalLabel + ':'
                        }
                    </label>
                    <br />
                    <input
                        type='text'
                        className='input'
                        placeholder={`${capitalLabel} ateljea:`}
                        data-indx={i}
                        onChange={this.onInputChange}
                        style={{
                            borderColor: inputCols[i]
                        }}
                        value={inputVals[i]}
                    />
                    <br/>
                </div>
            )
        }

        inputs.push(
            <div>
                <button
                    className="loginbtn"
                    style={{
                        opacity: btnOpac
                    }}
                >
                    Dodaj
            </button>
            </div>
        )

        return <div>
            {inputs}
        </div>
    }
}