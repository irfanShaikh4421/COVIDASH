import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {
	doSignInWithEmailAndPassword,
	doPasswordReset,
} from '../firebase/FirebaseFunctions';
import '../App.css';
import { Typography, Form, Input, Button } from 'antd';

function SignIn() {
	const { currentUser } = useContext(AuthContext);

	const { Title } = Typography;

	const handleLogin = async (event) => {
		event.preventDefault();

		let { email, password } = event.target.elements;

		try {
			await doSignInWithEmailAndPassword(email.value, password.value);
		} catch (error) {
			alert(error);
		}
	};

	const passwordReset = (event) => {
		event.preventDefault();

		let email = document.getElementById('email').value;
		if (email) {
			doPasswordReset(email);
			alert('Password reset email was sent.');
		} else {
			alert(
				'Please enter an email address in the form before you click the forgot password link.'
			);
		}
	};

	if (currentUser) {
		return <Redirect to="/" />;
	}

	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 24 },
	};

	return (
		<div>
			<Title>Log in</Title>
			<Form {...layout} name="login" onFinish={handleLogin} layout={'vertical'}>
				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: 'Please input your email.' }]}
					placeholder="john@doe.com"
				>
					<Input id="email" className="form-label" />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					id="password"
					rules={[{ required: true, message: 'Please input your password.' }]}
				>
					<Input.Password />
				</Form.Item>
				<Button href="" className="forgot-pass" onClick={passwordReset}>
					Forgot Password
				</Button>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="signup-btn">
						Log in
					</Button>
				</Form.Item>
			</Form>
			<SocialSignIn />
		</div>
	);
}

export default SignIn;
