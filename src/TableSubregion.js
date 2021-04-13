import React from 'react';
import './TableSubregion.css';
import numeral from 'numeral';
import {sortDataSubRegion} from './util';

function Table({provinces,type}) {
    const sortedData = sortDataSubRegion(provinces,type);
    const mapFunc = ()=>{
        if(type==="confirmed"){
            return(
                sortedData.map(({name,cases}) =>(
                    <tr>
                        <td>{name}</td>
                        <td>
                            <strong>{numeral(cases).format("0,0")}</strong>
                        </td>
                    </tr>     
                ))
           )
        }
        else if(type==="recovered"){
            return(
                sortedData.map(({name,recovered}) =>(
                    <tr>
                        <td>{name}</td>
                        <td>
                            <strong>{numeral(recovered).format("0,0")}</strong>
                        </td>
                    </tr>     
                ))
            )
        }
        else if(type==="deaths"){
            return(
                sortedData.map(({name,deaths}) =>(
                    <tr>
                        <td>{name}</td>
                        <td>
                            <strong>{numeral(deaths).format("0,0")}</strong>
                        </td>
                    </tr>     
                ))
            )
        }
    }
    return <div className="tableSubregion">
            {
                mapFunc()
            }
        </div>
}

export default Table;