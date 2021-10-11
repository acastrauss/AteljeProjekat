import React from "react";
import './ContentTable.css'
import { umetnickiPravacEnum, umetnickiStilEnum } from "./Enums";
import * as EntitiesState from './EntitiesState';
import { store } from "./LoginCredentials";

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

function GetEntityForId(entityType, id) {
    return new Promise((resolve, reject) => {

        fetch(`api/${entityType}/GetOne?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data !== null)
                    resolve(data);
            });
    });
}

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
        this.detailsSet = this.detailsSet.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.umetnickaDelaGet = this.umetnickaDelaGet.bind(this);
        this.onChangeClick = this.onChangeClick.bind(this);
    }

    umetnickaDelaGet(data) {
        let jsonUds = [];

        for (let i = 0; i < data.length; i++) {
            let d = data[i];

            if (d === null) continue;

            jsonUds.push({
                naziv: d.naziv,
                pravac: umetnickiPravacEnum[d.pravac],
                stil: umetnickiStilEnum[d.stil],
                idAtelje: d.idAtelje,
                idUmetnik: d.idUmetnik,
                id: d.id
            });
        }

        let newState = {
            type: EntitiesState.ADD_UMETNICKO_DELO,
            uds: [...jsonUds]
        };

        EntitiesState.storeUd.dispatch(newState);

        this.forceUpdate();
    }

    componentDidMount() {
        this.updateResults = setInterval(() => {

            fetch('api/Atelje/GetAll')
                .then(response => response.json())
                .then(data => {
                    
                    let ateljesJson = [];

                    data.forEach(d => {

                        let jsonD = {
                            Adresa: d['adresa'],
                            MBR: d['mmbr'].join(''),
                            PIB: d['pib'].join(''),
                            UmetnickaDela: d['umetnickaDela'],
                            id: d['id']
                        };

                        ateljesJson.push(jsonD);
                    })

                    let newState = {   
                        type: EntitiesState.ADD_ATELJE,
                        ateljes: [...ateljesJson]
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
                            GodinaRodjenja: d['godinaRodjenja'].split('T')[0],
                            GodinaSmrti: d['godinaSmrti'].split('T')[0],
                            Ime: d['ime'],
                            Prezime: d['prezime'],
                            UmetnickiPravac: umetnickiPravacEnum[Number(d['umetnickiPravac'])],
                            UmetnickaDela: d['umetnickaDela'],
                            id: d['id']
                        });
                    });

                    let newState = {
                        type: EntitiesState.ADD_AUTOR,
                        autors: [...dataAutor]
                    };

                    EntitiesState.storeAutor.dispatch(newState);

                    this.forceUpdate();
                });

            fetch('api/UmetnickoDelo/GetAll')
                .then(response => response.json())
                .then(data => {
                    this.umetnickaDelaGet(data);
                });

        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.updateResults);
    }

    detailsSet(e) {
        let id = e.target.dataset.id;
        
        EntitiesState.storeActivate.dispatch({
            type: 'Id',
            id: id
        });
    }

    onDelete(e) {
        let id = e.target.dataset.id;

        let active = EntitiesState.storeActivate.getState().activate;
        let reqH = {
            headers: {
                'userId': store.getState().userId
            },
            method: 'DELETE'
        };

        fetch(`api/${active}/Delete?id=${id}`, reqH)
            .then(response => response.json())
            .then(data => {
                if (data !== -1)
                    alert('Deleted');
                else
                    alert('Error');
            });
    }

    btnOnClick(e){
        let num = Number(e.target.id);

        if(num === 0){
            this.setState({
                headers: dataHeader,
                data: EntitiesState.storeAtelje.getState().ateljes
            });

            EntitiesState.storeActivate.dispatch({
                type: 'Atelje',
                id: -1
            });
        }
        else if (num === 1){
            this.setState({
                headers: dataHUmetnickaD,
                data: EntitiesState.storeUd.getState().uds
            });

            EntitiesState.storeActivate.dispatch({
                type: 'UmetnickoDelo',
                id: -1
            });
        }
        else {
            this.setState({
                headers: dataHAutor,
                data: EntitiesState.storeAutor.getState().autors
            });

            EntitiesState.storeActivate.dispatch({
                type: 'Autor',
                id: -1
            });
        }
    }

    async onChangeClick(e) {
        let id = e.target.dataset.id;

        let entity = await GetEntityForId(
            EntitiesState.storeActivate.getState().activate, id
        );

        EntitiesState.storeChange.dispatch({
            type: EntitiesState.CHANGE_ENTITY,
            entity: entity
        });
    }

    async onDouble(e) {
        let id = e.target.dataset.id;

        let entity = await GetEntityForId(
            'Atelje', id
        );

        let reqH = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            headers: {
                'userId': store.getState().userId
            },
            body: JSON.stringify(entity)
        };


        fetch('api/Atelje/Double', reqH)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Doubled');
                }
                else {
                    alert('Error');
                }
            });

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
                if (typeof value === 'object' || typeof value === 'array')
                    return 0;

                if (!key.toLowerCase().includes('id')) {
                    if (key !== 'umetnickiPravac')
                        return td.push(<td>{value}</td>);
                    else
                        return td.push(<td>{umetnickiPravacEnum[value]}</td>);
                }
                else
                    return 0;
            });

            let tdBtns = [];

            tdBtns.push(<td>
                <button
                    className="tableBtn"
                    data-id={d.id}
                    onClick={this.onChangeClick}
                >Izmeni</button>
            </td>);
            tdBtns.push(<td>
                <button
                    className="tableBtn"
                    data-id={d.id}
                    onClick={this.onDelete}
                >Izbrisi</button>
            </td>);
            tdBtns.push(<td>
                <button
                    className="tableBtn"
                    data-id={d.id}
                    onClick={this.detailsSet}
                >Detalji</button>
            </td>);

            if (EntitiesState.storeActivate.getState().activate === 'Atelje') {
                tdBtns.push(<td>
                    <button
                        className="tableBtn"
                        data-id={d.id}
                        onClick={this.onDouble}
                    >
                        Dupliraj
                </button>
                </td>);
            }
            
            dataEl.push(
                <tr>
                    {td}
                </tr>
            );

            dataEl.push(
                <tr>
                    {tdBtns}
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