import React from "react";
import './ContentTable.css'

let dataHeader = [
    'Adresa:', 'PIB:', 'MBR:'
];

let dataHUmetnickaD = [
    'Naziv:',
    'Pravac:',
    'Stil:',
]

let dataHAutor = [
    'Godina Rodjenja:',
    'Godina Smrti:',
    'Ime:',
    'Prezime:',
    'Umetnicki Pravac:'
]

let dataTable = [
    {
        Adresa: 'asdfgh',
        PIB: '12345',
        MBR: '12345678'
    },
    {
        Adresa: 'qweqwrt',
        PIB: '09876',
        MBR: '98373842'
    }
];

let dataUD = [
    {
        Naziv: 'qweqweqwe',
        Pravac: 'asdasdasdsad',
        Stil: 'aqwewqegvcxv'
    },
    {
        Naziv: 'qwe123123',
        Pravac: 'as213123sdsad',
        Stil: 'aqwe566xv'
    }
]

let dataAutor = [
    {
        GodinaRodjenja: '1.1.1899.',
        GodinaSmrti: '1.1.1989',
        Ime: 'Aasasd',
        Prezime: 'fdgdfhgrh',
        UmetnickiPravac: 'hojekrwer'
    },
    {
        GodinaRodjenja: '2.2.1899.',
        GodinaSmrti: '2.2.1989',
        Ime: 'Aasasd',
        Prezime: 'fdgdfhgrh',
        UmetnickiPravac: 'hojekrwer'
    }
]

let btnsText = [
    'Ateljei', 'Umetnicka dela', 'Autori'
];

export class ContentTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headers : dataHeader,
            data : dataTable
        }

        this.btnOnClick = this.btnOnClick.bind(this);
    }

    btnOnClick(e){
        let num = Number(e.target.id);

        if(num === 0){
            this.setState({
                headers: dataHeader,
                data: dataTable
            });
        }
        else if (num === 1){
            this.setState({
                headers: dataHUmetnickaD,
                data: dataUD
            });
        }
        else {
            this.setState({
                headers: dataHAutor,
                data: dataAutor
            });
        }
    }

    render(){
        let hElems = [];

        for (let i = 0; i < this.state.headers.length; i++) {
            let d = this.state.headers[i];
            hElems.push(<th>{d}</th>);
        }

        let dataEl = [];
        for (let i = 0; i < this.state.data.length; i++) {
            let d = this.state.data[i];
            let td = [];
            
            Object.entries(d).map(([key, value]) => 
                {
                    return td.push(<td>{value}</td>);
                })
            
            dataEl.push(
                <tr>
                    {td}
                </tr>
            )
        }

        let btns = [];
        for (let i = 0; i < 3; i++) {
            btns.push(
                <td>
                    <button className="tableBtn" id={i} onClick={this.btnOnClick}>
                        {btnsText[i]}
                    </button>
                </td>
            )
        }

        return <div>
            <div >
                <table className="btnsHeader">
                    <tbody>
                        <tr>
                            {btns}
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <div>
                <table className="contentTable">
                    <tbody>
                        {hElems}
                        {dataEl}
                    </tbody>
                </table>
            </div>
        </div> 
        
    }
}