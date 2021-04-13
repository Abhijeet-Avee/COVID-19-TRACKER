import { FormControl, Select, MenuItem, CardContent, Card, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import Table from './Table';
import { prettyPrintStat, sortData } from './util';
import './Vaccination.css';
import VaccinationGraph from './VaccinationGraph';
import Map from './Map';

function Vaccination() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCountries, setMapCountries] = useState([]);
    const [globalVaccine, setGlobalVaccine] = useState();

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=30")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => (
                        {
                            name: country.country,
                            value: country.country
                        }
                    ));
                    setCountries(countries);
                });
        };
        getCountriesData();

        const getVaccineData = async () => {
            await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1")
                .then((response) => response.json())
                .then((data) => {
                    const vaccineData = []
                    data.forEach(element => {
                        for (let date in element.timeline) {
                            const temp = {
                                country: element.country,
                                active: element.timeline[date],
                                vaccinated: element.timeline[date],
                            }
                            vaccineData.push(temp);
                        }
                    });
                    const sortedData = sortData(vaccineData);
                    setTableData(sortedData);
                });
        };
        getVaccineData();

        const getMapData = async () => {
            //DO HERE>>>!!!
            const vaccineData = [];
            await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1")
                .then((response) => response.json())
                .then((data) => {
                    data.forEach(element => {
                        for (let date in element.timeline) {
                            const temp = {
                                country: element.country,
                                active: element.timeline[date],
                                vaccinated: element.timeline[date],
                                countryInfo: null
                            }
                            vaccineData.push(temp);
                        }
                    });
                });
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    for (let i = 0; i < vaccineData.length; i++) {
                        var tempObj;
                        var exists = false;
                        var latlng = { lat: 0, long: 0 }
                        for (let j = 0; j < data.length; j++) {
                            exists = false;
                            if (vaccineData[i].country === data[j].country) {
                                exists = true;
                                tempObj = data[j];
                                break;
                            }
                        }
                        if (exists) {
                            vaccineData[i].countryInfo = tempObj.countryInfo;
                        }
                        else {
                            vaccineData[i].countryInfo = latlng;
                        }
                    }
                })
            setMapCountries(vaccineData);
        }
        getMapData();

        const getGlobalVaccineData = async () => {
            await fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1")
                .then((response) => response.json())
                .then((data) => {
                    for (let date in data)
                        setGlobalVaccine(data[date]);
                })
        }
        getGlobalVaccineData();
    }, []);
    console.log("Date: ", globalVaccine);
    //console.log("TableData: ", tableData);
    //console.log("MapData: ", mapCountries);
    //console.log("tempData: ",tempData);
    console.log("Updtaed: ", mapCountries);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=30'
            : `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${countryCode}?lastdays=30`;
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //Title on the drop down list
                setCountry(countryCode);
                //All of the data from country response...
                setCountryInfo(data);
            });
    };
    //console.log("CountryInfo ", countryInfo);

    return (
        <div className='vaccination'>
            <div className='vaccination_left'>
                <div className='vaccination_header'>
                    <div>
                    <FormControl className='vaccination_dropdown'>
                        <Select variant='outlined' onChange={onCountryChange} value={country}>
                            <MenuItem value='worldwide'>WorldWide</MenuItem>
                            {/* Loop thorugh all the countries 
              and show a drop down list of the options*/}
                            {
                                countries.map((country) => (
                                    <MenuItem value={country.value}>{country.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div>
                    <Card className="vaccination_infoBox">
                        <CardContent>
                            {/*Title*/}
                            <Typography className='vaccination_infoBox_title' color='textSecondary'>
                                <h4>VACCINATED </h4>
                                <h2 className='vaccination_infoBox_cases'>{prettyPrintStat(globalVaccine)}</h2>
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                </div>
                {/*Map*/}
                {(mapCountries.length > 1) &&
                    <Map casesType={'vaccinated'} countries={mapCountries} center={{ lat: 22.80746, lng: 20.4796 }} zoom={2} />
                }

                {/*<VaccinationMap casesType={'recovered'} mapCountries={mapCountries} tempData={tempData} 
                center={mapCenter} zoom={mapZoom}/>*/}
            </div>
            <div className='vaccination_right'>
                {/**TABLE SORTED FOR VACCINATION COUNTRY WISE */}
                <CardContent className="vaccination_card">
                    <h3 className="vaccination_graphTitle">{countryInfo.country} Vaccination Stats Timeline</h3>
                    <VaccinationGraph className="vaccination_graph" casesType={'vaccination'} country={country} />
                    <h3 className="vaccination_tableTitle">Vaccination Stats (Countries)</h3>
                    {/**Table */}
                    <Table countries={tableData} />
                </CardContent>
            </div>
        </div>
    )
}

export default Vaccination
