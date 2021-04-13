import React, { useEffect, useState } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import './Subregion.css';
import InfoBox from './InfoBox';
import Map from './Map';
import { prettyPrintStat } from './util';
import TableSubregion from './TableSubregion';

function Subregion() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('India');
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState('India');
    const [provinceInfo, setProvinceInfo] = useState({
        country: "n/a",
        cases: "n/a",
        recovered: "n/a",
        deaths: "n/a"
    });
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 77 });
    const [mapZoom, setMapZoom] = useState(4);
    const [mapProvinces, setMapProvinces] = useState([]);
    const [casesType, setCasesType] = useState('cases');

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/jhucsse")
                .then((response) => response.json())
                .then((data) => {
                    const countries = [];
                    data.forEach(element => {
                        if (element.province != null && !(countries.find(ele => ele.name===element.country))) {
                            countries.push({
                                name: element.country,
                                value: element.country
                            })
                        }
                    });
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, []);

    useEffect(() => {
        const getProvinceData = async () => {
            await fetch("https://disease.sh/v3/covid-19/jhucsse")
                .then((response) => response.json())
                .then((data) => {
                    const provinces = [];
                    data.forEach(element => {
                        if (element.country === country) {
                            provinces.push(
                                {
                                    country: element.province,
                                    name: element.province,
                                    value: element.province,
                                    cases: element.stats.confirmed,
                                    recovered: element.stats.recovered,
                                    deaths: element.stats.deaths,
                                    countryInfo: {
                                        lat: element.coordinates.latitude,
                                        long: element.coordinates.longitude
                                    }
                                }
                            )
                        }
                    });
                    if (provinces.length === 1 || provinces.length === 0) {
                        provinces.push({ name: 'No data Found', value: 'empty' })
                    }
                    setTableData(provinces);
                    setMapProvinces(provinces);
                    setProvinces(provinces);
                });
        };
        getProvinceData();
    }, [country]);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        setCountry(countryCode);
    }

    const onProvinceChange = async (event) => {
        const provinceCode = event.target.value;
        console.log(provinceCode);
        await fetch("https://disease.sh/v3/covid-19/jhucsse")
            .then((response) => response.json())
            .then((data) => {
                setProvince(provinceCode);
                data.forEach(element => {
                    if (element.country === country && element.province === provinceCode) {
                        const provinceData = {
                            country: element.province,
                            cases: element.stats.confirmed,
                            recovered: element.stats.recovered,
                            deaths: element.stats.deaths,
                            countryInfo: {
                                lat: element.coordinates.latitude,
                                long: element.coordinates.longitude
                            }
                        }
                        //provinceData = provinceData.json();
                        //console.log("Coords",provinceData.countryInfo);
                        setProvinceInfo(provinceData);
                        setMapCenter([provinceData.countryInfo.lat, provinceData.countryInfo.long]);
                        setMapZoom(5);
                    }
                });
            });
    }

    //console.log('Province ',province);
    //console.log('ProvinceInfo2',provinceInfo);
    //console.log('MapCenter', mapCenter);

    return (
        <div className="subregion">
            <div className="subregion_left">
                {/*Header*/}
                <div className="subregion_header">
                    {/*Title + Select input dropdown field */}
                    <FormControl className='subregion_dropdown'>
                        <Select variant='outlined' onChange={onCountryChange} value={country}>
                            {/* Loop thorugh all the countries 
              and show a drop down list of the options*/}
                            {
                                countries.map((country) => (
                                    <MenuItem value={country.value}>{country.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl className='subregion_dropdown'>
                        <Select variant='outlined' onChange={onProvinceChange} value={province}>
                            {
                                provinces.map((province) => (
                                    <MenuItem value={province.value}>{province.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='subregion_stats'>
                    <InfoBox isOrange active={casesType === "cases"} onClick={(e) => setCasesType('cases')}
                        title="Confirmed" cases={prettyPrintStat(provinceInfo.cases)} />
                    <InfoBox active={casesType === "recovered"} onClick={(e) => setCasesType('recovered')}
                        title="Recovered" cases={prettyPrintStat(provinceInfo.recovered)} />
                    <InfoBox isRed active={casesType === "deaths"} onClick={(e) => setCasesType('deaths')}
                        title="Deaths" cases={prettyPrintStat(provinceInfo.deaths)} />
                </div>
                <Map casesType={casesType} countries={mapProvinces} center={mapCenter} zoom={mapZoom} />
            </div>
            <Card className="subregion_right">
                <CardContent className="subregion_card">
                    <h3>Confirmed Cases (State)</h3>
                    {/*Table*/}
                    <TableSubregion provinces={tableData} type={"confirmed"} />
                    <h3>Recovered Cases (State)</h3>
                    {/*Table*/}
                    <TableSubregion provinces={tableData} type={"recovered"} />
                    <h3>Death Cases (State)</h3>
                    {/*Table*/}
                    <TableSubregion provinces={tableData} type={"deaths"} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Subregion;
