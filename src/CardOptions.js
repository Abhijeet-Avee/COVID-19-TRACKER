import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import {Link} from 'react-router-dom'; 
import './CardOptions.css';

function CardOptions({title, link, active, ...props}) {
    return (
        <div className="card_body">
            <Card onClick={props.onClick} className={`${active && 'card--selected'}`}>
                <Link to={link}>
                    <CardContent className='card_content'>{title}</CardContent>
                </Link>
            </Card>
        </div>
    )
}

export default CardOptions
