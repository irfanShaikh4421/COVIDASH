import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import app from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../firebase/Auth';
import { storage } from '../firebase/Firebase';
const db = app.firestore();

function UploadImage() {
	const { currentUser } = useContext(AuthContext);
	const [userData, setUserData] = useState({});
	const [file, setFile] = useState(null);
	const [url, setURL] = useState('');

	useEffect(() => {
		async function getUserData() {
			var docRef = db.collection('users').doc(currentUser.uid); //this is a private route, the user must be signed in to get here in the first place

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
	}, [url, currentUser.uid]);

	const updateUserImage = (uid, imgUrl) =>
		db.collection('users').doc(uid).set(
			{
				imageUrl: imgUrl,
			},
			{ merge: true }
		);

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	function handleUpload(e) {
		e.preventDefault();
		const uploadTask = storage.ref(`/images/${file.name}`).put(file);
		uploadTask.on('state_changed', console.log, console.error, () => {
			storage
				.ref('images')
				.child(file.name)
				.getDownloadURL()
				.then(async (url) => {
					setFile(null);
					setURL(url);
					await updateUserImage(currentUser.uid, url);
				});
		});
	}

	const imageForm = (
		<div>
			<form onSubmit={handleUpload}>
				<img src={userData.imageUrl} alt="" width="200px" />
				<br />
				<input
					type="file"
					onChange={handleChange}
					accept="image/jpeg, image/png, .jpeg, .jpg, .png"
				/>
				<br />
				<button disabled={!file}>Upload</button>
			</form>
		</div>
	);

	return (
		<div>
			<h2>Upload profile picture</h2>
			{imageForm}
			<br />
		</div>
	);
}

export default UploadImage;
