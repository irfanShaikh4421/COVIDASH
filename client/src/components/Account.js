import React, { useEffect, useState, useContext } from 'react';
import SignOutButton from './SignOut';
import { NavLink } from 'react-router-dom';
import '../App.css';
import app from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../firebase/Auth';
import { LocationContext } from '../LocationContext';
import ChangeCountry from './ChangeUserCountry';
import UploadImage from './UploadImage';
import countries from '../data/countries.json';
import states from '../data/usStates.json';
import { Typography, Button, Image, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const db = app.firestore();

const countryIndexer = [ 0, 840, 356, 76, 643, 250, 4, 8, 12, 20, 24, 660, 28, 32, 51, 533, 36, 40, 31, 44, 48, 50, 52, 112, 56, 84, 204, 60, 64, 68, 70, 72, 92, 96, 100, 854, 108, 132, 116, 120, 124, 535, 136, 140, 148, 832, 152, 156, 170, 174, 178, 188, 191, 192, 531, 196, 203, 384, 180, 208, 262, 212, 214, 218, 818, 222, 226, 232, 233, 231, 238, 234, 242, 246, 254, 258, 266, 270, 268, 276, 288, 292, 300, 304, 308, 312, 320, 324, 624, 328, 332, 336, 340, 344, 348, 352, 360, 364, 368, 372, 833, 376, 380, 388, 392, 400, 398, 404, 414, 417, 418, 428, 422, 426, 430, 434, 438, 440, 442, 446, 807, 450, 454, 458, 462, 466, 470, 584, 474, 478, 480, 175, 484, 498, 492, 496, 499, 500, 504, 508, 104, 516, 524, 528, 540, 554, 558, 562, 566, 578, 512, 586, 275, 591, 598, 600, 604, 608, 616, 620, 634, 642, 646, 638, 410, 659, 662, 663, 666, 670, 674, 678, 682, 686, 688, 690, 694, 702, 534, 703, 705, 90, 706, 710, 728, 724, 144, 652, 729, 740, 748, 752, 756, 760, 158, 762, 834, 764, 626, 768, 780, 788, 792, 796, 784, 826, 800, 804, 858, 860, 548, 862, 704, 876, 732, 887, 894, 716];
const stateIndexer = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',];

function Account() {
	const [userData, setUserData] = useState({});
	const { currentUser } = useContext(AuthContext);
	const [location] = useContext(LocationContext);
	const uid = currentUser.uid;
	const [isLocationModalVisible, setLocationModal] = useState(false);
	const [isImageModalVisible, setImageModal] = useState(false);

	const showModalLocation = () => {
		setLocationModal(true);
	};

	const handleOkLocation = () => {
		setLocationModal(false);
	};

	const handleCancelLocation = () => {
		setLocationModal(false);
	};

	const showModalImage = () => {
		setImageModal(true);
	};

	const handleOkImage = () => {
		setImageModal(false);
	};

	const handleCancelImage = () => {
		setImageModal(false);
	};

	const { Title } = Typography;

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
	}, [uid]);

	const userInfo = () => {
		if (location.countryCode === 840) {
			const stateName = states[stateIndexer.indexOf(location.state)].name;
			return (
				<div>
					<span className="sub-heading">Location:</span>
					<span className="sub-info">
						{stateName}, United States of America
					</span>
				</div>
			);
		} else {
			const countryName =
				countries[countryIndexer.indexOf(location.countryCode)].country;
			return (
				<div>
					<span className="sub-heading">Location:</span>
					<span className="sub-info">{countryName}</span>
				</div>
			);
		}
	};

	return (
		<div className="Account">
			<Title>Account details</Title>
			<Image
				width={200}
				height={200}
				src={
					userData.imageUrl
						? userData.imageUrl
						: 'https://via.placeholder.com/300.jpg?text=Profile+Image'
				}
				placeholder={<LoadingOutlined className="loader" />}
				alt="Profile icon"
				className="profile-img"
			></Image>
			<span className="sub-heading">Name:</span>
			<span className="sub-info">{currentUser.displayName}</span>
			<span className="sub-heading">Email:</span>
			<span className="sub-info">{currentUser.email}</span>
			{userInfo()}

			<Button className="btn-right-margin" onClick={showModalLocation}>
				Change location
			</Button>
			<Button className="btn-right-margin" onClick={showModalImage}>
				Change profile picture
			</Button>
			<Button className="btn-right-margin">
				<NavLink exact to="/change-password" activeClassName="active">
					Change password
				</NavLink>
			</Button>
			<SignOutButton />
			<Modal
				title="Change location"
				visible={isLocationModalVisible}
				onOk={handleOkLocation}
				onCancel={handleCancelLocation}
			>
				<ChangeCountry />
			</Modal>
			<Modal
				title="Upload profile picture"
				visible={isImageModalVisible}
				onOk={handleOkImage}
				onCancel={handleCancelImage}
			>
				<UploadImage />
			</Modal>
		</div>
	);
}

export default Account;
