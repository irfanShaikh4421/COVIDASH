import React, { useState, useEffect } from 'react';
import countriesList from '../data/geoData.json'
import axios from 'axios'

const headers = { 'Authorization': `Bearer stevens85452525` }

const Travel = (props) => {
	const [country, setCountry] = useState('US')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [countryData, setCountryData] = useState(null)
	const options = countriesList.map(( k, i ) => (<option key={i} selected={k.value==='US' ? 'selected' : null} value={k.value}>{k.name}</option>) )

	function handleSelect(e){
		setCountry(e.target.value)
		console.log(` Select changed ${e.target.value} `)
	}

	async function grabRegulation(arg){
		try{
			let {data} = await axios.get(`https://prod.greatescape.co/api/travel/countries/${arg}/corona`,{ headers })
			setLoading(false)
			setCountryData(data)
			console.log(`  `)
		}

		catch(e){
			setError(e.message)
		}
	}

	useEffect(() => {
		setLoading(true)
		grabRegulation(country)
	},[country])

	if(error) return <div>ERROR: {error}.</div>

	return (
		<div>
			SELECT COUNTRY &nbsp;&nbsp;
			<select onChange={handleSelect}>
				{options}
			</select>
			<br/>
			<hr></hr>
			<div class="centeredFlex">
				<div className="travelContainer" >
					{ loading ? (<p>Loading</p>) : null }
					{ !loading && countryData ? (
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<div style={{flex: '1 0 35%'}}>
								<img  src={`https://flagcdn.com/h240/${country.toLowerCase()}.png`}
									height='auto'
									width="75%"
									alt={`${countryData.name}'s Flag`}
								
								/>
							</div>
							<div style={{flex: '1 0 65%', textAlign: 'left'}}>
								<h1 style={{fontWeight: 350}}>{countryData.name}</h1> <br></br>
								<div class='chipsContainer' style={{display: 'flex', justifyContent: 'start', flexWrap: 'wrap', alignItems: 'start'}}>
									<p>Lockdown status: </p> <div ><span className='chip'>{countryData.lockdownInfo.lockdown}</span></div>
									<p>Tourists status: </p> <div ><span className='chip'> {countryData.lockdownInfo.touristEntry} </span> </div>
									<p>Event Info: </p> <div ><span className='chip'>{countryData.lockdownInfo.events}</span> </div>
									<p>Tourist Attractions: </p> <div ><span className='chip'>{countryData.lockdownInfo.touristAttractions}</span> </div>
									
								</div>
								<p className='label'>Details: </p> <div className='para'>{countryData.lockdownInfo.details}</div> <br/>
								<p className='label'>Tourist Info: </p> <div className='para'>{countryData.lockdownInfo.touristInfo}</div>
								
							</div>	
						</div>
					) : null }
				</div>
			</div>
			<br/> <br/>

		</div>
	); 
}

export default Travel;