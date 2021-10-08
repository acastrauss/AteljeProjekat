import React from "react";
import './ContentTable.css'
import { umetnickiPravacEnum, umetnickiStilEnum } from "./Enums";
import * as EntitiesState from './EntitiesState';

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

let btnsText = [
    'Ateljei', 'Umetnicka dela', 'Autori'
];

export class ContentTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headers : dataHeader,
            data: EntitiesState.storeAtelje.getState().ateljes
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
                    
                    let ateljes = [];

                    data.forEach(d => {

                        let jsonD = {
                            Adresa: d['adresa'],
                            MBR: d['mmbr'].join(''),
                            PIB: d['pib'].join('')
                        };

                        ateljes.push(jsonD);
                    })

                    let newState = {
                        type: EntitiesState.ADD_ATELJE,
                        ateljes: [...data]
                    };

                    EntitiesState.storeAtelje.dispatch(newState);
                    
                    this.forceUpdate();
                });

            fetch('api/Autor/GetAll')
                .then(response => response.json())
                .then(data => {
                    let dataAutor = [];

                    data.forEach(d => {
                        dataAutor.push({
                            GodinaRodjenja: d['godinaRodjenja'],
                            GodinaSmrti: d['godinaSmrti'],
                            Ime: d['ime'],
                            Prezime: d['prezime'],
                            UmetnickiPravac: umetnickiPravacEnum[Number(d['umetnickiPravac'])]
                        });
                    });

                    let newState = {
                        type: EntitiesState.ADD_AUTOR,
                        autors: [...data]
                    };

                    EntitiesState.storeAutor.dispatch(newState);

                    this.forceUpdate();
                });

        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.updateResults);
    }

    btnOnClick(e){
        let num = Number(e.target.id);

        if(num === 0){
            this.setState({
                headers: dataHeader,
                data: EntitiesState.storeAtelje.getState().ateljes
            });
        }
        else if (num === 1){
            this.setState({
                headers: dataHUmetnickaD,
                data: EntitiesState.storeUd.getState().uds
            });
        }
        else {
            this.setState({
                headers: dataHAutor,
                data: EntitiesState.storeAutor.getState().autors
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
            
            Object.entries(d).map(([key, value]) => {
                
                if (key !== 'id') {
                    if (key !== 'umetnickiPravac')
                        return td.push(<td>{value}</td>);
                    else
                        return td.push(<td>{umetnickiPravacEnum[value]}</td>);
                }
                else
                    return 0;
            });
            
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