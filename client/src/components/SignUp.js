import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
import { Typography, Form, Input, Button } from 'antd';

function SignUp() {
    const { currentUser } = useContext(AuthContext);
    const [pwMatch, setPwMatch] = useState('');

    const { Title } = Typography;

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };

    const handleSignUp = async (values) => {
        // console.log(values);
        const { displayName, email, passwordOne, passwordTwo } = values;

        if (passwordOne !== passwordTwo) {
            setPwMatch('Passwords do not match!');
            return false;
        }

        try {
            await doCreateUserWithEmailAndPassword(
                email,
                passwordOne,
                displayName
            );
        } catch (error) {
            alert(error);
        }
    };

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div class="full-width flex-column">
            <Title>Sign up</Title>
            {pwMatch && <h4 className="error">{pwMatch}</h4>}
            <Form
                {...layout}
                name="signup"
                onFinish={handleSignUp}
                layout={'vertical'}
            >
                <Form.Item
                    label="Name"
                    name="displayName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email.' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="passwordOne"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password.',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="passwordTwo"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password.',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="signup-btn"
                    >
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
            <SocialSignIn />
        </div>
    );
}

export default SignUp;
