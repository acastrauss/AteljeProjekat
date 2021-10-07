import React from "react";
import './ContentTable.css'
import { umetnickiPravacEnum } from "./Enums";

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

let dataTable = [];

let dataUD = []

let dataAutor = []

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
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        this.updateR1esults = setInterval(() => {

            fetch('api/Atelje/GetAll')
                .then(response => response.json())
                .then(data => {
                    
                    dataTable = [];

                    data.forEach(d => {
                        
                        dataTable.push({
                            Adresa: d['adresa'],
                            MBR: d['mmbr'],
                            PIB: d['pib']
                        });
                    })

                    if (this.state.data !== dataTable) {
                        this.setState({
                            headers: this.state.headers,
                            data: this.state.data
                        });
                    }

                    this.forceUpdate();
                });

            fetch('api/Autor/GetAll')
                .then(response => response.json())
                .then(data => {
                    dataAutor = [];

                    data.forEach(d => {
                        dataAutor.push({
                            GodinaRodjenja: d['godinaRodjenja'],
                            GodinaSmrti: d['godinaSmrti'],
                            Ime: d['ime'],
                            Prezime: d['prezime'],
                            UmetnickiPravac: umetnickiPravacEnum[d['umetnickiPravac']]
                        });
                    });

                    this.forceUpdate();

                });

        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.updateResults);
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
            
            td.push(<td>
                <button className="tableBtn">Izmeni</button>
            </td>)
            td.push(<td>
                <button className="tableBtn">Izbrisi</button>
            </td>)

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