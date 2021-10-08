import React from 'react'
import { umetnickiPravacEnum, umetnickiStilEnum } from "./../Enums";

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

export class UmetnickoDeloForm extends React.Component {
    constructor(props) {
        super(props);

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
                    borderColor:inputCols[2]
                }}
            >
                {selPravac}
            </select>
            <br />
        </div>)

        return <div>
            {inputs}
        </div>

    }
}