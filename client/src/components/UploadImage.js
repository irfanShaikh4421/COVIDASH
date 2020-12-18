import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import app from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../firebase/Auth';
import axios from 'axios';

const db = app.firestore();

function UploadImage() {
	const { currentUser } = useContext(AuthContext);
	let uid;
	const [token, setToken] = useState(null);
	const [userData, setUserData] = useState({});
	const [file, setFile] = useState(null);
	const [url, setURL] = useState('');
	const [img, setImg] = useState(null);

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
	}, [url]);

	if (currentUser) {
		uid = currentUser.uid;
		currentUser.getIdToken().then((t) => {
			setToken(t);
		});
	}

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

	async function handleUpload(e) {
		e.preventDefault();
		//alert(Object.keys(file))

		let fdata = new FormData();
		fdata.append('photo', file, file.name);

		let { data } = await axios.post('/photo', fdata, {
			headers: {
				authtoken: token,
				'Content-Type': `multipart/form-data; boundary=${fdata._boundary}`,
			},
		});

		setImg(data.img);

		setFile(data.img);
		setURL(data.img);
		await updateUserImage(uid, data.img);

		/*const uploadTask = storage.ref(`/images/${file.name}`).put(data.img);
		uploadTask.on('state_changed', console.log, console.error, () => {
			storage
				.ref('images')
				.child(file.name)
				.getDownloadURL()
				.then(async (url) => {
					setFile(null);
					setURL(url);
					await updateUserImage(uid, url);
				});
		});*/
	}

	const imageForm = (
		<div>
			<form onSubmit={handleUpload} className="flex-column-center">
				<img
					src={
						userData.imageUrl
							? userData.imageUrl
							: 'https://via.placeholder.com/400.jpg?text=Profile+Image'
					}
					alt="profile-picture"
					className="profile-img"
				/>
				<input
					type="file"
					onChange={handleChange}
					accept="image/jpeg, image/png, .jpeg, .jpg, .png"
					className="image-input"
				/>
				<button disabled={!file} className="upload-btn" type="submit">
					Upload
				</button>
			</form>
		</div>
	);

	return <div>{imageForm}</div>;
}

export default UploadImage;
