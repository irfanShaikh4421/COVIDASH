import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';//to get bootstrap cards working
import noImage from './img/imageNotFound.jpg';

import Statistics from './components/CasesTracking';
import Guidelines from './components/Guidelines';
import HomePage from './components/HomePage';
import Login from './components/Login';
import News from './components/News';
import OutBreak from './components/OutbreakMap';
import Symptoms from './components/Symptoms';
import TestingLocations from './components/Testing';
import Travel from './components/Travel';
import Vaccine from './components/Vaccine';


function App() {
	

	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<br />
					<img src={noImage} height="100" width="100"
						alt='Covidash logo placeholder' title="Covidash image source" />
					<h1><Link className='marvel' to='/'>
						HOME
					</Link></h1>
					<br />
					
					<Link className='marvel' to='/statistics'>
						Statistics
					</Link>
					<Link className='marvel' to='/vaccine'>
						Vaccines
					</Link>
          			<Link className='marvel' to='/travel'>
						TravelRegulations
					</Link>
					<Link className='marvel' to='/map'>
						OutbreakMap
					</Link>
					<Link className='marvel' to='/symptoms'>
						Symptoms
					</Link>
					<Link className='marvel' to='/testing'>
						TestingLocations
					</Link>
					<Link className='marvel' to='/guidelines'>
						Health{'&'}Safety
					</Link>
					<Link className='marvel' to='/news'>
						News
					</Link>
					<Link className='marvel' to='/login'>
						Login
					</Link>
				</header>
				<br />
				<br />
				<div className='App-body'>
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route exact path='/statistics' component={Statistics} />
						<Route exact path='/vaccine' component={Vaccine} />
						<Route exact path='/travel' component={Travel} />
						<Route exact path='/map' component={OutBreak} />
						<Route exact path='/symptoms' component={Symptoms} />
						<Route exact path='/testing' component={TestingLocations} />
						<Route exact path='/guidelines' component={Guidelines} />
						<Route exact path='/news' component={News} />
						<Route exact path='/login' component={Login} />
						<Route render = {() => (<h2>404: Invalid URL</h2>)} />
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
