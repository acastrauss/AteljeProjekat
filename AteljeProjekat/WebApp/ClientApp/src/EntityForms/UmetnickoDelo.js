import React from 'react'
import { umetnickiPravacEnum, umetnickiStilEnum, GetIndxFromPravac, GetIndxFromStil } from "./../Enums";
import * as EntitiesState from './../EntitiesState';

let arrInputs = [
    'naziv', 'pravac', 'stil', 'atelje', 'autor'
];

let inputCols = [
    'black', 'black', 'black', 'black', 'black'
];

let inputVals = [
    '', '', '', '', ''
];

let autors = [];
let ateljes = [];

let btnOpac = 0.5;

var unsubAutor;
var unsubAtelje;

let autorIndx = -1;
let ateljeIndx = -1;

export class UmetnickoDeloForm extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChangeAutor = this.onChangeAutor.bind(this);
        this.onChangeNaziv = this.onChangeNaziv.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.ateljeSelect = this.ateljeSelect.bind(this);

        inputVals[1] = umetnickiPravacEnum[0];
        inputVals[2] = umetnickiStilEnum[0];
    }

    componentDidMount() {
        unsubAutor = EntitiesState.storeAutor.subscribe(() => {
            autors = EntitiesState.storeAutor.getState().autors;

            this.forceUpdate();

            if (autorIndx === -1) {
                autorIndx = autors[0].id;
            }
        });

        unsubAtelje = EntitiesState.storeAtelje.subscribe(() => {
            ateljes = EntitiesState.storeAtelje.getState().ateljes;
            this.forceUpdate();

            if (ateljeIndx === -1) {
                ateljeIndx = ateljes[0].id;
            }
        });
    }

    componentWillUnmount() {
        unsubAtelje();
        unsubAutor();
    }

    onChangeNaziv(e) {
        inputVals[0] = e.target.value;

        inputCols[0] = e.target.value ? 'black' : 'red';

        this.forceUpdate();
    }

    onChangeAutor(e) {
        
        let i = e.target.selectedIndex;

        autorIndx = autors[i].id;

        inputVals[1] = umetnickiPravacEnum[autors[i].umetnickiPravac];

        this.forceUpdate();
    }

    validateInput() {
        let cond = inputVals[0].length > 0;

        btnOpac = cond ? 1 : 0.5;

        return cond;
    }

    createUD() {

        
        let ud = {
            Naziv: inputVals[0],
            Pravac: GetIndxFromPravac(inputVals[1]),
            Stil: GetIndxFromStil(inputVals[2]),
            IdAtelje: ateljeIndx,
            IdUmetnik: autorIndx
        };

        let reqH = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ud)
        };

        console.log(ud);

        fetch('api/UmetnickoDelo/Create', reqH)
            .then(response => response.json())
            .then(data => {
                if (data)
                    alert('Added delo');
                else
                    alert('Error');
            });
    }

    ateljeSelect(e) {
        let i = e.target.selectedIndex;
        ateljeIndx = ateljes[i].id;
    }

    render() {

        let inputs = [];

        inputs.push(<div>
            <label className='labelLogin'>
                Umetnicko delo:
            </label>
        </div>);

        let capitalInpt = arrInputs[0].charAt(0).toUpperCase() + arrInputs[0].slice(1);

        inputs.push(<div>
            <label className='labelLogin'>
                {capitalInpt + ':'}
            </label>
            <br />
            <input
                type='text'
                className='input'
                placeholder={`${capitalInpt} dela:`}
                onChange={this.onChangeNaziv}
                data-indx={0}
                style={{
                    borderColor: inputCols[0]
                }}
                value={inputVals[0]}
            />
            <br/>
        </div>);

        ////
        let selStil = [];
        capitalInpt = arrInputs[1].charAt(0).toUpperCase() + arrInputs[1].slice(1);


        for (let i = 0; i < umetnickiStilEnum.length; i++) {
            selStil.push(<option value={umetnickiStilEnum[i]}>
                {umetnickiStilEnum[i]}
            </option>);
        }

        inputs.push(<div>
            <label className='labelLogin'>
                {capitalInpt + ':'}
            </label>
            <br />
            <select
                className="input"
                data-indx={1}
                style={{
                    borderColor:inputCols[1]
                }}
            >
                {selStil}
            </select>
            <br/>
        </div>)

        ////
        let selPravac = [];

        capitalInpt = arrInputs[2].charAt(0).toUpperCase() + arrInputs[2].slice(1);

        for (let i = 0; i < umetnickiPravacEnum.length; i++) {
            selPravac.push(<option value={ umetnickiPravacEnum[i]}>
                {umetnickiPravacEnum[i]}
            </option>)
        }

        inputs.push(<div>
            <label className='labelLogin'>
                {capitalInpt}
            </label>
            <br />
            <select
                className='input'
                data-indx={2}
                style={{
                    borderColor: inputCols[2]
                }}
                value={inputVals[2]}

            >
                {selPravac}
            </select>
            <br />
        </div>)

        let autorsOpt = [];

        for (let i = 0; i < autors.length; i++) {
            
            let ime = `${autors[i].Ime} ${autors[i].Prezime}`;
            
            autorsOpt.push(
                <option value={ime} data-id={autors[i].id} data-indx={i}            
                >
                    {ime}
                </option>
            )
        }

        inputs.push(<div>
            <label className='labelLogin'>
                Autor:
            </label>
            <br />
            <select
                className='input'
                data-indx={3}
                style={{
                    borderColor: inputCols[3]
                }}
                onChange={this.onChangeAutor}
            >
                {autorsOpt}
            </select>
            <br />
        </div>);

        let ateljesOpt = [];

        for (let i = 0; i < ateljes.length; i++) {
            
            let adresa = ateljes[i].Adresa;

            ateljesOpt.push(
                <option
                    val={adresa}
                    data-id={ateljes[i].id}>
                    {adresa}
                </option>
            )
        }

        inputs.push(<div>
            <label className='labelLogin'>
                Atelje:
            </label>
            <br />
            <select
                className='input'
                data-indx={4}
                style={{
                    borderColor: inputCols[4]
                }}
                onChange={this.ateljeSelect}
            >
                {ateljesOpt}
            </select>
            <br />
        </div>);

        inputs.push(
            <div>
                <button
                    className="loginbtn"
                    style={{
                        opacity: btnOpac
                    }}
                    disabled={!this.validateInput()}
                    onClick={this.createUD}
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