import React from 'react';
import { store } from '../LoginCredentials';
import { umetnickiPravacEnum } from "./../Enums";

let arrInput = [
    'godina rodjenja', 'godina smrti', 'ime', 'prezime', 'umetnicki pravac'
];

let inputCols = [
	'black', ' black', 'black', 'black', 'black'
];

let inputVals = [
	'','','','',''
];

let btnOpac = 0.5;

let getType = (indx) => {
	if (indx == 0 || indx == 1)
		return 'date';
	else if (indx == 2 || indx == 3)
		return 'text';
}

export class AutorForm extends React.Component {
	constructor(props) {
		super(props);

		this.createAutor = this.createAutor.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.validateInput = this.validateInput.bind(this);
	}

	onInputChange(e) {
		let i = e.target.dataset.indx;
		inputVals[i] = e.target.value;

		inputCols[i] = e.target.value ? 'black' : 'red';

		this.forceUpdate();
    }

	validateInput() {
		let cond = true;

        for (let i = 0; i < 5; i++) {
			if (typeof inputVals[i] == 'string') {
				cond &= inputVals[i].length > 0;
			}
			else {
				cond &= inputVals[i] !== undefined;
            }
		}

		btnOpac = (cond ? 1 : 0.5);

		return cond;
    }

	createAutor() {
		let autor = {
			godinaRodjenja: inputVals[0],
			godinaSmrti: inputVals[1],
			ime: inputVals[2],
			prezime: inputVals[3],
			umetnickiPravac: inputVals[4]
		};

		let reqH = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			headers: {
				'userId': store.getState().userId
			},
			body: JSON.stringify(autor)
		};

		fetch('api/Autor/Create', reqH)
			.then(response => response.json())
			.then(data => {
				if (data)
					alert('Added autor.');
				else
					alert('Error');
			});

		inputVals[0] = 0;
		inputVals[1] = 0;
		inputVals[2] = '';
		inputVals[3] = '';
		inputVals[4] = umetnickiPravacEnum[0];

		this.forceUpdate();
    }

	render() {

		let inputs = [];

        for (let i = 0; i < 4; i++) {

			let capitalLabel = arrInput[i].charAt(0).toUpperCase() + arrInput[i].slice(1);

			inputs.push(
				<div>
					<label className="labelLogin">
						{
							capitalLabel + ':'
                        }
					</label>
					<br />
					<input
						type={getType(i)}
						className='input'
						placeholder={`${capitalLabel} autora:`}
						data-indx={i}
						onChange={this.onInputChange}
						style={{
							borderColor: inputCols[i]
						}}
						value={inputVals[i]}
					/>
					<br />
				</div>
			)
		}

		let selects = [];

        for (let i = 0; i < umetnickiPravacEnum.length; i++) {
			selects.push(
				<option value={ umetnickiPravacEnum[i] }>
					{
						umetnickiPravacEnum[i]
                    }
				</option>
			)
        }

		inputs.push(
			<div>
				<label className="labelLogin">
					Umetnicki pravac:
				</label>
				<br />
				<select
					className="input"
					data-indx={4}
					onChange={this.onInputChange}
					style={{
						borderColor: inputCols[4]
					}}
				>
					{selects}
				</select>
				<br />
			</div>
		)

		inputs.push(
			<div>
				<button
					className="loginbtn"
					disabled={!this.validateInput()}
					onClick={this.createAutor}
					style={{
						opacity: btnOpac
					}}
				>
					Dodaj
            </button>
			</div>
		)		

		return <div className="labelLogin">
			Autor:
			{inputs}
		</div>
    }
}