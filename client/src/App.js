import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Statistics from './components/CasesTracking';
import News from './components/News';
import OutBreak from './components/OutbreakMap';
import Symptoms from './components/Symptoms';
import TestingLocations from './components/Testing';
import EachTestingLocation from './components/EachTestingLocation';
import Travel from './components/Travel';
import Vaccine from './components/Vaccine';
import BedUtilization from './components/HospitalBeds';
import Guidelines from './components/Guidelines';
import Sources from './components/Sources';
import Account from './components/Account';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './firebase/Auth';
import { LocationProvider } from './LocationContext'; 

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <br />
                        <Navigation />
                    </header>

                    <br />
                    <br />
                    <div className="App-body">
                        <LocationProvider>
                            <Switch>
                                <Route exact path="/" component={Statistics} />
                                <Route exact path="/news" component={News} />
                                <Route exact path="/map" component={OutBreak} />
                                <Route
                                    exact
                                    path="/symptoms"
                                    component={Symptoms}
                                />
                                <Route
                                    path="/testing"
                                    component={TestingLocations}
                                />
                                <Route
                                    path="/testing/:state/:orgID"
                                    component={EachTestingLocation}
                                />
                                <Route path="/travel" component={Travel} />
                                <Route exact path="/vaccine" component={Vaccine} />
                                <Route
                                    path="/bed-utilization"
                                    component={BedUtilization}
                                />
                                <Route
                                    exact
                                    path="/guidelines"
                                    component={Guidelines}
                                />
                                <Route exact path="/sources" component={Sources} />{/**This Route No longer Does anything, can be deleted */} 
                                <PrivateRoute path="/account" component={Account} />
                                <Route path="/signin" component={SignIn} />
                                <Route path="/signup" component={SignUp} />
                                <Route render={() => <h2>404: Invalid URL</h2>} />
                            </Switch>
                        </LocationProvider>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
