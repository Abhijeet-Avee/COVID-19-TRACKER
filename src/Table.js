import React from 'react';
import './Table.css';
import numeral from 'numeral';

function Table({countries}) {
    return <div className="table">
            {countries.map(({country,active}) =>(
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(active).format("0,0")}</strong>
                    </td>
                </tr>     
            ))}
        </div>
}

export default Table;