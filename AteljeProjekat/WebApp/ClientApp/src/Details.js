import React from 'react';
import './ContentTable.css';
import * as Enums from "./Enums";
import * as EntitiesState from './EntitiesState';

var unsubActivate;
let dataArr = [];

function GetEntityForId(id, entityType) {
    return new Promise((resolve, reject) => {
        fetch(`/api/${entityType}/GetOne?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data !== null)
                    resolve(data);
            });
    });
}

export class Details extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.parseDataToShow = this.parseDataToShow.bind(this);
    }

    componentDidMount() {
        unsubActivate = EntitiesState.storeActivate.subscribe(this.showDetails);
    }

    async parseDataToShow(data) {

        if (data == null || data == undefined) return;

        dataArr = [];

        console.log(data);

        if (data.stil !== undefined) {

            let umetnik = await GetEntityForId(data.idUmetnik, 'Autor');
            let atelje = await GetEntityForId(data.idAtelje, 'Atelje');

            data.autor = umetnik;
            data.atelje = atelje;
        }

        Object.entries(data).map(([key, value]) => {
            if (key.includes('id')) {
                return 0;
            }
            else {

                let str = '';

                if (typeof value !== 'object') {
                    if (key.toLowerCase().includes('pravac')) {
                        str = `${key}:${Enums.umetnickiPravacEnum[value]}`;
                    }
                    else if (key.toLowerCase().includes('stil')) {
                        str = `${key}:${Enums.umetnickiStilEnum[value]}`;
                    }
                    else if (key.includes('godina')) {
                        str = `${key}:${value.split('T')[0]}`;
                    }
                    else {
                        str = `${key}:${value}`;
                    }
                }
                else if (Array.isArray(value)) {
                    if (value.length > 0) {
                        // pib or mbr
                        if (typeof value[0] === 'string') {
                            str = `${key}:${value.join('')}`;
                        }
                        else {

                            str += 'Umetnicka dela:\n';
                            value.forEach(v => {
                                str += `Naziv dela:${v.naziv}\n`;
                            });
                        }
                    }
                }
                // atelje or autor
                else {
                    if (key === 'atelje') {
                        str = `Atelje(adresa):${value.adresa}`;
                    }
                    else if (key === 'autor') {
                        str = `Autor:${value.ime} ${value.prezime}`;
                    }
                }

                if (str.length > 0) {
                    dataArr.push(<tr>
                        <td style={{
                            whiteSpace: 'pre-wrap'
                        }}>
                            {str}
                        </td>
                    </tr>);
                }

            }
        });

        this.forceUpdate();
    }

    async showDetails() {
        let activeState = EntitiesState.storeActivate.getState();
        let active = activeState.activate;
        let id = activeState.id;

        if (id === -1) return;

        fetch(`api/${active}/GetOne?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if(data !== null)
                    this.parseDataToShow(data);
            });
    }

    componentWillUnmount() {
        unsubActivate();        
    }

    render() {

        return <table
            className="contentTable"
            style={{
                width:'200px'
            }}
        >
            <tbody>
                {dataArr}
            </tbody>
        </table>
    }
}