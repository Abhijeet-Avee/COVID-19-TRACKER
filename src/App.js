import React, {useState} from 'react';
import Covid from './Covid';
import Subregion from './Subregion';
import Vaccination from './Vaccination';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CardOptions from './CardOptions';

function App() {
    const [state,setState] = useState("global");
    return (
        <div>
            <Router>
                <div className='header'>
                    <div className='header_left'>
                        <h1>COVID-19 TRACKER</h1>
                        <h4>©Abhijeet Singh Bhardwaj</h4>
                    </div>
                    <div className='header_right'>
                        <CardOptions active={state==="global"} onClick={(e) => setState("global")} 
                         title={"Global"} link={"/covid"}/>
                        <CardOptions active={state==="subregion"} onClick={(e) => setState("subregion")}
                         title={"Subregion"} link={"/subregions"}/>
                        <CardOptions active={state==="vaccination"} onClick={(e) => setState("vaccination")}
                         title={"Vaccination"} link={"/vaccination"}/>
                    </div>
                </div>
                <Switch>
                    <Route path="/covid" component={Covid} />
                    <Route path="/subregions" component={Subregion} />
                    <Route path="/vaccination" component={Vaccination}/>
                    <Route path="/" component={Covid}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App
