import React from "react";
import './ContentTable.css'

let dataHeader = [
    'Adresa:', 'PIB:', 'MBR:'
];

let dataHUmetnickaD = [

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
                    <button className="tableBtn">
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