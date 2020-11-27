import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; //to get bootstrap cards working
//import noImage from './img/imageNotFound.jpg';
import placeholder from './img/virusPictureFromStatisticsAPI.png';
import Statistics from './components/CasesTracking';
import Guidelines from './components/Guidelines';
import HomePage from './components/HomePage';
import Login from './components/Login';
import News from './components/News';
import OutBreak from './components/OutbreakMap';
import Symptoms from './components/Symptoms';
import TestingLocations from './components/Testing';
import EachTestingLocation from './components/EachTestingLocation';
import Travel from './components/Travel';
import Sources from './components/Sources';
import Vaccine from './components/Vaccine';

// auth
import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from './auth/firebase'
import FirebaseContext from './auth/context'

function App(props) {
	return (
		<FirebaseContext.Provider value={props}>
			<Router>
				<div className="App">
					<header className="App-header">
						<br />
						<img
							src={placeholder}
							height="100"
							width="100"
							alt="Covidash logo placeholder"
							title="From the statistics API website"
						/>
						<h1>
							<Link className="marvel" to="/">
								HOME
							</Link>
							<p style={{fontSize: "1.5rem", fontWeight: 300, padding: ".5rem"}}>
								 { props.user ? (<> Hello {props.user.displayName}</>) : null }
							</p>
						</h1>
						<br />

						<Link className="marvel" to="/statistics">
							Statistics
						</Link>
						<Link className="marvel" to="/vaccine">
							Vaccines
						</Link>
						<Link className="marvel" to="/travel">
							TravelRegulations
						</Link>
						<Link className="marvel" to="/map">
							OutbreakMap
						</Link>
						<Link className="marvel" to="/symptoms">
							Symptoms
						</Link>
						<Link className="marvel" to="/testing">
							TestingLocations
						</Link>
						<Link className="marvel" to="/guidelines">
							Health{'&'}Safety
						</Link>
						<Link className="marvel" to="/news">
							News
						</Link>
						<p>
							{/* Sample  */}
							<FirebaseContext.Consumer>
								{firebase => 
									(<>
										{ firebase.loading ? (<p>Loading</p>) : null }
										{ (!firebase.loading && !firebase.user) ? <button className="marvel" onClick={()=> firebase.signInWithGoogle()}> Login with Google </button>  : null }
										{ !firebase.loading && firebase.user ? (<><button className="marvel" onClick={() => firebase.signOut()}> Sign Out </button></>) : null }
									</>
									)
								} 
							</FirebaseContext.Consumer>
						</p>
					</header>
					<br />
					<br />
					<div className="App-body">
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route exact path="/statistics" component={Statistics} />
							<Route exact path="/vaccine" component={Vaccine} />
							<Route exact path="/travel" component={Travel} />
							<Route exact path="/map" component={OutBreak} />
							<Route exact path="/symptoms" component={Symptoms} />
							<Route exact path="/testing" component={TestingLocations} />
							<Route
								exact
								path="/testing/:state/:orgID"
								component={EachTestingLocation}
							/>
							<Route exact path="/guidelines" component={Guidelines} />
							<Route exact path="/news" component={News} />
							<Route exact path="/login" component={Login} />
							<Route exact path='/sources' component={Sources} />
							<Route render={() => <h2>404: Invalid URL</h2>} />
						</Switch>
					</div>
				</div>
			</Router>
		</FirebaseContext.Provider>
	);
}  

export default withFirebaseAuth({
	providers,
	firebaseAppAuth,
})(App);