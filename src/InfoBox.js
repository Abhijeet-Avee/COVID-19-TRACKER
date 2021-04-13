import React from 'react';
import './InfoBox.css';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, isRed, isOrange, active, total, ...props}) {
    return (
    /*Conditional CSS formatting WOW!!*/
        <Card onClick={props.onClick} 
        className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} 
        ${isOrange && "infoBox--orange"}`}>
            <CardContent>
                {/*Title*/}
                <Typography className='infoBox_title' color='textSecondary'>
                    {title}
                </Typography>

                {/*Number of Cases*/}
                <h2 className={`infoBox_cases ${isOrange && "infoBox_cases--orange"} ${isRed && "infoBox_cases--red"}`}>{cases}</h2>
                {/*1.2M Total*/}
                <Typography className='infoBox_total' color='textSecondary'>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
