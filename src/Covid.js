import React, { useState, useEffect } from 'react';
import './Covid.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { prettyPrintStat, sortData } from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

function Covid() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 22.80746, lng: 20.4796 });
  const [mapZoom, setMapZoom] = useState(2.5);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all?yesterday=true")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    //The code inside here will run once when the component 
    //loads and not again after.
    //async -> send a request, wait for it, do something 

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data => {
          const countries = data.map((country) => (
            {
              name: country.country, // United States, United Kingdom, France
              value: country.countryInfo.iso2,  //UK,USA,FR
            }
          ));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        }));
    };
    getCountriesData();
  }, []);


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //console.log("Country Code", countryCode);
    //setCountry(countryCode);
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all?yesterday=true'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=true&strict=true`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        //Title on the drop down list
        setCountry(countryCode);
        //All of the data from country response...
        setCountryInfo(data);
        if (countryCode === 'worldwide') {
          setMapCenter([22.80746, 20.4796]);
        }
        else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }
        // console.log(mapCenter);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        {/*Header*/}
        <div className="app_header">
          {/*Title + Select input dropdown field */}
          <FormControl className='app_dropdown'>
            <Select variant='outlined' onChange={onCountryChange} value={country}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
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

        <div className='app_stats'>
          <InfoBox isOrange active={casesType==="cases"} onClick={(e) => setCasesType('cases')} title="Corona Cases" 
          cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox active={casesType==="recovered"} onClick={(e) => setCasesType('recovered')} title="Recovered Cases" 
          cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox isRed active={casesType==="deaths"} onClick={(e) => setCasesType('deaths')} title="Death Cases" 
          cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
        </div>
        {/*Map*/}
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />

      </div>
      <Card className="app_right">
        <CardContent className="app_card">
          <h3>Active Cases by Country</h3>
          {/*Table*/}
          <Table countries={tableData} />

          <h3 className="app_graphTitle">{countryInfo.country} PAST {casesType.toLocaleUpperCase()}</h3>
          {/*Graph*/}
          <LineGraph className="app_graph" casesType={casesType} country={country}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default Covid;
