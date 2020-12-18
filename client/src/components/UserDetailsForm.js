import React /*, { useState, useContext }*/ from 'react';
import '../App.css';
/* import countries from '../data/countries-iso2.json';
import usStates from '../data/usStates.json';
import app from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../firebase/Auth';
const db = app.firestore();*/
import ChangeCountry from './ChangeUserCountry';
import { Typography, Modal } from 'antd';

function UserDetailsForm() {
    return (
        <div>
            <ChangeCountry />
        </div>
    );

    /*	const [country, setCountry] = useState('');
	// const [usersData, setUsersData] = useState([]);
	let [state, setState] = useState('');
	const { currentUser } = useContext(AuthContext);
	let uid;

	if (currentUser) {
		uid = currentUser.uid;
	}

	const onChangeSetCountry = (e) => {
		if (e.target.value) setCountry(e.target.value);
		setState('');
	};

	const onChangeSetState = (e) => {
		if (e.target.value) setState(e.target.value);
	};

	const createUser = (uid, country, state) =>
		db.collection('users').doc(uid).set(
			{
				country,
				state,
			},
			{ merge: true }
		);

	const stateSelect = () => {
		if (country === 'US') {
			return (
				<label>
					Choose state: &nbsp;
					<select onChange={onChangeSetState}>
						<option defaultValue>Choose state</option>
						{usStates.map((states, index) => (
							<option key={index} value={states.slug}>
								{states.name}
							</option>
						))}
					</select>
				</label>
			);
		}
	};

	const form = (
		<form
			className="myForm"
			id="userDetails"
			onSubmit={async (e) => {
				e.preventDefault();
				await createUser(uid, country, state);
			}}
		>
			<label>
				Choose country: &nbsp;
				<select onChange={onChangeSetCountry}>
					<option defaultValue>Choose country</option>
					{countries.map((country, index) => (
						<option key={index} value={country['alpha-2']}>
							{country.name}
						</option>
					))}
				</select>
			</label>
			<br />
			{stateSelect()}
			<br />
			<button className="add-post-btn" type="submit">
				Save
			</button>
		</form>
	);
*/
}

export default UserDetailsForm;
