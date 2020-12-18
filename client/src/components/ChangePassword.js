import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import '../App.css';
import { Typography, Form, Input, Button } from 'antd';

function ChangePassword() {
	const { currentUser } = useContext(AuthContext);
	const [pwMatch, setPwMatch] = useState('');

	const { Title } = Typography;

	const submitForm = async (values) => {
		const { currentPassword, newPasswordOne, newPasswordTwo } = values;

		if (newPasswordOne !== newPasswordTwo) {
			setPwMatch('New passwords do not match, please try again');
			return false;
		}

		try {
			await doChangePassword(
				currentUser.email,
				currentPassword,
				newPasswordOne
			);
			alert('Password has been changed, you will now be logged out');
		} catch (error) {
			alert(error);
		}
	};

	if (currentUser.providerData[0].providerId === 'password') {
		return (
			<div>
				{pwMatch && <h4 className="error">{pwMatch}</h4>}
				<Title>Change password</Title>
				<Form name="login" onFinish={submitForm} layout={'vertical'}>
					<Form.Item
						label="Current password"
						name="currentPassword"
						id="currentPassword"
						rules={[
							{
								required: true,
								message: 'Please input your current password.',
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="New password"
						name="newPasswordOne"
						id="newPasswordOne"
						rules={[
							{ required: true, message: 'Please input your new password.' },
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="Confirm password"
						name="newPasswordTwo"
						id="newPasswordTwo"
						rules={[
							{ required: true, message: 'Please confirm your new password.' },
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Change password
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	} else {
		return (
			<div>
				<Title>Change password</Title>
				<span className="sub-info">
					You are signed in using a Social Media Provider, you cannot change
					your password.
				</span>
			</div>
		);
	}
}

export default ChangePassword;
