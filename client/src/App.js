import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Charts from './components/Charts';
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
import UserDetailsForm from './components/UserDetailsForm';
import Account from './components/Account';
import UploadImage from './components/UploadImage';
import ChangePassword from './components/ChangePassword';
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
                                <Route exact path="/statistics" component={Statistics}/>
                                <Route exact path="/charts" component={Charts} />
                                <Route exact path="/news" component={News} />
                                <Route exact path="/map" component={OutBreak} />
                                <Route
                                    exact
                                    path="/symptoms"
                                    component={Symptoms}
                                />
                                <Route exact path="/testing" component={TestingLocations} />
                                <Route exact path="/testing/:state/:orgID" component={EachTestingLocation} />
                                <Route exact path="/travel" component={Travel} />
                                <Route exact path="/vaccine" component={Vaccine} />
                                <Route 
                                    exact
                                    path="/bed-utilization"
                                    component={BedUtilization}
                                />
                                <Route
                                    exact
                                    path="/guidelines"
                                    component={Guidelines}
                                />
                                <PrivateRoute
                                    exact
                                    path="/user-details"
                                    component={UserDetailsForm}
                                />
                                <PrivateRoute
                                    exact
                                    path="/upload-image"
                                    component={UploadImage}
                                />
                                <PrivateRoute exact path="/account" component={Account} />
                                <Route exact path="/signin" component={SignIn} />
                                <Route exact path="/signup" component={SignUp} />
                                <PrivateRoute
                                    exact
                                    path="/change-password"
                                    component={ChangePassword}
                                />
                                <Route path="/login" component={SignIn} />
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
