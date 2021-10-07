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
        this.createAtelje = this.createAtelje.bind(this);
    }


    onInputChange(e) {
        let indx = e.target.dataset.indx;
        inputVals[indx] = e.target.value;

        if (e.target.value)
            inputCols[indx] = 'black';
        else
            inputCols[indx] = 'red';

        this.forceUpdate();
    }

    validateInput() {
        let cond = true;

        for (let i = 0; i < 3; i++) {
            cond &= inputVals[i].length > 0;
        }

        btnOpac = (cond ? 1 : 0.5);

        return cond;
    }

    createAtelje() {

        let atelje = {
            adresa: inputVals[0],
            Mmbr: inputVals[1].split(''),
            pib: inputVals[2].split(''),
            m_UmetnickoDelo: [],
            Id: -1
        };

        let reqH = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atelje)
        };

        fetch('api/Atelje/Create', reqH)
            .then(response => response.json())
            .then(data => {
                alert('Added atelje');
            });

        for (let i = 0; i < 3; i++) {
            inputVals[i] = '';
        }

        this.forceUpdate();
    }

    render() {

        let inputs = [];

        inputs.push(
            <div>
                <label className='labelLogin'>
                    Atelje:
                    </label>
            </div>
        );

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
                    disabled={!this.validateInput()}
                    onClick={this.createAtelje}
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