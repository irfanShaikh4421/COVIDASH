import React, { useEffect, useState, useContext } from 'react';
import SignOutButton from './SignOut';
import { NavLink } from 'react-router-dom';
import '../App.css';
import app from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../firebase/Auth';

const db = app.firestore();

function Account() {
	const [userData, setUserData] = useState({});
	const { currentUser } = useContext(AuthContext);
	const uid = currentUser.uid;

	useEffect(() => {
		async function getUserData() {
			var docRef = db.collection('users').doc(uid);

			docRef
				.get()
				.then(function (doc) {
					if (doc.exists) {
						console.log('Document data:', doc.data());
						setUserData(doc.data());
					} else {
						// doc.data() will be undefined in this case
						console.log('No such document!');
					}
				})
				.catch(function (error) {
					console.log('Error getting document:', error);
				});
		}
		getUserData();
	}, []);

	const userInfo = () => {
		if (userData.country === 'US') {
			return (
				<div>
					<p>Country: {userData.country}</p>
					<p>State: {userData.state.toUpperCase()}</p>
				</div>
			);
		} else {
			return <p>Country: {userData.country}</p>;
		}
	};

	return (
		<div className="Account">
			<h2>Account details</h2>
			<img src={userData.imageUrl} alt="profile picture" width="200px" />
			<p>Name: {currentUser.displayName}</p>
			<p>Email: {currentUser.email}</p>
			{userInfo()}
			<NavLink
				exact
				to="/user-details"
				activeClassName="active"
				className="marvel"
			>
				Edit details
			</NavLink>
			<NavLink
				exact
				to="/upload-image"
				activeClassName="active"
				className="marvel"
			>
				Change profile picture
			</NavLink>
			<NavLink
				exact
				to="/change-password"
				activeClassName="active"
				className="marvel"
			>
				Change password
			</NavLink>
			<SignOutButton />
		</div>
	);
}

export default Account;
