import React from 'react';
import { Circle, Popup } from "react-leaflet";
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
        hex: "#f06f0c",
        multiplier: 400,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 550,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 850,
    },
    vaccinated:{
        hex: "#a83299",
        multiplier: 150
    }
};

export const sortData = (data) => {
    const sortedData = [...data];
    //Array sort function based on comp. a-b
    return sortedData.sort((a, b) => (a.active > b.active ? -1 : 1));
};

export const sortDataSubRegion = (data,type) =>{
    const sortedData = [...data];
    if(type==="confirmed"){
        return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));
    }
    else if(type==="recovered"){
        return sortedData.sort((a,b) => (a.recovered > b.recovered ? -1 : 1));
    }
    else if(type==="deaths"){
        return sortedData.sort((a,b) => (a.deaths > b.deaths ? -1 : 1));
    }
}

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType) => 
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
            pathOptions={{
                fillOpacity: 0.4,
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex
            }}
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths" >Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ));